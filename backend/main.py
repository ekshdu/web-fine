from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.driver_router import router as driver_router
from routers.employee_router import router as employee_router
app = FastAPI(title="ГИБДД — Мониторинг штрафов")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(driver_router, prefix="/api", tags=["driver-auth"])
app.include_router(employee_router, prefix="/api", tags=["employee-auth"])
@app.get("/api/health")
def health():
    return {"status": "ok"}
