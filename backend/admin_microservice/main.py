from fastapi import FastAPI
import models_actual
from database import engine
from routers import employee, manager, admin, employeeLogin, managerLogin, adminLogin
from fastapi.middleware.cors import CORSMiddleware
import sys

print(sys.getrecursionlimit())
sys.setrecursionlimit(1500)

app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]

)


models_actual.Base.metadata.create_all(engine)


# app.include_router(authentication.router)
app.include_router(employee.router)
app.include_router(manager.router)
app.include_router(admin.router)
app.include_router(employeeLogin.router)
app.include_router(managerLogin.router)
app.include_router(adminLogin.router)

