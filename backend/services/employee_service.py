from repositories.employee_repository import EmployeeRepository
from security import verify_password


class EmployeeService:
    def __init__(self, repository: EmployeeRepository):
        self.repository = repository

    def login(self, username: str, password: str) -> dict | None:
        employee = self.repository.find_by_username(username.strip())
        if not employee:
            return None
        if not verify_password(password, employee["password_hash"]):
            return None
        employee.pop("password_hash", None)
        return employee