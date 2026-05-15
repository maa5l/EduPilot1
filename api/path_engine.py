"""
============================================================
EduPilot · Shortest Path Rerouting Engine
============================================================
AR: يمثل الخطة الدراسية شبكة (Graph) ويبحث عن بدائل عند تعثر/حذف
    مادة سنوية تغلق مساراً طويلاً — لتجنب انتظار عام كامل.
EN: Study plan as a prerequisite graph; when a yearly course blocks
    progress, find skill-matched alternatives that keep graduation on track.
"""

from __future__ import annotations

from collections import deque
from dataclasses import asdict, dataclass, field
from typing import Iterable

from pdf_extractor import PassedCourse, PlanCourse, StudentRecord

# AR: مواد اختيارية/موازية لا تعتمد على مسار الأمن السنوي
BYPASS_CLUSTER_CODES = frozenset(
    {"CS370", "CS378", "CS385", "IT1254", "IT1501", "CS303"}
)

DOMAIN_SKILL_CODES: dict[str, frozenset[str]] = {
    "programming": frozenset({"CS1002", "CS1005", "CS1253", "CS1006", "CS1251"}),
    "math": frozenset({"MATH1001", "CS1255", "CS1004", "IT1255"}),
    "networks": frozenset({"CS1502", "CS1255", "IT1252", "IT1253", "CS1508"}),
    "ai": frozenset({"CS303", "CS460", "CS472", "CS481"}),
}


@dataclass
class AlternativeCourse:
    code: str
    name: str
    hours: int
    difficulty: int
    skill_match: int
    rationale: str
    register_next_term: bool = True


@dataclass
class PathReroute:
    blocked_course_code: str
    blocked_course_name: str
    scenario: str
    delay_if_wait_terms: int
    delay_if_wait_label: str
    blocked_unlocks: list[dict] = field(default_factory=list)
    alternatives: list[AlternativeCourse] = field(default_factory=list)
    expected_outcome: str = ""
    next_term_suggestion: str = ""


@dataclass
class TermBlock:
    term_label: str
    courses: list[dict] = field(default_factory=list)
    total_hours: int = 0
    focus: str = ""


@dataclass
class EarlyGradPlan:
    id: str
    title: str
    summary: str
    estimated_terms_saved: str
    terms: list[TermBlock]


@dataclass
class PathEngineResult:
    graph_nodes: int
    graph_edges: int
    reroutes: list[PathReroute]
    early_graduation_plans: list[EarlyGradPlan] = field(default_factory=list)
    is_struggling: bool = False

    def to_dict(self) -> dict:
        return {
            "graph_nodes": self.graph_nodes,
            "graph_edges": self.graph_edges,
            "reroutes": [asdict(r) for r in self.reroutes],
            "early_graduation_plans": [asdict(p) for p in self.early_graduation_plans],
            "is_struggling": self.is_struggling,
        }


def _index_plan(plan: Iterable[PlanCourse]) -> dict[str, PlanCourse]:
    return {c.code: c for c in plan}


def _index_passed(passed: Iterable[PassedCourse]) -> dict[str, PassedCourse]:
    return {c.code: c for c in passed}


def _build_graph(plan: Iterable[PlanCourse]) -> tuple[dict[str, list[str]], dict[str, list[str]]]:
    """forward[pre] -> courses that require pre; reverse[course] -> prerequisites."""
    forward: dict[str, list[str]] = {}
    reverse: dict[str, list[str]] = {}
    for course in plan:
        reverse[course.code] = list(course.prerequisites)
        for pre in course.prerequisites:
            forward.setdefault(pre, []).append(course.code)
    return forward, reverse


def _dependents_depth(forward: dict[str, list[str]], root: str) -> int:
    """BFS: how many courses sit downstream of `root` (approx. blocked chain length)."""
    seen: set[str] = set()
    queue: deque[str] = deque(forward.get(root, []))
    depth = 0
    while queue:
        depth += 1
        level_size = len(queue)
        for _ in range(level_size):
            node = queue.popleft()
            if node in seen:
                continue
            seen.add(node)
            queue.extend(forward.get(node, []))
    return depth


def _student_domain_strength(passed: dict[str, PassedCourse]) -> dict[str, float]:
    scores: dict[str, list[float]] = {k: [] for k in DOMAIN_SKILL_CODES}
    for domain, codes in DOMAIN_SKILL_CODES.items():
        for code in codes:
            if code in passed:
                scores[domain].append(passed[code].grade)
    return {
        domain: (sum(vals) / len(vals) if vals else 65.0)
        for domain, vals in scores.items()
    }


