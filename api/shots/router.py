import datetime
from api.firebaseApp import db
from typing import Any, Dict
from fastapi import APIRouter, Body
from api.shots.helpers import getUsersIdList, getUserShots
from api.shots.shotSchema import ShotData, ShotDataForUpload


router = APIRouter(
    prefix='/api/shots',
    tags=['Работы'],
)

@router.get('/shot')
async def getShotById(userId: str, shotId: str):
    shotRef = db.collection('users').document(userId).collection('shots').document(shotId)
    shotSnap = await shotRef.get()
    return shotSnap.to_dict()

@router.patch('/shot')
async def updateShotById(userId: str, shotId: str, shot: ShotData):
    shotRef = db.collection('users').document(userId).collection('shots').document(shotId)
    updatedSnap = shotRef.update(shot)
    return updatedSnap

@router.get('/shotExisting')
async def isShotExist(userId: str, shotId: str):
    shotRef = db.collection('users').document(userId).collection('shots').document(shotId)
    shotSnap = await shotRef.get()

    return shotSnap.exists


@router.post('/shot')
async def uploadShotById(userId: str, shotId: str, shot: ShotDataForUpload, asDraft: bool=False):
    print(shot)
    shotRef = db.collection('users').document(userId).collection('shots').document(shotId)
    shotSnap = await shotRef.get() 
    dictShot = shot.dict()
    filledShot = {
        'isDraft': asDraft,
        'authorId': userId,
        'title': dictShot['title'],
        'rootBlock': dictShot['rootBlock'],
        'blocks': dictShot['blocks'],
        'createdAt': datetime.datetime.today().timestamp(),
        'likes': [],
        'views': [],
        'comments': []
    }
    # print(shotSnap.exists)
    if (not shotSnap.exists):
        await shotRef.set(filledShot)
        return True
    else:
        await shotRef.update(filledShot)
        return True


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