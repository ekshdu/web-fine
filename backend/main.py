from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from user import router as user_router
from admin import router as admin_router
app = FastAPI(title="ГИБДД — Мониторинг штрафов (auth only)")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router, prefix="/api", tags=["driver-auth"])
app.include_router(admin_router, prefix="/api", tags=["employee-auth"])
@app.get("/api/health")
def health():
    return {"status": "ok"}
