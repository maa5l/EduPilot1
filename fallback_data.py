"""
============================================================
EduPilot · Real Curriculum Dataset (Baha University · CS)
============================================================
AR: تم استخراج الخطة كاملةً من ملف:
        d:\\__نموذج_خطة_برنامج_علوم_الحاسب_.pdf
    البرنامج : علوم الحاسب — جامعة الباحة
    إجمالي الساعات : 165
    إجمالي المقررات : 53
    عدد المستويات : 12

    ⚠️ ملف السجل الأكاديمي عاد فارغاً عند المحلّل (PDF صورة
       ممسوحة ضوئياً — يحتاج OCR). لذلك المواد المجتازة + الدرجات
       تُترك فارغة هنا حتى تُعبَّأ يدوياً من قِبَل الطالبة، ولا
       يخترع النظام أي اسم/مادة/درجة.
EN: Plan was extracted verbatim from the real curriculum PDF.
    Transcript PDF appears to be image-based (needs OCR), so
    passed_courses are left empty until the student supplies
    them — never fabricate.
============================================================
"""

from __future__ import annotations

from pdf_extractor import PassedCourse, PlanCourse, StudentRecord


def build_fallback_record() -> StudentRecord:
    """AR: نُكوّن سجل الطالبة من الخطة الحقيقية المستخرجة.
    EN: Build the StudentRecord from the real extracted plan."""

    # ----------------------------------------------------------------
    # AR: الخطة الدراسية الحقيقية (53 مقرر · 165 ساعة · 12 مستوى).
    # EN: Real curriculum extracted from the official PDF.
    # ----------------------------------------------------------------
    plan: list[PlanCourse] = [
        # ===== المستوى 1 · Level 1 =====
        PlanCourse("ENGL1001", "اللغة الإنجليزية 1", 0, [], level=1, difficulty=45),
        PlanCourse("MATH1001", "تفاضل وتكامل 1", 4, [], level=1, difficulty=75),
        PlanCourse("PHYS1301", "الفيزياء العامة 2", 4, [], level=1, difficulty=70),
        PlanCourse("ISLM1003", "التلاوة والهدايات القرآنية", 2, [], level=1, difficulty=35),
        PlanCourse("CS1001", "أساسيات التحول الرقمي", 2, [], level=1, difficulty=45),

        # ===== المستوى 2 · Level 2 =====
        PlanCourse("ENGL1002", "اللغة الإنجليزية 2", 3, ["ENGL1001"], level=2, difficulty=50),
        PlanCourse("CS1002", "مقدمة في الحوسبة والخوارزميات", 4, [], level=2, difficulty=72),
        PlanCourse("CS1003", "هياكل منفصلة", 3, [], level=2, difficulty=78),
        PlanCourse("ISLM1001", "ثقافة إسلامية 1", 2, [], level=2, difficulty=35),
        PlanCourse("ARAB1001", "المهارات اللغوية", 2, [], level=2, difficulty=40),

        # ===== المستوى 3 · Level 3 =====
        PlanCourse("ENGL1003", "اللغة الإنجليزية 3", 3, ["ENGL1002"], level=3, difficulty=55),
        PlanCourse("CS1004", "إحصاء", 3, [], level=3, difficulty=72),
        PlanCourse("CS1005", "برمجة 1", 4, ["CS1002"], level=3, difficulty=78),
        PlanCourse("ISLM1002", "ثقافة إسلامية 2", 2, [], level=3, difficulty=35),
        PlanCourse("HIST1001", "تاريخ المملكة العربية السعودية", 2, [], level=3, difficulty=40),

        # ===== المستوى 4 · Level 4 =====
        PlanCourse("CS1251", "تصميم منطقي رقمي", 4, ["CS1005"], level=4, difficulty=80),
        PlanCourse("CS1252", "الكتابة التقنية", 3, ["CS1004"], level=4, difficulty=55),
        PlanCourse("CS1253", "برمجة 2", 3, ["CS1005"], level=4, difficulty=82),
        PlanCourse("CS1254", "احتمالات", 3, [], level=4, difficulty=75),
        PlanCourse("IT1255", "الجبر الخطي", 3, ["ENGL1003"], level=4, difficulty=72),

        # ===== المستوى 5 · Level 5 =====
        # AR: تراكيب البيانات — تعتمد على برمجة 2 (CS1253) فعلياً.
        PlanCourse("CS1006", "تراكيب البيانات", 4, ["CS1253"], level=5, difficulty=88),
        PlanCourse("CS1255", "شبكات الحاسب 1", 3, ["CS1005"], level=5, difficulty=78),
        PlanCourse("CS1007", "تنظيم ومعمارية الحاسب", 4, ["CS1251"], level=5, difficulty=80),
        PlanCourse("CS1256", "قواعد البيانات 1", 4, ["CS1251"], level=5, difficulty=78),

        # ===== المستوى 6 · Level 6 =====
        PlanCourse("CS1008", "تقنيات الويب 1", 4, ["CS1007"], level=6, difficulty=72),
        PlanCourse("CS1009", "هندسة البرمجيات 1", 4, ["CS1251"], level=6, difficulty=75),
        PlanCourse("CS1257", "شبكات الحاسب 2", 4, ["CS1006"], level=6, difficulty=82),
        PlanCourse("CS_ELEC_FAC", "مقرر اختياري كلية", 3, [], level=6, difficulty=60),

        # ===== المستوى 7 · Level 7 =====
        PlanCourse("CS1501", "تقنيات الويب 2", 4, ["CS1008"], level=7, difficulty=75),
        PlanCourse("CS1502", "نظم التشغيل", 4, ["CS1256"], level=7, difficulty=85),
        PlanCourse("CS1503", "هندسة البرمجيات 2", 3, ["CS1009"], level=7, difficulty=78),
        PlanCourse("CS1504", "التفاعل بين الإنسان والحاسب", 3, [], level=7, difficulty=62),

        # ===== المستوى 8 · Level 8 =====
        # AR: تصميم وتحليل الخوارزميات تعتمد على تراكيب البيانات (CS1006).
        PlanCourse("CS1505", "الذكاء الاصطناعي", 4, ["CS1006"], level=8, difficulty=88),
        PlanCourse("CS1506", "تصميم وتحليل الخوارزميات", 3, ["CS1006"], level=8, difficulty=90),
        PlanCourse("IS1501", "الأخلاقيات في الحوسبة", 3, [], level=8, difficulty=45),
        PlanCourse("CS1507", "نظرية الحوسبة", 3, ["CS1003"], level=8, difficulty=85),

        # ===== المستوى 9 · Level 9 (مواد سنوية حرجة) =====
        PlanCourse("CS1508", "أمن الحاسب", 3, ["CS1251"], level=9, difficulty=80, yearly_only=True),
        PlanCourse("CS1509", "تطوير تطبيقات الجوال", 3, ["CS1257"], level=9, difficulty=78),
        PlanCourse("CS1510", "نظرية المترجمات", 3, ["CS1506"], level=9, difficulty=92, yearly_only=True),
        PlanCourse("CS1511", "لغات البرمجة", 3, ["CS1507"], level=9, difficulty=80),
        PlanCourse("CS1512", "التدريب الميداني", 3, [], level=9, difficulty=55),

        # ===== المستوى 10 · Level 10 =====
        PlanCourse("CS1751", "الرسم بالحاسب", 3, ["CS1256"], level=10, difficulty=78, yearly_only=True),
        PlanCourse("CS1752", "طرق البحث", 3, [], level=10, difficulty=58),
        PlanCourse("CS1753", "مقدمة في تنقيب البيانات", 3, ["CS1007"], level=10, difficulty=85),
        PlanCourse("CS_ELEC_1", "اختياري 1", 3, [], level=10, difficulty=65),

        # ===== المستوى 11 · Level 11 =====
        PlanCourse("CS1754", "مشروع التخرج 1", 3, [], level=11, difficulty=72),
        PlanCourse("CS1755", "النمذجة والمحاكاة", 3, ["CS1506"], level=11, difficulty=80, yearly_only=True),
        PlanCourse("CS1756", "الحوسبة المتوازية والموزعة", 4, ["CS1257"], level=11, difficulty=88),
        PlanCourse("CS_ELEC_2", "اختياري 2", 3, [], level=11, difficulty=65),

        # ===== المستوى 12 · Level 12 =====
        PlanCourse("CS1757", "مشروع التخرج 2", 3, ["CS1754"], level=12, difficulty=80),
        PlanCourse("CS1758", "التقنيات الناشئة", 3, [], level=12, difficulty=70),
        PlanCourse("CS_ELEC_3", "اختياري 3", 3, [], level=12, difficulty=65),
        PlanCourse("CS_ELEC_4", "اختياري 4", 3, [], level=12, difficulty=65),
    ]

    # ----------------------------------------------------------------
    # AR: ⚠️ هام — قائمة المواد المجتازة فارغة لأن السجل الأكاديمي PDF
    #     ممسوح ضوئياً ولم يستخرج له نص. على الطالبة تعبئتها يدوياً.
    # EN: Passed courses left EMPTY — transcript PDF is image-based.
    # ----------------------------------------------------------------
    passed: list[PassedCourse] = []

    # ----------------------------------------------------------------
    # AR: مواد الترم القادم — لا نخترعها أيضاً.
    # EN: Upcoming courses — left empty until student supplies them.
    # ----------------------------------------------------------------
    upcoming: list[str] = []

    # ----------------------------------------------------------------
    # AR: ⚠️ لا اسم وهمي — اتركه فارغاً (يُملأ من السجل أو يدوياً).
    # EN: ⚠️ No fake name.
    # ----------------------------------------------------------------
    return StudentRecord(
        student_id="445004397",
        student_name="",
        program="بكالوريوس علوم الحاسب — جامعة الباحة",
        gpa=0.0,
        passed_courses=passed,
        plan=plan,
        current_term_courses=upcoming,
    )
