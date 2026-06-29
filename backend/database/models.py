from sqlalchemy import ForeignKey, Boolean, JSON, Column, Integer, String, Float, Text, DateTime
from datetime import datetime
from database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    auth0_id = Column(String, unique=True, index=True)
    username = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class ResumeAnalysis(Base):
    __tablename__ = "resume_analyses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    filename = Column(String)
    ats_score = Column(Float)
    resume_data = Column(JSON)
    jd_data = Column(JSON)
    ats_analysis = Column(JSON)
    comparison_analysis = Column(JSON)
    original_resume = Column(Text)
    optimized_resume = Column(Text)
    cover_letter = Column(Text)
    suggestions = Column(Text)
    target_role = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)