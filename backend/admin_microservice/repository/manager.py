from sqlalchemy.orm import Session
import models_actual, schemas
from fastapi import HTTPException,status
from hashing import Hash

def get_all(db: Session):
    managers = db.query(models_actual.Manager).all()
    return managers

# password=Hash.bcrypt('Admin@2023')

def create(request: schemas.Manager,db: Session):
    new_manager = models_actual.Manager(full_name=request.full_name, email=request.email, mobile = request.mobile, password = Hash.bcrypt(request.password))
    db.add(new_manager)
    db.commit()
    db.refresh(new_manager)
    return new_manager

def destroy(id:int,db: Session):
    manager = db.query(models_actual.Manager).filter(models_actual.Manager.id == id)
    if not manager.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Blog with id {id} not found")

    manager.delete(synchronize_session=False)
    db.commit()
    return 'done'

def update(id:int,request:schemas.Manager, db:Session):
    manager = db.query(models_actual.Manager).filter(models_actual.Manager.id == id)

    if not manager.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Blog with id {id} not found")

    manager.update(request)
    db.commit()
    return 'updated'

def show(id:int,db:Session):
    manager = db.query(models_actual.Manager).filter(models_actual.Manager.id == id).first()
    if not manager:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Blog with the id {id} is not available")
    return manager