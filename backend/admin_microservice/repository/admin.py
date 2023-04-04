from sqlalchemy.orm import Session
import models_actual, schemas
from fastapi import HTTPException,status
from hashing import Hash

def get_all(db: Session):
    admins = db.query(models_actual.Admin).all()
    return admins

# password = Hash.bcrypt('balavicky@123')

def create(request: schemas.Admin,db: Session):
    new_admin = models_actual.Admin(full_name=request.full_name, email=request.email, mobile = request.mobile, password = Hash.bcrypt(request.password))
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin

def destroy(id:int,db: Session):
    admin = db.query(models_actual.Admin).filter(models_actual.Admin.id == id)
    if not admin.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Blog with id {id} not found")

    admin.delete(synchronize_session=False)
    db.commit()
    return 'done'

def update(id:int,request:schemas.Admin, db:Session):
    admin = db.query(models_actual.Admin).filter(models_actual.Admin.id == id)

    if not admin.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Blog with id {id} not found")

    admin.update(request)
    db.commit()
    return 'updated'

def show(id:int,db:Session):
    admin = db.query(models_actual.Admin).filter(models_actual.Admin.id == id).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Blog with the id {id} is not available")
    return admin