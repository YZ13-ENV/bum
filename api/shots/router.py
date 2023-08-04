import datetime
from api.firebaseApp import db
from typing import Any, Dict
from fastapi import APIRouter, Body
from api.shots.helpers import getUserDrafts, getUserShotsWithDocId, getUsersIdList, getUserShots
from api.shots.shotSchema import DraftShotData, ShotData, ShotDataForUpload


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

@router.get('/draft')
async def getDraft(userId: str, draftId: str):
    draftRef = db.collection('users').document(userId).collection('shots').document(draftId)
    draftSnap = await draftRef.get()
    if (draftSnap.exists):
        return draftSnap.to_dict()
    else:
        return None

@router.post('/draft')
async def uploadDraft(userId: str, draftId: str, draft: DraftShotData):
    draftRef = db.collection('users').document(userId).collection('shots').document(draftId)
    draftSnap = await draftRef.get()
    dictDraft = draft.dict()
    filledDraft = {
        'isDraft': True,
        'authorId': userId,
        'title': dictDraft['title'],
        'rootBlock': dictDraft['rootBlock'],
        'blocks': dictDraft['blocks'],
        'createdAt': datetime.datetime.today().timestamp()
    }
    if (not draftSnap.exists):
        await draftRef.set(filledDraft)
        return True
    else:
        snapDict = draftSnap.to_dict()
        filledDraft['createdAt'] = snapDict['createdAt']
        await draftRef.update(filledDraft)
        return True

@router.post('/shot')
async def uploadShotById(userId: str, shotId: str, shot: ShotDataForUpload, asDraft: bool=False):
    # print(shot)
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
    if (not shotSnap.exists):
        await shotRef.set(filledShot)
        return True
    else:
        snapDict = shotSnap.to_dict()
        filledShot['createdAt'] = snapDict['createdAt']
        await shotRef.update(filledShot)
        return True


@router.get('/shotsList')
async def getShotsBy(userId: str):
    shots = await getUserShots(userId)
    return shots

@router.get('/draftsList')
async def getDrafts(userId: str):
    shots = await getUserDrafts(userId)
    return shots


@router.get('/shotsDocList')
async def getShotsBy(userId: str, noDrafts: bool=False):
    shots = await getUserShotsWithDocId(userId, noDrafts)
    return shots

@router.get('/allShots')
async def getAllUsersShots():
    usersIds = await getUsersIdList()
    shotsList = []

    for user in usersIds:
        shots = await getUserShotsWithDocId(user, True)
        for shot in shots:
            shotsList.append(shot)
            
    
    return shotsList