from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import HTTPBearer
from fastapi.security import HTTPAuthorizationCredentials

from database.database import SessionLocal
from database.models import User

from auth.security import verify_access_token


security = HTTPBearer()


def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(
        security
    )
):

    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:

        raise HTTPException(

            status_code=401,

            detail="Invalid or expired token"
        )

    email = payload.get("sub")

    db = SessionLocal()

    try:

        user = db.query(User).filter(
            User.email == email
        ).first()

        if not user:

            raise HTTPException(

                status_code=401,

                detail="User not found"
            )

        return user

    finally:

        db.close()