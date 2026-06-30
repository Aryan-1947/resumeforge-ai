from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from database.database import SessionLocal
from database.models import User
from auth.security import verify_access_token

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    payload = verify_access_token(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    # Auth0 user ID is in the 'sub' field e.g. "auth0|abc123"
    auth0_id = payload.get("sub")

    db = SessionLocal()

    try:
        user = db.query(User).filter(User.auth0_id == auth0_id).first()

        # Auto-create user on first login
        if not user:
            email = payload.get("email") or f"{auth0_id}@noemail.resumeforge.ai"

            user = User(
                auth0_id=auth0_id,
                email=email,
                username=payload.get("nickname", auth0_id),
            )

            db.add(user)

            try:
                db.commit()
                db.refresh(user)
            except Exception:
                db.rollback()
                user = db.query(User).filter(User.auth0_id == auth0_id).first()

        return user

    finally:
        db.close()