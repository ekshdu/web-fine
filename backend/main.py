import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from routers.driver_router import router as driver_router
from routers.employee_router import router as employee_router
from routers.fine_router import router as fine_router
from routers.reference_router import router as reference_router
from routers.car_router import router as car_router
from routers.report_router import router as report_router

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
app.include_router(fine_router, prefix="/api", tags=["fines"])
app.include_router(reference_router, prefix="/api", tags=["references"])
app.include_router(car_router, prefix="/api", tags=["cars"])
app.include_router(report_router, prefix="/api", tags=["reports"])


@app.get("/api/health")
def health():
    return {"status": "ok"}