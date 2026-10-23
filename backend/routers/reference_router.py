from fastapi import APIRouter, Depends
from db import get_db
from repositories.reference_repository import ReferenceRepository
from services.reference_service import ReferenceService

router = APIRouter()


def get_reference_service(conn=Depends(get_db)) -> ReferenceService:
    repository = ReferenceRepository(conn)
    return ReferenceService(repository)


@router.get("/references")
def get_references(service: ReferenceService = Depends(get_reference_service)):
    return service.get_all_references()


@router.get("/genders")
def get_genders(service: ReferenceService = Depends(get_reference_service)):
    return service.get_genders()