def _skill_match_for(course: PlanCourse, strengths: dict[str, float]) -> int:
    code = course.code
    if course.type == "elective" or code in BYPASS_CLUSTER_CODES:
        base = strengths.get("programming", 70)
    elif code.startswith("IT") or "150" in code:
        base = strengths.get("networks", 70)
    elif code in DOMAIN_SKILL_CODES["ai"] or code in {"CS303", "CS460", "CS472"}:
        base = (strengths.get("ai", 65) + strengths.get("math", 65)) / 2
    elif "MATH" in code or code == "CS1255":
        base = strengths.get("math", 70)
    else:
        base = strengths.get("programming", 70)

    ease_bonus = max(0, (85 - course.difficulty) * 0.15)
    return int(min(98, max(55, base * 0.85 + ease_bonus)))


def _is_eligible(course: PlanCourse, passed: dict[str, PassedCourse], blocked: str) -> bool:
    for pre in course.prerequisites:
        if pre == blocked:
            return False
        if pre not in passed:
            return False
    return course.code not in passed


def _blocking_scenarios(record: StudentRecord, plan_idx: dict[str, PlanCourse], forward: dict[str, list[str]]) -> list[tuple[str, str]]:
    """Return list of (course_code, scenario_reason)."""
    scenarios: list[tuple[str, str]] = []
    passed_idx = _index_passed(record.passed_courses)
    failed = set(getattr(record, "failed_or_dropped", []) or [])

    for code in failed:
        if code in plan_idx:
            course = plan_idx[code]
            unlocks = forward.get(code, [])
            reason = "تعثرتِ أو حذفتِ هذه المادة"
            if course.yearly_only:
                reason += " (مادة سنوية — تُطرح مرة واحدة في السنة)"
            if unlocks:
                names = "، ".join(plan_idx[u].name for u in unlocks[:3] if u in plan_idx)
                reason += f" — يُغلق مسار: {names}"
            scenarios.append((code, reason))

    for code in record.current_term_courses:
        course = plan_idx.get(code)
        if not course or not course.yearly_only:
            continue
        dependents = forward.get(code, [])
        if len(dependents) >= 1 and code not in failed:
            scenarios.append(
                (
                    code,
                    "مادة سنوية في ترمك الحالي — إن تعثرتِ أو حذفتِها يُغلق مسار مواد لاحقة",
                )
            )

    for code, course in plan_idx.items():
        if code in passed_idx or code in failed:
            continue
        if not course.yearly_only:
            continue
        if len(forward.get(code, [])) >= 2 and _is_eligible(course, passed_idx, ""):
            if not any(s[0] == code for s in scenarios):
                scenarios.append(
                    (
                        code,
                        "مادة سنوية لم تُسجَّل بعد وتفتح عدة مواد — تأجيلها يعني انتظار عام",
                    )
                )

    return scenarios[:3]


def _estimate_delay_terms(course: PlanCourse, forward: dict[str, list[str]], root: str) -> tuple[int, str]:
    chain = _dependents_depth(forward, root)
    if course.yearly_only:
        terms = max(2, chain + 1)
        return terms, f"تأخر متوقع: {terms} فصول (مادة سنوية + مواد لاحقة)"
    terms = max(1, chain)
    return terms, f"تأخر متوقع: {terms} فصل دراسي"


def find_alternatives(
    record: StudentRecord,
    blocked_code: str,
    scenario: str,
) -> PathReroute | None:
    plan_idx = _index_plan(record.plan)
    passed_idx = _index_passed(record.passed_courses)
    forward, _ = _build_graph(record.plan)

    blocked = plan_idx.get(blocked_code)
    if not blocked:
        return None

    strengths = _student_domain_strength(passed_idx)
    delay_terms, delay_label = _estimate_delay_terms(blocked, forward, blocked_code)
    unlocks = [{"code": c, "name": plan_idx[c].name} for c in forward.get(blocked_code, []) if c in plan_idx]

    candidates: list[AlternativeCourse] = []
    for course in record.plan:
        if course.code == blocked_code:
            continue
        if course.code in passed_idx:
            continue
        if blocked_code in course.prerequisites:
            continue
        if not _is_eligible(course, passed_idx, blocked_code):
            continue
        if course.level < blocked.level - 1 and course.type != "elective":
            continue

        match = _skill_match_for(course, strengths)
        rationale = (
            f"لا تتطلب {blocked.name} — ملاءمة مهاراتك {match}% "
            f"(صعوبة {course.difficulty}/100)"
        )
        if course.type == "elective":
            rationale += " · مادة اختيارية تحافظ على تقدمك دون انتظار السنة"

        candidates.append(
            AlternativeCourse(
                code=course.code,
                name=course.name,
                hours=course.hours,
                difficulty=course.difficulty,
                skill_match=match,
                rationale=rationale,
                register_next_term=True,
            )
        )

    candidates.sort(key=lambda a: (-a.skill_match, a.difficulty))
    top = candidates[:4]

    if not top:
        return None

    saved = max(1, delay_terms - 1)
    best = top[0]
    return PathReroute(
        blocked_course_code=blocked_code,
        blocked_course_name=blocked.name,
        scenario=scenario,
        delay_if_wait_terms=delay_terms,
        delay_if_wait_label=delay_label,
        blocked_unlocks=unlocks,
        alternatives=top,
        expected_outcome=f"توفير فصل دراسي أو أكثر ({saved}+) عبر تسجيل {best.name} بدلاً من الانتظار",
        next_term_suggestion=(
            f"سجّلي {best.code} ({best.name}) في الفصل القادم — "
            f"ملاءمة {best.skill_match}% مع قدراتك الحالية"
        ),
    )


