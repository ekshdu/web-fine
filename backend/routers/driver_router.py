from fastapi import APIRouter, Depends, HTTPException
from db import get_db
from models.auth_requests import DriverLoginRequest, DriverRegisterRequest
from repositories.driver_repository import DriverRepository
from services.driver_service import DriverService, PlateAlreadyExistsError

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


@router.post("/driver/register", status_code=201)
def driver_register(data: DriverRegisterRequest, service: DriverService = Depends(get_driver_service)):
    try:
        return service.register(data.model_dump())
    except PlateAlreadyExistsError as error:
        raise HTTPException(status_code=409, detail=str(error))
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))