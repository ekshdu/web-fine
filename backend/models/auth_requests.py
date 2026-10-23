import datetime
from typing import Optional
from pydantic import BaseModel


class DriverLoginRequest(BaseModel):
    plate: str


class EmployeeLoginRequest(BaseModel):
    username: str
    password: str


class DriverRegisterRequest(BaseModel):
    surname: str
    name: str
    middle_name: Optional[str] = None
    plate: str
    car_model: str
    id_gender: Optional[int] = None
    place_of_birth: Optional[str] = None
    date_of_birth: Optional[datetime.date] = None