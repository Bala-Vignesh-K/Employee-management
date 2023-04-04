from typing import List
from fastapi import APIRouter,Depends,status,HTTPException
import schemas, database
import database, schemas
import schemas, database, models_actual, oauth2
from sqlalchemy.orm import Session
from repository import employee

router = APIRouter(
    prefix="/employee",
    tags=['Employees']
)

get_db = database.get_db

# @router.get('/', response_model=List[schemas.Employee])
# def all(db: Session = Depends(get_db),current_user: schemas.User = Depends(oauth2.get_current_user)):
#     return employee.get_all(db)

# I have removed all the 'current_user' from all the below functions. It probably needs to be added


@router.get('/', response_model=List[schemas.ShowEmployee])
def all(db: Session = Depends(get_db), get_current_user: schemas.Admin = Depends(oauth2.get_current_user)):
    return employee.get_all(db)


@router.post('/', status_code=status.HTTP_201_CREATED,)
def create(request: schemas.Employee, db: Session = Depends(get_db)):
    return employee.create(request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def destroy(id:int, db: Session = Depends(get_db)):
    return employee.destroy(id,db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
def update(id:int, request: schemas.Employee, db: Session = Depends(get_db)):
    return employee.update(id,request, db)


@router.get('/{id}', status_code=200, response_model=schemas.ShowEmployee)
def show(id:int, db: Session = Depends(get_db)):
    return employee.show(id,db)