MAX_TERM_HOURS = 15


def _course_dict(c: PlanCourse) -> dict:
    return {"code": c.code, "name": c.name, "hours": c.hours}


def _greedy_term(
    plan_idx: dict[str, PlanCourse],
    forward: dict[str, list[str]],
    passed_sim: set[str],
    failed_codes: set[str],
    locked: set[str],
    strengths: dict[str, float],
    max_hours: int,
    force_include: list[PlanCourse] | None = None,
) -> list[PlanCourse]:
    """Pick courses for one term: unlock-heavy, skill-matched, within hour cap."""
    result: list[PlanCourse] = []
    hours = 0
    scheduled = set(locked)

    if force_include:
        for c in force_include:
            if c.code in scheduled:
                continue
            result.append(c)
            hours += c.hours
            scheduled.add(c.code)

    candidates: list[tuple[PlanCourse, int, int]] = []
    for c in plan_idx.values():
        if c.code in passed_sim or c.code in scheduled:
            continue
        if c.code in failed_codes:
            continue
        if any(p not in passed_sim for p in c.prerequisites):
            continue
        if any(p in failed_codes for p in c.prerequisites):
            continue
        uc = len(forward.get(c.code, []))
        sm = _skill_match_for(c, strengths)
        candidates.append((c, uc, sm))

    candidates.sort(key=lambda x: (-x[1], -x[2], x[0].difficulty))

    for c, _, _ in candidates:
        if hours + c.hours <= max_hours:
            result.append(c)
            hours += c.hours
            scheduled.add(c.code)
    return result


def _current_term_block(record: StudentRecord, plan_idx: dict[str, PlanCourse]) -> TermBlock:
    courses: list[dict] = []
    th = 0
    for code in record.current_term_courses:
        if code in plan_idx:
            c = plan_idx[code]
            courses.append(_course_dict(c))
            th += c.hours
    return TermBlock(
        term_label="الفصل الحالي (مسجّل)",
        courses=courses,
        total_hours=th,
        focus="أكملي التحميل الحالي؛ نفترض النجاح لبناء الخطة اللاحقة",
    )


