"""
============================================================
EduPilot · Real Curriculum Dataset (Baha University · CS/IT)
============================================================
"""

from __future__ import annotations

from pdf_extractor import PassedCourse, PlanCourse, StudentRecord


def _cs_plan() -> list[PlanCourse]:
  return [
    PlanCourse("ENGL1001", "اللغة الإنجليزية 1", 3, [], level=1, difficulty=45),
    PlanCourse("MATH1001", "تفاضل وتكامل 1", 4, [], level=1, difficulty=75),
    PlanCourse("PHYS1301", "الفيزياء العامة 2", 4, [], level=1, difficulty=70),
    PlanCourse("CS1001", "أساسيات التحول الرقمي", 2, [], level=1, difficulty=45),
    PlanCourse("CS1002", "مقدمة في الحوسبة والخوارزميات", 4, [], level=2, difficulty=72),
    PlanCourse("CS1005", "برمجة 1", 4, ["CS1002"], level=3, difficulty=78),
    PlanCourse("CS1253", "برمجة 2", 3, ["CS1005"], level=4, difficulty=82),
    PlanCourse("CS1251", "هياكل البيانات المتقدمة", 3, ["CS1253"], level=5, difficulty=76),
    PlanCourse("CS1006", "تراكيب البيانات", 4, ["CS1253"], level=5, difficulty=88),
    PlanCourse("CS1255", "الرياضيات المتقطعة", 3, ["MATH1001"], level=4, difficulty=74),
    PlanCourse("CS1502", "نظم التشغيل", 3, ["CS1253"], level=7, difficulty=79),
    PlanCourse(
      "CS1508",
      "أمن الحاسب",
      3,
      ["CS1251"],
      level=9,
      difficulty=80,
      yearly_only=True,
    ),
    PlanCourse("CS301", "الخوارزميات", 4, ["CS1006", "CS1255"], level=6, difficulty=90),
    PlanCourse("CS303", "مقدمة الذكاء الاصطناعي", 3, ["CS1006"], level=8, difficulty=85),
    PlanCourse(
      "CS460",
      "الذكاء الاصطناعي",
      3,
      ["CS303"],
      level=9,
      type="elective",
      difficulty=82,
    ),
    PlanCourse(
      "CS472",
      "تعلم الآلة",
      3,
      ["CS460"],
      level=10,
      type="elective",
      difficulty=88,
    ),
    PlanCourse(
      "CS481",
      "تحليل البيانات الضخمة",
      3,
      ["CS303"],
      level=10,
      type="elective",
      difficulty=84,
    ),
    PlanCourse(
      "CS430",
      "أمن المعلومات",
      3,
      ["CS1508"],
      level=10,
      type="elective",
      difficulty=83,
    ),
    PlanCourse(
      "CS441",
      "شبكات لاسلكية",
      3,
      ["CS1502"],
      level=9,
      type="elective",
      difficulty=78,
    ),
    PlanCourse(
      "CS370",
      "هندسة البرمجيات",
      3,
      ["CS1253"],
      level=8,
      type="elective",
      difficulty=75,
    ),
    PlanCourse(
      "CS378",
      "تطوير تطبيقات الويب",
      3,
      ["CS1005"],
      level=8,
      type="elective",
      difficulty=72,
    ),
    PlanCourse(
      "CS385",
      "تطوير تطبيقات الجوال",
      3,
      ["CS1253"],
      level=8,
      type="elective",
      difficulty=70,
    ),
  ]


