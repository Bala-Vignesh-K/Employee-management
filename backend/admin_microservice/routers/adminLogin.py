from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
import schemas, database, models_actual, token_actual
from hashing import Hash
from sqlalchemy.orm import Session
from typing import Annotated


router = APIRouter(tags=['Authentication'])

# def login(request:OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):

@router.post('/admin-login')
def login(request:OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    admin = db.query(models_actual.Admin).filter(models_actual.Admin.email == request.username).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Invalid Credentials")
    if not Hash.verify(request.password, admin.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Incorrect password")

    access_token = token_actual.create_access_token(data={"sub": admin.email})
    return { "email": admin.email, "id": admin.id, "access_token": access_token, "token_type": "bearer", "expiresIn": token_actual.ACCESS_TOKEN_EXPIRE_MINUTES}
    # return { "access_token": access_token, "token_type": "bearer"}