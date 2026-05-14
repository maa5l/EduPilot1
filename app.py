"""
============================================================
EduPilot · FastAPI Server
============================================================
AR: يربط نتائج محرك Python بواجهة HTML/CSS/JS الخالصة عبر
    REST API بسيط، كما يقوم بتقديم ملفات الواجهة كملفات ثابتة:

    GET /api/health             - فحص الخدمة
    GET /api/student            - الهوية + المعدل + المواد المجتازة
    GET /api/alerts             - تنبيهات رادار المتطلبات
    GET /api/knowledge-bridges  - جسور المعرفة (Micro-learning)
    GET /api/study-load         - تحليل ثقل الترم القادم
    GET /api/plan               - الخطة الدراسية الكاملة
    GET /api/dashboard          - مجمَّع كل ما سبق في طلب واحد
    POST /api/login             - تسجيل دخول تجريبي (يقبل أي كلمة مرور)
    GET /                       - يخدم /frontend/index.html (Login)

EN: Serves the vanilla HTML/CSS/JS frontend and the rule-engine
    REST API from a single port. CORS is open for local development.
============================================================
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from engine import run_engine
from pdf_extractor import extract_all

# AR: مسار مجلد الواجهة الأمامية (HTML/CSS/JS الخالص).
# EN: Static frontend folder (vanilla HTML/CSS/JS).
FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"


# ============================================================
# AR: نُحمّل سجل الطالبة مرة واحدة عند الإقلاع ثم نُخدّمه بسرعة.
# EN: Load + parse PDFs once at startup, then serve from memory.
#     Wrapped in try/except so a PDF parsing error never crashes the server.
# ============================================================
try:
    _RECORD = extract_all()
    _RESULT = run_engine(_RECORD)
    print(f"[EduPilot] Loaded student: {_RECORD.student_name} ({_RECORD.student_id})")
    print(f"[EduPilot] Plan: {len(_RECORD.plan)} courses, "
          f"Passed: {len(_RECORD.passed_courses)}, "
          f"Alerts: {len(_RESULT.alerts)}, Bridges: {len(_RESULT.bridges)}")
except Exception as exc:  # pragma: no cover
    print(f"[EduPilot] Startup parsing failed: {exc!r} — using empty fallback")
    from fallback_data import build_fallback_record

    _RECORD = build_fallback_record()
    _RESULT = run_engine(_RECORD)


app = FastAPI(
    title="EduPilot Backend",
    description="محرك القرار الاستباقي للطالب — EduPilot proactive academic AI engine",
    version="1.0.0",
)


# CORS — السماح بطلبات الفرونت في وضع التطوير
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,
)


def _refresh_if_empty() -> None:
    """AR: ضمان توفّر البيانات حتى لو فشل التحميل عند الإقلاع.
    EN: Lazy re-load in case startup parsing failed."""
    global _RECORD, _RESULT
    if not _RECORD.student_id:
        _RECORD = extract_all()
        _RESULT = run_engine(_RECORD)


# ============================================================
# Schemas · مخططات الإدخال
# ============================================================
class LoginRequest(BaseModel):
    student_id: str
    password: str = ""        # AR: أي كلمة مرور مقبولة في النموذج الأولي


# ============================================================
# Routes · المسارات
# ============================================================
@app.get("/api/health")
def health() -> dict[str, Any]:
    """فحص بسيط للخدمة."""
    return {"status": "ok", "student_loaded": bool(_RECORD.student_id)}


@app.get("/api/student")
def get_student() -> dict[str, Any]:
    """AR: هوية الطالبة + معلوماتها الأكاديمية الأساسية."""
    _refresh_if_empty()
    return {
        "student_id": _RECORD.student_id,
        "student_name": _RECORD.student_name,
        "program": _RECORD.program,
        "gpa": _RECORD.gpa,
        "passed_courses": [
            {
                "code": c.code,
                "name": c.name,
                "grade": c.grade,
                "hours": c.hours,
                "term": c.term,
            }
            for c in _RECORD.passed_courses
        ],
        "current_term_courses": _RECORD.current_term_courses,
    }


@app.get("/api/plan")
def get_plan() -> dict[str, Any]:
    """AR: الخطة الدراسية الكاملة مع شجرة المتطلبات."""
    _refresh_if_empty()
    return {
        "plan": [
            {
                "code": c.code,
                "name": c.name,
                "hours": c.hours,
                "level": c.level,
                "type": c.type,
                "yearly_only": c.yearly_only,
                "prerequisites": c.prerequisites,
                "difficulty": c.difficulty,
            }
            for c in _RECORD.plan
        ]
    }


@app.get("/api/alerts")
def get_alerts() -> dict[str, Any]:
    """AR: تنبيهات الرادار الاستباقي (المتطلبات الأساسية + المواد السنوية)."""
    _refresh_if_empty()
    return {"alerts": _RESULT.to_dict()["alerts"]}


@app.get("/api/knowledge-bridges")
def get_bridges() -> dict[str, Any]:
    """AR: جسور المعرفة بناءً على ضعف المتطلبات السابقة."""
    _refresh_if_empty()
    return {"bridges": _RESULT.to_dict()["bridges"]}


@app.get("/api/study-load")
def get_load() -> dict[str, Any]:
    """AR: تحليل ثقل الدراسة للترم القادم."""
    _refresh_if_empty()
    return {"load": _RESULT.to_dict()["load"]}


@app.get("/api/dashboard")
def get_dashboard() -> dict[str, Any]:
    """AR: كل البيانات في طلب واحد — مفيد لتقليل عدد الـ requests."""
    _refresh_if_empty()
    return {
        "student": get_student(),
        **_RESULT.to_dict(),
        "plan": get_plan()["plan"],
    }


@app.post("/api/login")
def login(body: LoginRequest) -> dict[str, Any]:
    """AR: تسجيل دخول تجريبي.
    EN: Demo login — accepts any password for the prototype.

    The student ID must match the parsed identity; otherwise 401."""
    _refresh_if_empty()
    if body.student_id.strip() != _RECORD.student_id:
        raise HTTPException(status_code=401, detail="رقم جامعي غير معروف")
    return {
        "ok": True,
        "student_id": _RECORD.student_id,
        "student_name": _RECORD.student_name,
        "token": f"demo-{_RECORD.student_id}",
    }


# ============================================================
# Static frontend · تقديم ملفات HTML/CSS/JS من /frontend
# ============================================================
# AR: نُركّب الواجهة الأمامية على الجذر "/" بحيث يُمكن فتح
#     http://127.0.0.1:8000/ مباشرة لرؤية صفحة تسجيل الدخول.
#     مع html=True تُقدّم StaticFiles ملف index.html تلقائياً للجذر.
# EN: Mount the vanilla HTML/CSS/JS frontend at "/" so the browser
#     can open the login page directly from the same server.
#     html=True makes StaticFiles serve index.html for the root URL.
# IMPORTANT: this mount must be added AFTER all /api routes so
#            those routes are matched first.
if FRONTEND_DIR.exists():
    app.mount(
        "/",
        StaticFiles(directory=str(FRONTEND_DIR), html=True),
        name="frontend",
    )


# ============================================================
# Local entry · uvicorn app:app --reload
# ============================================================
if __name__ == "__main__":
    import uvicorn

    # AR: reload=False أكثر استقراراً على Windows في وضع التسليم.
    # EN: reload=False is more stable on Windows for the demo.
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
