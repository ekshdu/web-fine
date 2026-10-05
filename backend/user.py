from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from db import get_db, dict_cursor
router = APIRouter()
class DriverLoginRequest(BaseModel):
    plate: str
@router.post("/driver/login")
def driver_login(data: DriverLoginRequest, conn=Depends(get_db)):
    cur = dict_cursor(conn)
    cur.execute(
        """
        SELECT d.id AS driver_id, d.name, d.surname, d.middle_name,
               d.place_of_birth, d.date_of_birth, d.id_gender,
               c.id AS car_id, c.car_num, c.car_model
        FROM car c JOIN driver d ON c.id_driver = d.id
        WHERE c.car_num = %s
        """,
        (data.plate.upper(),),
    )
    driver = cur.fetchone()
    cur.close()
    if not driver:
        raise HTTPException(status_code=404, detail="Водитель не найден")
    return driver
