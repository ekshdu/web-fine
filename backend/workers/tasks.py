import logging
from celery_app import celery_app
from db import get_connection, release_connection
from repositories.fine_repository import FineRepository
from services.fine_service import FineService
from services.report_service import ReportService

logger = logging.getLogger("celery.tasks")


@celery_app.task(name="workers.tasks.generate_overdue_report", bind=True, max_retries=3)
def generate_overdue_report(self):
    conn = get_connection()
    try:
        fine_repository = FineRepository(conn)
        fine_service = FineService(fine_repository)

        fine_service.refresh_overdue_statuses()

        overdue_fines = fine_service.get_overdue_fines()
        if not overdue_fines:
            logger.info("Просроченных штрафов нет, отчёт не формируется")
            return {"status": "empty"}

        report_service = ReportService()
        # 1) таблица просроченных постановлений, 2) один Word со всеми постановлениями из неё
        excel_path = report_service.build_excel_report(overdue_fines)
        document_records = fine_service.get_overdue_document_records(overdue_fines)
        word_path = report_service.build_word_report(document_records)

        logger.info(f"Реестр постановлений сформирован: {word_path}, {excel_path}")
        return {
            "status": "ok",
            "count": len(overdue_fines),
            "word_path": word_path,
            "excel_path": excel_path,
        }
    except Exception as exc:
        logger.exception("Ошибка формирования реестра просроченных штрафов")
        raise self.retry(exc=exc, countdown=60)
    finally:
        release_connection(conn)