import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from routers.driver_router import router as driver_router
from routers.employee_router import router as employee_router

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(name)s] %(message)s")

app = FastAPI(title="ГИБДД — Мониторинг штрафов")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.cors_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(driver_router, prefix="/api", tags=["driver-auth"])
app.include_router(employee_router, prefix="/api", tags=["employee-auth"])


@app.get("/api/health")
def health():
    return {"status": "ok"}