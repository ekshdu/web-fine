import os
from dataclasses import dataclass
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BASE_DIR, ".env"))


@dataclass(frozen=True)
class Settings:
    db_host: str = os.getenv("DB_HOST", "127.0.0.1")
    db_port: int = int(os.getenv("DB_PORT", "5432"))
    db_user: str = os.getenv("DB_USER", "postgres")
    db_password: str = os.getenv("DB_PASSWORD", "1qwerty")
    db_name: str = os.getenv("DB_NAME", "fine")

    cors_origin: str = os.getenv("CORS_ORIGIN", "http://localhost:5173")

    celery_broker_url: str = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
    celery_result_backend: str = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/1")

    templates_dir: str = os.getenv("TEMPLATES_DIR", os.path.join(BASE_DIR, "templates"))
    reports_dir: str = os.getenv("REPORTS_DIR", os.path.join(BASE_DIR, "generated_reports"))

    overdue_days: int = int(os.getenv("OVERDUE_DAYS", "60"))
    report_cron_hour: int = int(os.getenv("REPORT_CRON_HOUR", "3"))


settings = Settings()