from pydantic import BaseModel
from typing import Optional


class CarCreateRequest(BaseModel):
    car_num: str
    car_model: Optional[str] = None