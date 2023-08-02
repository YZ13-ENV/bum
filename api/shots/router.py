from api.firebaseApp import db
from typing import Any, Dict
from fastapi import APIRouter
from api.shots.helpers import getUsersIdList, getUserShots


router = APIRouter(
    prefix='/api/shots',
    tags=['Работы'],
)

@router.get('/shotsList')
async def getShotsBy(userId: str):
    shotsRef = db.collection('users').document(userId).collection('shots')
    shots = await shotsRef.get()
    shotsList = []
    for shot in shots:
        shotData: (Dict[str, Any] | None) = shot.to_dict()
        shotsList.append(shotData)
    return shotsList

@router.get('/allShots')
async def getAllUsersShots():
    usersIds = getUsersIdList()
    shotsList = []
    for user in usersIds:
        shots = getUserShots(user)
        shotsList.append(shots)
    
    return shotsList