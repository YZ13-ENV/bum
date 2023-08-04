import datetime
from api.firebaseApp import db
from typing import Any, Dict
from fastapi import APIRouter, Body
from api.shots.helpers import getUserDrafts, getUserShotWithDocId, getUserShotsWithDocId, getUsersIdList, getUserShots
from api.shots.shotSchema import DraftShotData, ShotData, ShotDataForUpload
from api.user.helpers import checkShortData


router = APIRouter(
    prefix='/api/shots',
    tags=['Работы'],
)

@router.get('/shot')
async def getShotById(userId: str, shotId: str):
    await checkShortData(userId)
    shot = await getUserShotWithDocId(userId=userId, shotId=shotId)
    return shot

@router.patch('/shot')
async def updateShotById(userId: str, shotId: str, shot: ShotData):
    await checkShortData(userId)
    shotRef = db.collection('users').document(userId).collection('shots').document(shotId)
    updatedSnap = shotRef.update(shot)
    return updatedSnap

@router.get('/draft')
async def getDraft(userId: str, draftId: str):
    await checkShortData(userId)
    draftRef = db.collection('users').document(userId).collection('shots').document(draftId)
    draftSnap = await draftRef.get()
    if (draftSnap.exists):
        return draftSnap.to_dict()
    else:
        return None

@router.post('/publish')
async def publishDraft(userId: str, draftId: str, draftToPublish: ShotData):
    await checkShortData(userId)
    draftRef = db.collection('users').document(userId).collection('shots').document(draftId)
    await draftRef.set(draftToPublish.dict())
    return True


@router.post('/draft')
async def uploadDraft(userId: str, draftId: str, draft: DraftShotData):
    await checkShortData(userId)
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

@router.get('/list')
async def getShotsBy(userId: str, drafts: bool):
    await checkShortData(userId)
    if (drafts):
        drafts = await getUserDrafts(userId)
        return drafts
    else :
        shots = await getUserShots(userId)
        return shots


@router.get('/shotsDocList')
async def getShotsBy(userId: str, noDrafts: bool=False):
    await checkShortData(userId)
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