"""
============================================================
EduPilot · Academic Track Recommendation Engine
============================================================
AR: يحلل أعلى الدرجات في مجالات البرمجة والرياضيات والشبكات
    ويرشّح المسار الأنسب مع المواد الاختيارية من الخطة.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any

from pdf_extractor import PassedCourse, PlanCourse, StudentRecord

EXCELLENT_GRADE = 90
STRONG_GRADE = 80

TRACK_DEFINITIONS: list[dict[str, Any]] = [
    {
        "id": "ai-ds",
        "title": "مسار الذكاء الاصطناعي / AI Track",
        "color_class": "green",
        "domain_codes": [
            "MATH1001", "CS1004", "CS1254", "IT1255",
            "CS1002", "CS1005", "CS1253", "CS1006", "CS303",
        ],
        "electives": [
            {"code": "CS460", "name": "الذكاء الاصطناعي"},
            {"code": "CS472", "name": "تعلم الآلة"},
            {"code": "CS481", "name": "تحليل البيانات الضخمة"},
            {"code": "CS495", "name": "الرؤية الحاسوبية"},
        ],
    },
    {
        "id": "net-sec",
        "title": "مسار الشبكات والأمن / Networking Track",
        "color_class": "blue",
        "domain_codes": [
            "CS1255", "CS1502", "CS1257", "CS1508",
            "IT1252", "IT1253", "IT1503",
        ],
        "electives": [
            {"code": "CS430", "name": "أمن المعلومات"},
            {"code": "CS441", "name": "شبكات لاسلكية"},
            {"code": "CS455", "name": "الأمن السحابي"},
            {"code": "IT1503", "name": "أساسيات الأمن السيبراني"},
        ],
    },
    {
        "id": "swe",
        "title": "مسار هندسة البرمجيات / Software Track",
        "color_class": "navy",
        "domain_codes": [
            "CS1009", "CS1503", "CS1256", "CS1008",
            "CS1002", "CS1005", "CS1253", "CS370", "CS378",
        ],
        "electives": [
            {"code": "CS370", "name": "هندسة البرمجيات"},
            {"code": "CS378", "name": "تطوير تطبيقات الويب"},
            {"code": "CS385", "name": "تطوير تطبيقات الجوال"},
        ],
    },
]


@dataclass
class GradeHighlight:
    code: str
    name: str
    grade: float
    domain: str


@dataclass
class CareerPath:
    id: str
    title: str
    suitability: int
    reasons: list[str]
    electives: list[dict[str, str]]
    color_class: str = "blue"
    domain_avg: float = 0.0
    top_courses: list[dict[str, Any]] = field(default_factory=list)


@dataclass
class TrackRecommendation:
    paths: list[CareerPath]
    recommended: CareerPath
    grade_highlights: list[GradeHighlight]
    analysis_summary: str

    def to_dict(self) -> dict:
        return {
            "paths": [asdict(p) for p in self.paths],
            "recommended_track_id": self.recommended.id,
            "recommended_track": asdict(self.recommended),
            "grade_highlights": [asdict(g) for g in self.grade_highlights],
            "analysis_summary": self.analysis_summary,
        }


def _domain_label(code: str) -> str:
    if code.startswith("MATH") or code in {"CS1255", "CS1004"}:
        return "رياضيات وتحليل"
    if code.startswith("IT") and "125" in code:
        return "شبكات وتقنية"
    if code in {"CS1508", "CS1502", "CS430"}:
        return "أمن وشبكات"
    if code in {"CS303", "CS460", "CS472"}:
        return "ذكاء اصطناعي"
    return "برمجة وخوارزميات"


def _collect_grade_highlights(passed_idx: dict[str, PassedCourse], limit: int = 5) -> list[GradeHighlight]:
    ranked = sorted(passed_idx.values(), key=lambda c: c.grade, reverse=True)
    highlights: list[GradeHighlight] = []
    for course in ranked[:limit]:
        highlights.append(
            GradeHighlight(
                code=course.code,
                name=course.name,
                grade=course.grade,
                domain=_domain_label(course.code),
            )
        )
    return highlights


def _electives_from_plan(plan_idx: dict[str, PlanCourse], track_electives: list[dict]) -> list[dict[str, str]]:
    """Prefer electives that exist in the student's plan."""
    result: list[dict[str, str]] = []
    for item in track_electives:
        code = item["code"]
        if code in plan_idx:
            result.append({"code": code, "name": plan_idx[code].name})
        else:
            result.append(item)
    for course in plan_idx.values():
        if course.type == "elective" and len(result) < 5:
            entry = {"code": course.code, "name": course.name}
            if entry not in result:
                result.append(entry)
    return result[:5]