def _it_plan() -> list[PlanCourse]:
  return [
    PlanCourse("ENGL1001", "اللغة الإنجليزية 1", 3, [], level=1, difficulty=45),
    PlanCourse("IT1001", "أسس تقنية المعلومات", 3, [], level=1, difficulty=50),
    PlanCourse("CS1001", "أساسيات التحول الرقمي", 2, [], level=1, difficulty=45),
    PlanCourse("CS1002", "مقدمة في الحوسبة والخوارزميات", 4, [], level=1, difficulty=72),
    PlanCourse("MATH1001", "تفاضل وتكامل 1", 4, [], level=2, difficulty=75),
    PlanCourse("CS1005", "برمجة 1", 4, ["CS1002"], level=3, difficulty=78),
    PlanCourse("IT1252", "شبكات الحاسب 1", 4, ["IT1001"], level=4, difficulty=78),
    PlanCourse("IT1253", "نظم التشغيل", 4, ["CS1002"], level=4, difficulty=82),
    PlanCourse("IT1254", "تقنيات الويب", 4, ["CS1005"], level=5, difficulty=75, type="elective"),
    PlanCourse(
      "IT1503",
      "أساسيات الأمن السيبراني",
      3,
      ["IT1252"],
      level=6,
      difficulty=80,
      yearly_only=True,
    ),
    PlanCourse(
      "IT1501",
      "إدارة الشبكات",
      3,
      ["IT1252"],
      level=7,
      type="elective",
      difficulty=76,
    ),
    PlanCourse(
      "CS430",
      "أمن المعلومات",
      3,
      ["IT1503"],
      level=9,
      type="elective",
      difficulty=83,
    ),
  ]


def build_fallback_record(student_id: str = "445004397", student_name: str = "رسيل العمري") -> StudentRecord:
  plan_cs = _cs_plan()
  plan_it = _it_plan()
  failed_or_dropped: list[str] = []

  if student_id == "445031381":
    passed = [
      PassedCourse("CS1001", "أساسيات التحول الرقمي", 100.0, 2),
      PassedCourse("CS1002", "مقدمة في الحوسبة والخوارزميات", 100.0, 4),
      PassedCourse("IT1001", "أسس تقنية المعلومات", 100.0, 3),
      PassedCourse("CS1005", "برمجة 1", 90.0, 4),
      PassedCourse("MATH1001", "تفاضل وتكامل", 88.0, 4),
    ]
    upcoming = ["IT1252", "IT1253", "IT1254", "ISLM1001"]
    gpa = 3.93
    program = "بكالوريوس تقنية المعلومات — جامعة الباحة"
    active_plan = plan_it
  elif student_id == "445004398":
    passed = [
      PassedCourse("MATH1001", "تفاضل وتكامل 1", 98.0, 4),
      PassedCourse("CS1002", "مقدمة في الحوسبة والخوارزميات", 100.0, 4),
      PassedCourse("CS1005", "برمجة 1", 100.0, 4),
    ]
    upcoming = ["CS1253", "CS1255", "CS1003"]
    gpa = 4.85
    program = "بكالوريوس علوم الحاسب — جامعة الباحة"
    active_plan = plan_cs
  else:
    # رسيل العمري — سيناريو: تعثرت/حذفت CS1508 (أمن الحاسب · سنوية)
    # المادة تُطرح مرة في السنة وتغلق CS430 ومسار الأمن السيبراني
    passed = [
      PassedCourse("MATH1001", "تفاضل وتكامل 1", 85.0, 4),
      PassedCourse("CS1002", "مقدمة في الحوسبة والخوارزميات", 100.0, 4),
      PassedCourse("CS1005", "برمجة 1", 95.0, 4),
      PassedCourse("CS1253", "برمجة 2", 100.0, 3),
      PassedCourse("CS1251", "هياكل البيانات المتقدمة", 88.0, 3),
      PassedCourse("CS1006", "تراكيب البيانات", 76.0, 4),
      PassedCourse("CS1255", "الرياضيات المتقطعة", 90.0, 3),
    ]
    # لم تُسجَّل CS1508 في الترم القادم — البديل عبر الالتفاف الذكي
    upcoming = ["CS385", "CS378", "CS303"]
    gpa = 3.72
    program = "بكالوريوس علوم الحاسب — جامعة الباحة"
    active_plan = plan_cs
    failed_or_dropped = ["CS1508"]

  return StudentRecord(
    student_id=student_id,
    student_name=student_name,
    program=program,
    gpa=gpa,
    passed_courses=passed,
    plan=active_plan,
    current_term_courses=upcoming,
    failed_or_dropped=failed_or_dropped,
  )
