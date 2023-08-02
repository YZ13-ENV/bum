from typing import Any, Dict
from fastapi import FastAPI
from api.shots.router import router as ShotsRouter
from api.firebaseApp import db

app = FastAPI()


app.include_router(ShotsRouter)

# @app.get('/api/user')
# async def getUser(userId: str):
#     userRef = db.collection('users').document(userId)
#     user = await userRef.get()
#     if (user.exists):
#         return user.to_dict()
#     else: return None


# @app.get('/api/user/notes')
# async def getUserNotes(userId: str):
#     notesRef = db.collection('users').document(userId).collection('notes')
#     notes = await notesRef.get()
#     notesList = []
#     for note in notes:
#         noteData: (Dict[str, Any] | None) = note.to_dict()
#         notesList.append(noteData)
#     return notesList
