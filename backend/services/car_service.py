from repositories.car_repository import CarRepository


class CarService:
    def __init__(self, repository: CarRepository):
        self.repository = repository

    def get_driver_cars(self, driver_id: int) -> list[dict]:
        return self.repository.get_cars_by_driver(driver_id)

    def add_car(self, driver_id: int, car_num: str, car_model: str | None) -> dict:
        normalized_num = car_num.strip().upper()
        existing = self.repository.find_by_car_num(normalized_num)
        if existing:
            raise ValueError("Автомобиль с таким госномером уже зарегистрирован")
        return self.repository.create(driver_id, normalized_num, car_model)

    def unlink_car(self, driver_id: int, car_id: int) -> None:
        car = self.repository.find_by_id_and_driver(car_id, driver_id)
        if not car:
            raise LookupError("Автомобиль не найден у данного водителя")

        if self.repository.has_fines(car_id):
            raise ValueError("Нельзя удалить автомобиль, по которому есть штрафы")

        self.repository.delete(car_id)