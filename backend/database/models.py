from sqlalchemy import ForeignKey
from sqlalchemy import Boolean
from sqlalchemy import JSON
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Text
from sqlalchemy import DateTime

from datetime import datetime

from database.database import Base



class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True,
        index=True
    )

    email = Column(
        String,
        unique=True,
        index=True
    )

    hashed_password = Column(String)

    is_active = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )




class ResumeAnalysis(Base):

    __tablename__ = "resume_analyses"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
    Integer,
    ForeignKey("users.id")
)

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

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )