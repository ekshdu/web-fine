from fastapi import APIRouter, Depends, HTTPException
from db import get_db
from models.auth_requests import EmployeeLoginRequest
from repositories.employee_repository import EmployeeRepository
from services.employee_service import EmployeeService

router = APIRouter()


def get_employee_service(conn=Depends(get_db)) -> EmployeeService:
    repository = EmployeeRepository(conn)
    return EmployeeService(repository)


@router.post("/employee/login")
def employee_login(data: EmployeeLoginRequest, service: EmployeeService = Depends(get_employee_service)):
    employee = service.login(data.username, data.password)
    if not employee:
        raise HTTPException(status_code=401, detail="Неверный логин/пароль")
    return employee