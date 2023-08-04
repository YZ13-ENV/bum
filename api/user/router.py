


from typing import Any, Dict
from fastapi import APIRouter
from api.firebaseApp import db
from api.user.helpers import getShortData, getShortDataFromDB, isLocalAndDBShortEq, isShortDataEmpty, isShortsDataNotEq
from api.user.userSchema import UserShortData


router = APIRouter(
    prefix='/api/user',
    tags=['Пользователь'],
)

@router.patch('/short')
async def updateShortData(userId: str, data: UserShortData):
    userRef = db.collection('users').document(userId)
    short = {
        'short': data.dict()
    }
    userSnap = await userRef.update(short)
    return userSnap.transform_results
    
@router.get('/shortEmpty')
async def updateShortData(userId: str):
    isEmpty = await isShortDataEmpty(userId)
    return isEmpty

@router.get('/record')
async def getUserRecord(userId: str):
    record = await getShortDataFromDB(userId=userId)
    return record

@router.get('/short')
async def updateShortData(userId: str):
    shortData = await getShortData(userId)
    return shortData

@router.get('/shortFromDBEqToLocal')
async def checkShortData(userId: str):
    isEq = await isLocalAndDBShortEq(userId)
    return isEq
