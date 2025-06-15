
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="EduGuideAI Backend",
    description="Backend for grade-based analysis and personality assessment"
)

# Allow requests from Vite/React dev server and common localhost ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import and include routers
from routes.grades import router as grades_router
from routes.personality import router as personality_router
from routes.health import router as health_router

app.include_router(grades_router)
app.include_router(personality_router)
app.include_router(health_router)
