from fastapi import APIRouter, Depends, HTTPException
from db import get_db
from models.car_requests import CarCreateRequest
from repositories.car_repository import CarRepository
from services.car_service import CarService

router = APIRouter()


def get_car_service(conn=Depends(get_db)) -> CarService:
    repository = CarRepository(conn)
    return CarService(repository)


@router.get("/drivers/{driver_id}/cars")
def get_driver_cars(driver_id: int, service: CarService = Depends(get_car_service)):
    return service.get_driver_cars(driver_id)


@router.post("/drivers/{driver_id}/cars")
def add_car(driver_id: int, data: CarCreateRequest, service: CarService = Depends(get_car_service)):
    try:
        return service.add_car(driver_id, data.car_num, data.car_model)
    except ValueError as error:
        raise HTTPException(status_code=409, detail=str(error))


@router.delete("/drivers/{driver_id}/cars/{car_id}")
def unlink_car(driver_id: int, car_id: int, service: CarService = Depends(get_car_service)):
    try:
        service.unlink_car(driver_id, car_id)
    except LookupError as error:
        raise HTTPException(status_code=404, detail=str(error))
    except ValueError as error:
        raise HTTPException(status_code=409, detail=str(error))
    return {"status": "unlinked"}