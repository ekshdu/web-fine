import datetime
from fastapi import APIRouter, Depends, HTTPException, Query, Response
from db import get_db
from models.fine_requests import FineCreateRequest, FineUpdateRequest
from repositories.fine_repository import FineRepository
from services.fine_service import FineService

router = APIRouter()

DOCX_MEDIA_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
XLSX_MEDIA_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"


def get_fine_service(conn=Depends(get_db)) -> FineService:
    repository = FineRepository(conn)
    return FineService(repository)


@router.get("/fines")
def get_all_fines(service: FineService = Depends(get_fine_service)):
    return service.get_all_fines()


@router.get("/fines/by-car/{car_num}")
def get_fines_by_car(car_num: str, service: FineService = Depends(get_fine_service)):
    return service.get_fines_by_car(car_num)


@router.get("/fines/{fine_id}")
def get_fine(fine_id: int, service: FineService = Depends(get_fine_service)):
    fine = service.get_fine(fine_id)
    if not fine:
        raise HTTPException(status_code=404, detail="Штраф не найден")
    return fine


@router.get("/fines/{fine_id}/word")
def download_fine_word(fine_id: int, service: FineService = Depends(get_fine_service)):
    try:
        content = service.build_word_document(fine_id)
    except FileNotFoundError as error:
        raise HTTPException(status_code=500, detail=str(error))
    if content is None:
        raise HTTPException(status_code=404, detail="Штраф не найден")
    return Response(content=content, media_type=DOCX_MEDIA_TYPE)


@router.get("/reports/excel")
def download_period_excel(
    date_from: datetime.date = Query(...),
    date_to: datetime.date = Query(...),
    service: FineService = Depends(get_fine_service),
):
    content = service.build_period_report(date_from.isoformat(), date_to.isoformat())
    if content is None:
        raise HTTPException(status_code=404, detail="За выбранный период неоплаченных постановлений не найдено")
    return Response(content=content, media_type=XLSX_MEDIA_TYPE)


@router.post("/fines")
def create_fine(data: FineCreateRequest, service: FineService = Depends(get_fine_service)):
    try:
        return service.create_fine(data.model_dump())
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.put("/fines/{fine_id}")
def update_fine(fine_id: int, data: FineUpdateRequest, service: FineService = Depends(get_fine_service)):
    try:
        fine = service.update_fine(fine_id, data.model_dump(exclude_unset=True))
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))
    if not fine:
        raise HTTPException(status_code=404, detail="Штраф не найден")
    return fine


@router.delete("/fines/{fine_id}")
def delete_fine(fine_id: int, service: FineService = Depends(get_fine_service)):
    deleted = service.delete_fine(fine_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Штраф не найден")
    return {"status": "deleted"}