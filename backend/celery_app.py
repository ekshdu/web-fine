from celery import Celery
from config import settings

celery_app = Celery(
    "fine_monitoring",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
    include=["workers.tasks"],
)

celery_app.conf.timezone = "Europe/Moscow"
celery_app.conf.broker_connection_retry_on_startup = True
celery_app.conf.broker_transport_options = {"socket_connect_timeout": 3, "socket_timeout": 3}