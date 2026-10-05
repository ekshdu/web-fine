from pydantic import BaseModel
from typing import Optional
class Driver(BaseModel):
    driver_id: int
    name: str
    surname: str
    middle_name: Optional[str] = None
    place_of_birth: Optional[str] = None
    date_of_birth: Optional[str] = None
    id_gender: Optional[int] = None
    car_id: int
    car_num: str
    car_model: Optional[str] = None
