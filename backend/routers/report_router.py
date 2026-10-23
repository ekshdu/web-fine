import datetime
import glob
import os

import redis
from celery.result import AsyncResult
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from celery_app import celery_app
from config import settings

router = APIRouter()

TASK_NAME = "workers.tasks.generate_overdue_report"

FILE_KINDS = {
    "excel": (
        "overdue_registry_*.xlsx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ),
    "word": (
        "overdue_postanovleniya_*.docx",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ),
}


def _latest_file(kind: str) -> str | None:
    pattern, _ = FILE_KINDS[kind]
    files = glob.glob(os.path.join(settings.reports_dir, pattern))
    return max(files, key=os.path.getmtime) if files else None


@router.post("/reports/overdue", status_code=202)
def start_overdue_report():
    try:
        redis.Redis.from_url(
            settings.celery_broker_url, socket_connect_timeout=2, socket_timeout=2
        ).ping()
        task = celery_app.send_task(TASK_NAME)
    except Exception:
        raise HTTPException(status_code=503, detail="Сервис фоновых задач недоступен")
    return {"task_id": task.id}


@router.get("/reports/overdue/latest")
def latest_overdue_report():
    excel = _latest_file("excel")
    word = _latest_file("word")
    existing = [path for path in (excel, word) if path]
    generated_at = None
    if existing:
        newest = max(os.path.getmtime(path) for path in existing)
        generated_at = datetime.datetime.fromtimestamp(newest, tz=datetime.timezone.utc).isoformat()
    return {
        "generated_at": generated_at,
        "excel_file": os.path.basename(excel) if excel else None,
        "word_file": os.path.basename(word) if word else None,
    }


@router.get("/reports/overdue/files/{kind}")
def download_overdue_file(kind: str):
    if kind not in FILE_KINDS:
        raise HTTPException(status_code=404, detail="Неизвестный тип файла")
    path = _latest_file(kind)
    if not path:
        raise HTTPException(status_code=404, detail="Отчёт ещё не сформирован")
    return FileResponse(path, media_type=FILE_KINDS[kind][1], filename=os.path.basename(path))


@router.get("/reports/overdue/{task_id}")
def overdue_report_status(task_id: str):
    result = AsyncResult(task_id, app=celery_app)
    payload = {"state": result.state}
    if result.state == "SUCCESS" and isinstance(result.result, dict):
        payload["status"] = result.result.get("status")
        payload["count"] = result.result.get("count", 0)
    return payload