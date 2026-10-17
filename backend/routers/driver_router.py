from fastapi import APIRouter, Depends, HTTPException
from db import get_db
from models.auth_requests import DriverLoginRequest
from repositories.driver_repository import DriverRepository
from services.driver_service import DriverService

router = APIRouter()


def get_driver_service(conn=Depends(get_db)) -> DriverService:
    repository = DriverRepository(conn)
    return DriverService(repository)


@router.post("/driver/login")
def driver_login(data: DriverLoginRequest, service: DriverService = Depends(get_driver_service)):
    driver = service.login(data.plate)
    if not driver:
        raise HTTPException(status_code=404, detail="Водитель не найден")
    return driver