def _score_track(
    track: dict[str, Any],
    passed_idx: dict[str, PassedCourse],
    record: StudentRecord,
) -> CareerPath:
    domain_codes = track["domain_codes"]
    grades = [passed_idx[c].grade for c in domain_codes if c in passed_idx]
    reasons: list[str] = []
    top_courses: list[dict[str, Any]] = []

    domain_avg = sum(grades) / len(grades) if grades else 0.0
    suitability = 50

    if grades:
        for code in domain_codes:
            if code not in passed_idx:
                continue
            c = passed_idx[code]
            if c.grade >= EXCELLENT_GRADE:
                top_courses.append({"code": c.code, "name": c.name, "grade": c.grade})
        if domain_avg >= EXCELLENT_GRADE:
            suitability += 42
            reasons.append(
                f"تميز في مواد المسار (متوسط {domain_avg:.0f}%) — منها "
                + "، ".join(f"{t['name']} ({t['grade']:.0f})" for t in top_courses[:2])
            )
        elif domain_avg >= STRONG_GRADE:
            suitability += 30
            reasons.append(f"أداء قوي في مجال المسار (متوسط {domain_avg:.0f}%)")
        else:
            suitability += 15
            reasons.append(f"أساس مقبول في المجال (متوسط {domain_avg:.0f}%)")

    prog_codes = ["CS1002", "CS1005", "CS1253", "CS1006"]
    prog_grades = [passed_idx[c].grade for c in prog_codes if c in passed_idx]
    if prog_grades and track["id"] in {"ai-ds", "swe"}:
        avg_prog = sum(prog_grades) / len(prog_grades)
        if avg_prog >= EXCELLENT_GRADE:
            suitability += 20
            if not any("برمجة" in r for r in reasons):
                reasons.append(f"درجات ممتازة في البرمجة والخوارزميات ({avg_prog:.0f}%)")

    math_codes = ["MATH1001", "CS1255", "CS1004"]
    math_grades = [passed_idx[c].grade for c in math_codes if c in passed_idx]
    if math_grades and track["id"] == "ai-ds":
        avg_math = sum(math_grades) / len(math_grades)
        if avg_math >= EXCELLENT_GRADE:
            suitability += 18
            reasons.append(f"قوة في الرياضيات والتحليل ({avg_math:.0f}%)")

    net_codes = ["CS1502", "CS1508", "IT1252", "IT1253"]
    net_grades = [passed_idx[c].grade for c in net_codes if c in passed_idx]
    if net_grades and track["id"] == "net-sec":
        avg_net = sum(net_grades) / len(net_grades)
        suitability += 25
        reasons.append(f"اهتمام واضح بمواد الشبكات والأمن ({avg_net:.0f}%)")

    suitability = int(min(98, max(58, suitability + record.gpa * 4)))

    plan_idx = {c.code: c for c in record.plan}
    electives = _electives_from_plan(plan_idx, track["electives"])

    if not reasons:
        reasons = [f"ملاءمة عامة بناءً على معدلك التراكمي ({record.gpa:.2f})"]

    return CareerPath(
        id=track["id"],
        title=track["title"],
        suitability=suitability,
        reasons=reasons,
        electives=electives,
        color_class=track["color_class"],
        domain_avg=round(domain_avg, 1),
        top_courses=top_courses[:3],
    )


def analyze_career_paths(record: StudentRecord) -> TrackRecommendation:
    passed_idx = {c.code: c for c in record.passed_courses}
    paths = [_score_track(t, passed_idx, record) for t in TRACK_DEFINITIONS]
    paths.sort(key=lambda p: p.suitability, reverse=True)
    recommended = paths[0]
    highlights = _collect_grade_highlights(passed_idx)

    summary_parts = [
        f"بعد تحليل {len(record.passed_courses)} مادة مجتازة، "
        f"أنسب مسار لكِ هو «{recommended.title}» ({recommended.suitability}% ملاءمة)."
    ]
    if highlights:
        best = highlights[0]
        summary_parts.append(
            f"أعلى درجة: {best.name} ({best.grade:.0f}) — مؤشر قوة في {best.domain}."
        )

    return TrackRecommendation(
        paths=paths,
        recommended=recommended,
        grade_highlights=highlights,
        analysis_summary=" ".join(summary_parts),
    )


def analyze_career_paths_legacy(record: StudentRecord) -> list[CareerPath]:
    """Backward-compatible list return for older callers."""
    return analyze_career_paths(record).paths
