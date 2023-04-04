from sqlalchemy import Column, Integer, String, ForeignKey, BigInteger
from database import Base
from sqlalchemy.orm import relationship


class Employee(Base):
    __tablename__ = 'employees'

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(50))
    email = Column(String(50))
    mobile = Column(String(15))
    password = Column(String(200))
    
    # user_id = Column(Integer, ForeignKey('users.id'))

    # creator = relationship("User", back_populates="blogs")

class Manager(Base):
    __tablename__ = 'managers'

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(50))
    email = Column(String(50))
    mobile = Column(String(15))
    password = Column(String(200))


class Admin(Base):
    __tablename__ = 'admins'

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(50))
    email = Column(String(50))
    mobile = Column(String(15))
    password = Column(String(200))


# class User(Base):
#     __tablename__ = 'users'

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String(50))
#     email = Column(String(50))
#     password = Column(String(200))

#     blogs = relationship('Blog', back_populates="creator")
