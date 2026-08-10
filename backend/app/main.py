from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.analyze_routes import analyzeRouter
from app.routes.edit_resume_routes import editRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(analyzeRouter, tags=["Analyze"])
app.include_router(editRouter, tags=["Edit"])
