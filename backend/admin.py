from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from db import get_db, dict_cursor
router = APIRouter()
class EmployeeLoginRequest(BaseModel):
    username: str
    password: str
@router.post("/employee/login")
def employee_login(data: EmployeeLoginRequest, conn=Depends(get_db)):
    cur = dict_cursor(conn)
    cur.execute(
        """
        SELECT e.*, u.username FROM emp_gibdd e
        JOIN user_emp u ON e.id_user = u.id
        WHERE u.username = %s AND u.password = %s
        """,
        (data.username, data.password),
    )
    user = cur.fetchone()
    cur.close()
    if not user:
        raise HTTPException(status_code=401, detail="Неверный логин/пароль")
    return user
