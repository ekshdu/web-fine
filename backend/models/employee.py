from pydantic import BaseModel
from typing import Optional
class Employee(BaseModel):
    id: int
    id_user: int
    name: str
    surname: str
    middle_name: Optional[str] = None
    phone_number: Optional[str] = None
    username: str
