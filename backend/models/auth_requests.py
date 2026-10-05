from pydantic import BaseModel
class DriverLoginRequest(BaseModel):
    plate: str
class EmployeeLoginRequest(BaseModel):
    username: str
    password: str