def build_early_graduation_plans(record: StudentRecord, reroutes: list[PathReroute]) -> list[EarlyGradPlan]:
    """Multi-term roadmaps for students with failure/yearly risk — early graduation focus."""
    failed_list = list(getattr(record, "failed_or_dropped", []) or [])
    failed = set(failed_list)
    is_risk = bool(failed) or bool(reroutes)
    if not is_risk:
        return []

    plan_idx = _index_plan(record.plan)
    forward, _ = _build_graph(record.plan)
    passed_idx = _index_passed(record.passed_courses)
    strengths = _student_domain_strength(passed_idx)

    saved_hint = ""
    if reroutes:
        saved_hint = reroutes[0].expected_outcome
    elif failed:
        saved_hint = "تجنّبي فصلاً بلا مواد إجبارية عبر التسجيل الموازي"

    current_block = _current_term_block(record, plan_idx)
    plans: list[EarlyGradPlan] = []

    # --- Plan A: parallel acceleration (no waiting for yearly retake slot to fill hours)
    passed_sim = set(passed_idx.keys()) | set(record.current_term_courses)
    locked = set(record.current_term_courses)
    terms_a: list[TermBlock] = [current_block]
    labels = ["الفصل القادم — تسريع موازٍ", "الفصل الذي يليه", "فصل لاحق (تقديري)"]
    for label in labels:
        picked = _greedy_term(
            plan_idx, forward, passed_sim, failed, locked, strengths, MAX_TERM_HOURS
        )
        if not picked:
            break
        th = sum(c.hours for c in picked)
        terms_a.append(
            TermBlock(
                term_label=label,
                courses=[_course_dict(c) for c in picked],
                total_hours=th,
                focus="أولوية لمواد تفتح مسارات لاحقة + ملاءمة قدراتك",
            )
        )
        for c in picked:
            passed_sim.add(c.code)
            locked.add(c.code)

    plans.append(
        EarlyGradPlan(
            id="parallel-accelerate",
            title="التخرج المبكر — مسار موازٍ",
            summary=(
                "مواد لا تعتمد على المادة المتعثرة؛ تجميع ساعات ومهارات دون فصل جامد "
                "بينما تنتظرين عرض المادة السنوية."
            ),
            estimated_terms_saved=saved_hint or "تقدير: فصل أو أكثر مقارنةً بالانتظار دون تسجيل",
            terms=terms_a,
        )
    )

    # --- Plan B: retake when offered, then sprint (only if there are failures)
    if failed_list:
        passed_sim_b = set(passed_idx.keys()) | set(record.current_term_courses)
        locked_b = set(record.current_term_courses)
        terms_b: list[TermBlock] = [current_block]

        retakes = [plan_idx[c] for c in failed_list if c in plan_idx]
        rt_hours = sum(c.hours for c in retakes)
        next_hours_cap = max(3, MAX_TERM_HOURS - rt_hours)
        fillers = _greedy_term(
            plan_idx,
            forward,
            passed_sim_b,
            failed,
            locked_b,
            strengths,
            next_hours_cap,
            force_include=retakes,
        )

        th2 = sum(c.hours for c in fillers)
        unlock_names = ""
        if retakes:
            bc = retakes[0].code
            unlock_names = "، ".join(
                plan_idx[u].name for u in forward.get(bc, [])[:2] if u in plan_idx
            )
        terms_b.append(
            TermBlock(
                term_label="الفصل القادم — إعادة المتعثرة + تعويض",
                courses=[_course_dict(c) for c in fillers],
                total_hours=th2,
                focus=(
                    "أعدي المتعثرة عند أول عرض؛ أضيفي مادة أو مادتين موازيتين لا ترتبطان بها"
                    + (f". بعد النجاح تتاح: {unlock_names}" if unlock_names else "")
                ),
            )
        )
        for c in fillers:
            passed_sim_b.add(c.code)
            locked_b.add(c.code)
        # Assume retake success: unblock dependents
        for c in failed_list:
            passed_sim_b.add(c)

        for label in ["الفصل الذي يليه — بعد النجاح", "فصل لاحق — دفع نحو الإكمال"]:
            picked = _greedy_term(
                plan_idx, forward, passed_sim_b, set(), locked_b, strengths, MAX_TERM_HOURS
            )
            if not picked:
                break
            th3 = sum(c.hours for c in picked)
            terms_b.append(
                TermBlock(
                    term_label=label,
                    courses=[_course_dict(c) for c in picked],
                    total_hours=th3,
                    focus="تسريع نحو إغلاق المتطلبات والاختياري",
                )
            )
            for c in picked:
                passed_sim_b.add(c.code)
                locked_b.add(c.code)

        plans.append(
            EarlyGradPlan(
                id="recover-then-sprint",
                title="التعافي ثم التسريع — نحو التخرج المبكر",
                summary=(
                    "خطة تلتقط المادة المتعثرة فور توفرها، ثم تضغط مواداً فتحها نجاحك "
                    "لاستعادة الزمن المفقود."
                ),
                estimated_terms_saved="بعد إعادة المتعثرة: اختصار تأخير مسار الأمن/المواد اللاحقة",
                terms=terms_b,
            )
        )

    return plans


def run_path_engine(record: StudentRecord) -> PathEngineResult:
    plan_idx = _index_plan(record.plan)
    forward, reverse = _build_graph(record.plan)
    edges = sum(len(v) for v in forward.values())

    reroutes: list[PathReroute] = []
    for code, scenario in _blocking_scenarios(record, plan_idx, forward):
        reroute = find_alternatives(record, code, scenario)
        if reroute:
            reroutes.append(reroute)

    if not reroutes and record.current_term_courses:
        for code in record.current_term_courses:
            course = plan_idx.get(code)
            if course and course.yearly_only:
                reroute = find_alternatives(
                    record,
                    code,
                    "احتياط: مسار بديل إذا لم تتمكني من إكمال المادة السنوية",
                )
                if reroute:
                    reroutes.append(reroute)
                    break

    failed_set = set(getattr(record, "failed_or_dropped", []) or [])
    is_struggling = bool(failed_set) or bool(reroutes)
    early_plans = build_early_graduation_plans(record, reroutes) if is_struggling else []

    return PathEngineResult(
        graph_nodes=len(plan_idx),
        graph_edges=edges,
        reroutes=reroutes,
        early_graduation_plans=early_plans,
        is_struggling=is_struggling,
    )
