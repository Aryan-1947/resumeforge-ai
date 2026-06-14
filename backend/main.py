import os

from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from fastapi import HTTPException
from auth.dependencies import get_current_user
from fastapi import Depends

from auth.security import (
    hash_password,
    verify_password,
    create_access_token
)

from schemas.auth_schema import (
    UserSignup,
    UserLogin
)

from database.models import User
from database.database import SessionLocal
from database.models import Base, User, ResumeAnalysis
from database.database import engine
from utils.resume_formatter import format_resume_display
from agents.comparison_engine import compare_resumes
from fastapi import FastAPI, UploadFile, File, Form, Request
from agents.resume_rewriter_agent import rewrite_resume
from parsers.resume_parser import extract_resume_text
from parsers.resume_nlp_parser import parse_resume
from parsers.jd_parser import parse_job_description
from scoring.ats_score import calculate_ats_score
from agents.cover_letter_agent import generate_cover_letter
from agents.suggestion_agent import generate_suggestions
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

limiter = Limiter(
    key_func=get_remote_address
)

app.state.limiter = limiter

app.add_exception_handler(
    RateLimitExceeded,
    lambda request, exc: {
        "detail": "Rate limit exceeded"
    }
)

app.add_middleware(
    SlowAPIMiddleware
)



app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================
# DATABASE INITIALIZATION
# =========================================

print(Base.metadata.tables.keys())


Base.metadata.create_all(bind=engine)

# =========================================



UPLOAD_FOLDER = "uploads"

ALLOWED_EXTENSIONS = [
    ".pdf",
    ".docx"
]

MAX_FILE_SIZE = 10 * 1024 * 1024
# 10 MB

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def validate_resume_file(
    file: UploadFile,
    file_size: int
):

    filename = file.filename.lower()

    valid_extension = any(
        filename.endswith(ext)
        for ext in ALLOWED_EXTENSIONS
    )

    if not valid_extension:

        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed"
        )

    if file_size > MAX_FILE_SIZE:

        raise HTTPException(
            status_code=400,
            detail="File size exceeds 10 MB limit"
        )


@app.get("/")
def home():
    return {"message": "Resume Tailor AI Backend Running"}


@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):

    contents = await file.read()

    file_size = len(contents)

    validate_resume_file(
    file,
    file_size
)

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
      buffer.write(contents)
    extracted_text = extract_resume_text(file_path)

    parsed_data = parse_resume(extracted_text)

    return {
        "filename": file.filename,
        "parsed_data": parsed_data,
        "raw_text": extracted_text
    }


# =========================================
# ADD THIS WHOLE BLOCK HERE
# =========================================

@app.post("/parse-job-description/")
async def parse_jd(data: dict):

    job_description = data.get("job_description", "")

    parsed_jd = parse_job_description(job_description)

    return {
        "parsed_jd": parsed_jd
    }

# =========================================
# END OF NEW BLOCK
# =========================================


@app.post("/calculate-ats-score/")
async def ats_score(data: dict):

    resume_data = data.get("resume_data", {})

    jd_data = data.get("jd_data", {})

    ats_result = calculate_ats_score(
        resume_data,
        jd_data
    )

    return {
        "ats_analysis": ats_result
    }




@app.post("/signup")
@limiter.limit("3/minute")
def signup(
    request: Request,
    user: UserSignup
):
    db = SessionLocal()

    try:

        existing_username = db.query(User).filter(
            User.username == user.username
        ).first()

        if existing_username:

            return {
                "success": False,
                "message": "Username already exists"
            }

        existing_email = db.query(User).filter(
            User.email == user.email
        ).first()

        if existing_email:

            return {
                "success": False,
                "message": "Email already exists"
            }

        new_user = User(

            username=user.username,

            email=user.email,

            hashed_password=hash_password(
                user.password
            )
        )

        db.add(new_user)

        db.commit()

        db.refresh(new_user)

        return {

            "success": True,

            "message": "User registered successfully"
        }

    finally:

        db.close()




from fastapi import Request

@app.post("/login")
@limiter.limit("5/minute")
def login(
    request: Request,
    user: UserLogin
):

    db = SessionLocal()

    try:

        existing_user = db.query(User).filter(
            User.email == user.email
        ).first()

        if not existing_user:

            return {
                "success": False,
                "message": "Invalid email or password"
            }

        password_valid = verify_password(
            user.password,
            existing_user.hashed_password
        )

        if not password_valid:

            return {
                "success": False,
                "message": "Invalid email or password"
            }

        access_token = create_access_token(
            {
                "sub": existing_user.email,
                "user_id": existing_user.id
            }
        )

        return {

            "success": True,

            "access_token": access_token,

            "token_type": "bearer",

            "username": existing_user.username
        }

    finally:

        db.close()



