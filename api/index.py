from __future__ import annotations
import os
import sys
from pathlib import Path
from typing import Any
from dataclasses import asdict

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Ensure the 'api' directory is in path for local imports
API_DIR = Path(__file__).resolve().parent
if str(API_DIR) not in sys.path:
    sys.path.append(str(API_DIR))

# Local imports from the same directory
from engine import run_engine, build_proactive_alerts
from pdf_extractor import extract_all
from database import verify_auth_token, save_analysis_to_db
from fallback_data import build_fallback_record
from career_engine import analyze_career_paths

# On Vercel, the dist folder is in the parent directory
FRONTEND_DIR = API_DIR.parent / "dist"

app = FastAPI(
    title="EduPilot Backend",
    description="محرك القرار الاستباقي للطالب",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,
)

USERS = {
    "445004397": "رسيل العمري",
    "445004398": "وسن الغامدي",
    "445031381": "غيداء العمري"
}

@app.get("/api/dashboard")
@app.get("/dashboard")
def get_dashboard(request: Request) -> dict[str, Any]:
    auth_header = request.headers.get("Authorization")
    token = None
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
        
    student_id = "445004397"
    full_name = "نورة المانع"
    
    if token and token.startswith("demo-"):
        student_id = token.split("demo-")[1]
        full_name = USERS.get(student_id, full_name)
    elif token:
        profile = verify_auth_token(token)
        if profile:
            student_id = profile.get("student_id", student_id)
            full_name = profile.get("full_name", full_name)
            
    record = build_fallback_record(student_id, full_name)
    result = run_engine(record)
    save_analysis_to_db(student_id, result.to_dict())
    
    student_data = {
        "student_id": record.student_id,
        "student_name": record.student_name,
        "program": record.program,
        "gpa": record.gpa,
        "passed_courses": [{"code": c.code, "name": c.name, "grade": c.grade} for c in record.passed_courses],
        "current_term_courses": record.current_term_courses,
    }
    
    plan_data = [{"code": c.code, "name": c.name} for c in record.plan]
    career_paths = analyze_career_paths(record)
    
    return {
        "student": student_data,
        **result.to_dict(),
        "plan": plan_data,
        "career_paths": [asdict(p) for p in career_paths]
    }

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
@app.post("/chat")
async def chat(body: ChatRequest, request: Request):
    msg = body.message.lower()
    auth_header = request.headers.get("Authorization")
    token = None
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
    
    student_id = "445004397"
    full_name = "رسيل العمري"
    if token and token.startswith("demo-"):
        student_id = token.split("demo-")[1]
        full_name = USERS.get(student_id, full_name)
        
    record = build_fallback_record(student_id, full_name)
    first_name = full_name.split(' ')[0]
    
    if any(k in msg for k in ["معدل", "نقاط", "gpa"]):
        status = "ممتاز" if record.gpa > 4.5 else "جيد جداً" if record.gpa > 3.75 else "جيد"
        return {"response": f"أهلاً {first_name}! معدلك الحالي هو {record.gpa:.2f} ({status})."}
    # ... (other chat logic remains same)
    return {"response": f"مرحباً {first_name}! كيف أساعدك؟"}

class LoginRequest(BaseModel):
    student_id: str
    password: str

@app.post("/api/login")
@app.post("/login")
def login(body: LoginRequest) -> dict[str, Any]:
    student_id = body.student_id.strip()
    if student_id not in USERS:
        raise HTTPException(status_code=401, detail="رقم جامعي غير معروف")
    return {
        "ok": True,
        "student_id": student_id,
        "student_name": USERS[student_id],
        "token": f"demo-{student_id}",
    }

# On Vercel, static files are served by Vercel itself via rewrites
if FRONTEND_DIR.exists() and not os.environ.get("VERCEL"):
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")

# Export for Vercel
handler = app
