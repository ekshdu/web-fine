import re
from repositories.driver_repository import DriverRepository

NAME_PATTERN = re.compile(r"^[A-Za-zА-Яа-яЁё]+(?:[ -][A-Za-zА-Яа-яЁё]+)*$")


class PlateAlreadyExistsError(Exception):
    pass


class DriverService:
    def __init__(self, repository: DriverRepository):
        self.repository = repository

    def login(self, plate: str) -> dict | None:
        normalized_plate = plate.strip().upper()
        return self.repository.find_by_plate(normalized_plate)

    def register(self, data: dict) -> dict | None:
        surname = data["surname"].strip()
        name = data["name"].strip()
        middle_name = (data.get("middle_name") or "").strip()
        plate = data["plate"].strip().upper()
        car_model = data["car_model"].strip()
        place_of_birth = (data.get("place_of_birth") or "").strip()

        if not (surname and name and plate and car_model):
            raise ValueError("Заполните обязательные поля (ФИО, авто)")
        if not NAME_PATTERN.match(surname):
            raise ValueError("Фамилия должна содержать только буквы")
        if not NAME_PATTERN.match(name):
            raise ValueError("Имя должно содержать только буквы")
        if middle_name and not NAME_PATTERN.match(middle_name):
            raise ValueError("Отчество должно содержать только буквы")
        if place_of_birth and not NAME_PATTERN.match(place_of_birth):
            raise ValueError("Место рождения должно содержать только буквы")

        gender_id = data.get("id_gender")
        if gender_id is not None and not self.repository.gender_exists(gender_id):
            raise ValueError("Указан неизвестный пол")

        if self.repository.plate_exists(plate):
            raise PlateAlreadyExistsError("Автомобиль с таким госномером уже зарегистрирован")

        return self.repository.create_with_car({
            "surname": surname,
            "name": name,
            "middle_name": middle_name or None,
            "plate": plate,
            "car_model": car_model,
            "place_of_birth": place_of_birth or None,
            "date_of_birth": data.get("date_of_birth"),
            "id_gender": gender_id,
        })