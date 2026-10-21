from repositories.driver_repository import DriverRepository


class DriverService:
    def __init__(self, repository: DriverRepository):
        self.repository = repository

    def login(self, plate: str) -> dict | None:
        normalized_plate = plate.strip().upper()
        return self.repository.find_by_plate(normalized_plate)