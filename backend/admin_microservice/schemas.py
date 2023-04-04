from typing import List, Optional
from pydantic import BaseModel


# class BlogBase(BaseModel):
#     title: str
#     body: str

class Employee(BaseModel):
    full_name: str
    email: str
    mobile: str
    password: str
    class Config():
        orm_mode = True

class ShowEmployee(BaseModel):
    id: int
    full_name: str
    email: str
    mobile: str
    class Config():
        orm_mode = True

class Manager(BaseModel):
    full_name: str
    email: str
    mobile: str
    password: str
    class Config():
        orm_mode = True

class ShowManager(BaseModel):
    id: int
    full_name: str
    email: str
    mobile: str
    class Config():
        orm_mode = True

class Admin(BaseModel):
    full_name: str
    email: str
    mobile: str
    password: str
    class Config():
        orm_mode = True

class ShowAdmin(BaseModel):
    id: int
    full_name: str
    email: str
    mobile: str
    class Config():
        orm_mode = True


class Login(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


# class User(BaseModel):
#     name:str
#     email:str
#     password:str

# class ShowUser(BaseModel):
#     name:str
#     email:str
#     blogs : List[Blog] =[]
#     class Config():
#         orm_mode = True

# class ShowBlog(BaseModel):
#     title: str
#     body:str
#     # creator: ShowUser

#     class Config():
#         orm_mode = True


# class Token(BaseModel):
#     access_token: str
#     token_type: str


# class TokenData(BaseModel):
#     email: Optional[str] = None
