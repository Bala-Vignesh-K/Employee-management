from sqlalchemy.orm import Session
import models_actual, schemas
from fastapi import HTTPException,status
from hashing import Hash

def get_all(db: Session):
    employees = db.query(models_actual.Employee).all()
    return employees

# password=Hash.bcrypt('Admin@2023')

def create(request: schemas.Employee,db: Session):
    new_employee = models_actual.Employee(full_name=request.full_name, email=request.email, mobile = request.mobile, password = Hash.bcrypt(request.password))
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee

def destroy(id:int,db: Session):
    employee = db.query(models_actual.Employee).filter(models_actual.Employee.id == id)
    if not employee.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Blog with id {id} not found")

    employee.delete(synchronize_session=False)
    db.commit()
    return 'done'

def update(id:int,request:schemas.Employee, db:Session):
    employee = db.query(models_actual.Employee).filter(models_actual.Employee.id == id)

    if not employee.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Blog with id {id} not found")

    employee.update(request)
    db.commit()
    return 'updated'

def show(id:int,db:Session):
    employee = db.query(models_actual.Employee).filter(models_actual.Employee.id == id).first()
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Blog with the id {id} is not available")
    return employee