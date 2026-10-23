from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class FineCreateRequest(BaseModel):
    id_emp: int
    car_num: str
    id_fine_sum: int
    id_speed_fine: Optional[int] = None
    id_fine_section: Optional[int] = None
    date_time: datetime
    fine_place: str
    actual_speed: Optional[int] = None


class FineUpdateRequest(BaseModel):
    car_num: Optional[str] = None
    id_fine_sum: Optional[int] = None
    id_status_fine: Optional[int] = None
    id_speed_fine: Optional[int] = None
    id_fine_section: Optional[int] = None
    date_time: Optional[datetime] = None
    num_post: Optional[str] = None
    fine_place: Optional[str] = None
    actual_speed: Optional[int] = None