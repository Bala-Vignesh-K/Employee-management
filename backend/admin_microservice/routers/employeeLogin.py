from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
import schemas, database, models_actual, token_actual
from hashing import Hash
from sqlalchemy.orm import Session


router = APIRouter(tags=['Authentication'])


@router.post('/employee-login')
def login(request:OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    employee = db.query(models_actual.Employee).filter(models_actual.Employee.email == request.username).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Invalid Credentials")
    if not Hash.verify(request.password, employee.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Incorrect password")

    access_token = token_actual.create_access_token(data={"sub": employee.email})
    return {"access_token": access_token, "token_type": "bearer"}