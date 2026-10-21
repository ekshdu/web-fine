import datetime
import logging
from repositories.fine_repository import FineRepository
from config import settings
from services.report.fine_documents import build_fine_word, build_period_excel

logger = logging.getLogger("fine_service")

STATUS_UNPAID_ID = 2


class FineService:
    def __init__(self, repository: FineRepository):
        self.repository = repository

    def refresh_overdue_statuses(self) -> int:
        updated_count = self.repository.mark_overdue_fines(settings.overdue_days)
        if updated_count > 0:
            logger.info(f"Обновлено просроченных штрафов: {updated_count}")
        return updated_count

    def get_overdue_fines(self) -> list[dict]:
        return self.repository.get_overdue_fines()

    def get_overdue_document_records(self, overdue_fines: list[dict]) -> list[dict]:
        records = (self.repository.get_document_data(fine["id"]) for fine in overdue_fines)
        return [record for record in records if record]

    def get_all_fines(self) -> list[dict]:
        # просроченные штрафы помечаем при каждой загрузке списка, как в старой версии программы
        self.refresh_overdue_statuses()
        return self.repository.get_all()

    def get_fine(self, fine_id: int) -> dict | None:
        return self.repository.get_by_id(fine_id)

    def get_fines_by_car(self, car_num: str) -> list[dict]:
        self.refresh_overdue_statuses()
        return self.repository.get_by_car_num(car_num.strip().upper())

    def create_fine(self, data: dict) -> dict:
        data["car_num"] = data["car_num"].strip().upper()
        # номер постановления и статус выставляются автоматически
        data["num_post"] = "П-" + datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        data["id_status_fine"] = STATUS_UNPAID_ID
        return self.repository.create(data)

    def update_fine(self, fine_id: int, data: dict) -> dict | None:
        return self.repository.update(fine_id, data)

    def delete_fine(self, fine_id: int) -> bool:
        return self.repository.delete(fine_id)

    def build_word_document(self, fine_id: int) -> bytes | None:
        record = self.repository.get_document_data(fine_id)
        if not record:
            return None
        return build_fine_word(record)

    def build_period_report(self, date_from: str, date_to: str) -> bytes | None:
        rows = self.repository.get_unpaid_by_period(date_from, date_to)
        if not rows:
            return None
        return build_period_excel(rows)