import os
from fastapi import FastAPI, UploadFile, File, Form, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from auth.dependencies import get_current_user
from database.models import Base, User, ResumeAnalysis
from database.database import engine, SessionLocal
from utils.resume_formatter import format_resume_display
from agents.comparison_engine import compare_resumes
from agents.resume_rewriter_agent import rewrite_resume
from agents.cover_letter_agent import generate_cover_letter
from agents.suggestion_agent import generate_suggestions
from parsers.resume_parser import extract_resume_text
from parsers.resume_nlp_parser import parse_resume
from parsers.jd_parser import parse_job_description
from scoring.ats_score import calculate_ats_score

# =========================================
# APP SETUP
# =========================================

app = FastAPI(title="ResumeForge AI")

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    lambda request, exc: {"detail": "Rate limit exceeded"}
)
app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://resumeforge-ai-frontend.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================
# DATABASE INIT
# =========================================

Base.metadata.create_all(bind=engine)

# =========================================
# UPLOAD CONFIG
# =========================================

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = [".pdf", ".docx"]
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def validate_resume_file(file: UploadFile, file_size: int):
    filename = file.filename.lower()
    valid_extension = any(filename.endswith(ext) for ext in ALLOWED_EXTENSIONS)
    if not valid_extension:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are allowed")
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds 10 MB limit")


# =========================================
# HEALTH CHECK
# =========================================

@app.get("/")
def home():
    return {"message": "ResumeForge AI Backend Running"}


# =========================================
# ME ENDPOINT
# =========================================

@app.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "auth0_id": current_user.auth0_id,
    }


# =========================================
# ANALYZE RESUME
# =========================================

@app.post("/analyze-resume/")
@limiter.limit("10/minute")
async def analyze_resume(
    request: Request,
    file: UploadFile = File(...),
    job_description: str = Form(...),
    target_role: str = Form(default="Software Engineer"),
    current_user: User = Depends(get_current_user),
):
    contents = await file.read()
    file_size = len(contents)
    validate_resume_file(file, file_size)

    # Save file
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    # Pipeline
    extracted_text = extract_resume_text(file_path)
    parsed_resume = parse_resume(extracted_text)
    parsed_jd = parse_job_description(job_description)
    ats_analysis = calculate_ats_score(parsed_resume, parsed_jd)

    optimized_resume = rewrite_resume(
        extracted_text,
        job_description,
        ats_analysis["missing_skills"],
        parsed_resume,
        parsed_jd,
    )

    optimized_resume_data = parse_resume(optimized_resume)

    comparison_analysis = compare_resumes(
        extracted_text,
        optimized_resume,
        parsed_resume["skills"],
        optimized_resume_data["skills"],
    )

    cover_letter = generate_cover_letter(
        extracted_text,
        job_description,
        parsed_resume["skills"],
    )

    suggestions = generate_suggestions(
        ats_analysis["ats_score"],
        ats_analysis["matched_skills"],
        ats_analysis["missing_skills"],
        parsed_resume,
        parsed_jd,
    )

    # Save to DB
    db = SessionLocal()
    try:
        analysis_record = ResumeAnalysis(
            user_id=current_user.id,
            filename=file.filename,
            ats_score=ats_analysis["ats_score"],
            resume_data=parsed_resume,
            jd_data=parsed_jd,
            ats_analysis=ats_analysis,
            comparison_analysis=comparison_analysis,
            original_resume=format_resume_display(extracted_text),
            optimized_resume=optimized_resume,
            cover_letter=cover_letter,
            suggestions=suggestions,
            target_role=target_role,
        )
        db.add(analysis_record)
        db.commit()
        db.refresh(analysis_record)
    finally:
        db.close()

    return {
        "resume_data": parsed_resume,
        "jd_data": parsed_jd,
        "ats_analysis": ats_analysis,
        "original_resume": format_resume_display(extracted_text),
        "optimized_resume": optimized_resume,
        "cover_letter": cover_letter,
        "suggestions": suggestions,
        "comparison_analysis": comparison_analysis,
        "target_role": target_role,
    }


# =========================================
# HISTORY
# =========================================

@app.get("/my-analyses")
def get_my_analyses(current_user: User = Depends(get_current_user)):
    db = SessionLocal()
    try:
        analyses = db.query(ResumeAnalysis).filter(
            ResumeAnalysis.user_id == current_user.id
        ).order_by(ResumeAnalysis.created_at.desc()).all()
        return analyses
    finally:
        db.close()


@app.get("/analysis/{analysis_id}")
def get_analysis_details(
    analysis_id: int,
    current_user: User = Depends(get_current_user),
):
    db = SessionLocal()
    try:
        analysis = db.query(ResumeAnalysis).filter(
            ResumeAnalysis.id == analysis_id,
            ResumeAnalysis.user_id == current_user.id,
        ).first()
        if not analysis:
            raise HTTPException(status_code=404, detail="Analysis not found")
        return analysis
    finally:
        db.close()


# =========================================
# DELETE ANALYSIS
# =========================================

@app.delete("/analysis/{analysis_id}")
def delete_analysis(
    analysis_id: int,
    current_user: User = Depends(get_current_user),
):
    db = SessionLocal()
    try:
        analysis = db.query(ResumeAnalysis).filter(
            ResumeAnalysis.id == analysis_id,
            ResumeAnalysis.user_id == current_user.id,
        ).first()
        if not analysis:
            raise HTTPException(status_code=404, detail="Analysis not found")
        db.delete(analysis)
        db.commit()
        return {"success": True, "message": "Analysis deleted"}
    finally:
        db.close()