@app.get("/me")
def get_me(

    current_user: User = Depends(
        get_current_user
    )
):

    return {

        "id": current_user.id,

        "username": current_user.username,

        "email": current_user.email
    }


# =========================================
# MY ANALYSES
# =========================================

@app.get("/my-analyses")
def get_my_analyses(

    current_user: User = Depends(
        get_current_user
    )
):

    db = SessionLocal()

    try:

        analyses = db.query(
            ResumeAnalysis
        ).filter(

            ResumeAnalysis.user_id
            == current_user.id

        ).all()

        return analyses

    finally:

        db.close()




@app.get("/analysis/{analysis_id}")
def get_analysis_details(

    analysis_id: int,

    current_user: User = Depends(
        get_current_user
    )
):

    db = SessionLocal()

    try:

        analysis = db.query(
            ResumeAnalysis
        ).filter(

            ResumeAnalysis.id == analysis_id,

            ResumeAnalysis.user_id == current_user.id

        ).first()

        if not analysis:

            return {
                "success": False,
                "message": "Analysis not found"
            }

        return analysis

    finally:

        db.close()





# Full pipeline integration

from fastapi import Depends


@app.post("/analyze-resume/")
@limiter.limit("10/minute")
async def analyze_resume(
    request: Request,
    file: UploadFile = File(...),
    job_description: str = Form(...),
    current_user: User = Depends(get_current_user)
):
    contents = await file.read()

    file_size = len(contents)

    validate_resume_file(
    file,
    file_size
)

    # -----------------------------------
    # SAVE RESUME
    # -----------------------------------

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
      buffer.write(contents)

    # -----------------------------------
    # EXTRACT RESUME TEXT
    # -----------------------------------

    extracted_text = extract_resume_text(file_path)

    # -----------------------------------
    # PARSE RESUME
    # -----------------------------------

    parsed_resume = parse_resume(extracted_text)

    # -----------------------------------
    # PARSE JOB DESCRIPTION
    # -----------------------------------

    parsed_jd = parse_job_description(job_description)

    # -----------------------------------
    # CALCULATE ATS SCORE
    # -----------------------------------

    ats_analysis = calculate_ats_score(
        parsed_resume,
        parsed_jd
    )

    # -----------------------------------
    # AI RESUME REWRITING
    # -----------------------------------

    optimized_resume = rewrite_resume(
    extracted_text,
    job_description,
    ats_analysis["missing_skills"],
    parsed_resume,
    parsed_jd
)
    
    # -----------------------------------
    # PARSE OPTIMIZED RESUME
    # -----------------------------------

    optimized_resume_data = parse_resume(
    optimized_resume
)
    

    # -----------------------------------
    # COMPARISON INTELLIGENCE
    # -----------------------------------

    comparison_analysis = compare_resumes(

    extracted_text,

    optimized_resume,

    parsed_resume["skills"],

    optimized_resume_data["skills"]
)



    cover_letter = generate_cover_letter(
        extracted_text,
        job_description,
        parsed_resume["skills"]
    )

    suggestions = generate_suggestions(
        ats_analysis["ats_score"],
        ats_analysis["matched_skills"],
        ats_analysis["missing_skills"],
        parsed_resume,
        parsed_jd
    )

    

    # -----------------------------------
    # SAVE ANALYSIS TO DATABASE
    # -----------------------------------

    db = SessionLocal()

    analysis_record = ResumeAnalysis(

        user_id=current_user.id,

        filename=file.filename,

        ats_score=ats_analysis["ats_score"],

        resume_data=parsed_resume,

        jd_data=parsed_jd,

        ats_analysis=ats_analysis,

        comparison_analysis=comparison_analysis,

        original_resume=format_resume_display(
            extracted_text
),

        optimized_resume=optimized_resume,

        cover_letter=cover_letter,

        suggestions=suggestions
)

    db.add(analysis_record)

    db.commit()

    db.refresh(analysis_record)

    db.close()




    # -----------------------------------
    # FINAL RESPONSE
    # -----------------------------------

    return {

        "resume_data": parsed_resume,

        "jd_data": parsed_jd,

        "ats_analysis": ats_analysis,

        "original_resume": format_resume_display(
    extracted_text
),

        "optimized_resume": optimized_resume,

        "cover_letter": cover_letter,

        "suggestions": suggestions,

        "comparison_analysis": comparison_analysis
    }