from typing import Any, Dict
from api.firebaseApp import db




async def getUsersIdList():
    usersRef = db.collection('users')
    users = await usersRef.get()
    idsList = []
    for user in users:
        userId: str = user.id
        idsList.append(userId)
    return idsList

async def getUserShots(userId: str):
    shotsRef = db.collection('users').document(userId).collection('shots')
    shots = await shotsRef.get()
    shotsList = []
    for shot in shots:
        shotData: (Dict[str, Any] | None) = shot.to_dict()
        shotsList.append(shotData)
    return shotsList