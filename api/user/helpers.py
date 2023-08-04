from api.firebaseApp import db, auth
from api.user.userSchema import UserShortData

async def getShortData(userId: str):
    userRef = db.collection('users').document(userId)
    userSnap = await userRef.get()
    userDict = userSnap.to_dict()
    if (not userDict or not 'short' in userDict):
        return None
    return userDict['short']

def isShortsDataNotEq(short1: UserShortData, short2: UserShortData):
    return short1 == short2

async def getShortDataFromDB(userId: str):
    user = auth.get_user(userId)
    return user

async def setShortDataFromDB(userId: str):
    record = await getShortDataFromDB(userId=userId)
    if record:
        short = {
            'short': {
                'email': record._data['email'],
                'displayName': record._data['displayName'],
                'photoUrl': record._data['photoUrl'],
            }
        }
        userRef = db.collection('users').document(userId)
        await userRef.update(short)
        return True
    return False



async def isLocalAndDBShortEq(userId: str):
    shortData = await getShortData(userId)
    record = await getShortDataFromDB(userId=userId)
    if (record and shortData):
        shortFromRecord = {
            'email': record._data['email'],
            'displayName': record._data['displayName'],
            'photoUrl': record._data['photoUrl'],
        }
        isEq = isShortsDataNotEq(shortFromRecord, shortData)
        return isEq
    else:
        return False
    
async def checkShortData(userId: str):
    isEq = await isLocalAndDBShortEq(userId)
    if not isEq:
        await setShortDataFromDB(userId)