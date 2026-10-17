from celery import Celery
from celery.schedules import crontab
from config import settings

celery_app = Celery(
    "fine_monitoring",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
    include=["workers.tasks"],
)

celery_app.conf.timezone = "Europe/Moscow"

celery_app.conf.beat_schedule = {
    "generate-overdue-report-daily": {
        "task": "workers.tasks.generate_overdue_report",
        "schedule": crontab(hour=settings.report_cron_hour, minute=0),
    },
}