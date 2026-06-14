from auth.security import hash_password
from auth.security import verify_password
from auth.security import create_access_token
from auth.security import verify_access_token


password = "aryan123"

hashed = hash_password(password)

print("HASHED:")
print(hashed)

print()

print(
    verify_password(
        password,
        hashed
    )
)

token = create_access_token(
    {"sub": "aryan"}
)

print()

print("TOKEN:")
print(token)

print()

print(
    verify_access_token(
        token
    )
)