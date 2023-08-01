from api.firebaseApp import db
from typing import Any, Dict
from fastapi import APIRouter


router = APIRouter(
    prefix='/shots',
    tags=['Работы'],
)

@router.get('/api/user/shots')
async def getUserShots(userId: str):
    shotsRef = db.collection('users').document(userId).collection('shots')
    shots = await shotsRef.get()
    shotsList = []
    for shot in shots:
        shotData: (Dict[str, Any] | None) = shot.to_dict()
        shotsList.append(shotData)
    return shotsList
