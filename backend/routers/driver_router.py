from fastapi import APIRouter, Depends, HTTPException
from db import get_db
from models.auth_requests import DriverLoginRequest
from repositories.driver_repository import DriverRepository
router = APIRouter()
@router.post("/driver/login")
def driver_login(data: DriverLoginRequest, conn=Depends(get_db)):
    repo = DriverRepository(conn)
    driver = repo.find_by_plate(data.plate.upper())
    if not driver:
        raise HTTPException(status_code=404, detail="Водитель не найден")
    return driver
