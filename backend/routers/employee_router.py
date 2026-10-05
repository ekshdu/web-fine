from fastapi import APIRouter, Depends, HTTPException
from db import get_db
from models.auth_requests import EmployeeLoginRequest
from repositories.employee_repository import EmployeeRepository
router = APIRouter()
@router.post("/employee/login")
def employee_login(data: EmployeeLoginRequest, conn=Depends(get_db)):
    repo = EmployeeRepository(conn)
    employee = repo.find_by_credentials(data.username, data.password)
    if not employee:
        raise HTTPException(status_code=401, detail="Неверный логин/пароль")
    return employee
