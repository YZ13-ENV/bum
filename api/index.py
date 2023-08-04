from typing import Any, Dict
from fastapi import FastAPI
from api.shots.index import router as ShotsRouter
from api.user.index import router as UserRouter
from api.firebaseApp import db

app = FastAPI()


app.include_router(ShotsRouter)
app.include_router(UserRouter)