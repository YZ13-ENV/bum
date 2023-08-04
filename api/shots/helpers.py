from api.firebaseApp import db

async def getUsersIdList():
    usersRef = db.collection('users')
    users = await usersRef.get()
    idsList = []
    for user in users:
        userId: str = user.id
        idsList.append(userId)
    return idsList

async def getUserShotWithDocId(userId: str, shotId: str):
    shotRef = db.collection('users').document(userId).collection('shots').document(shotId)
    shotSnap = await shotRef.get()
    if (shotSnap.exists):
        shotData = shotSnap.to_dict()
        shotData['doc_id'] = shotSnap.id
        return shotData
    return None

async def getUserShotsWithDocId(userId: str, noDraft: bool=False):
    shotsRef = db.collection('users').document(userId).collection('shots')
    shots = await shotsRef.get()
    shotsList = []
    for shot in shots:
            shotData = shot.to_dict()
            shotData['doc_id'] = shot.id
            if (noDraft):
                if shotData['isDraft'] == False:
                    shotsList.append(shotData)
            else:
                shotData = shot.to_dict()
                shotData['doc_id'] = shot.id
                shotsList.append(shotData)

    return shotsList

async def getUserDrafts(userId: str):
    shotsRef = db.collection('users').document(userId).collection('shots')
    shots = await shotsRef.get()
    shotsList = []
    for shot in shots:
            shotData = shot.to_dict()
            shotData['doc_id'] = shot.id
            if shotData['isDraft'] == True:
                shotsList.append(shotData)

    return shotsList

async def getUserShots(userId: str):
    shotsRef = db.collection('users').document(userId).collection('shots')
    shots = await shotsRef.get()
    shotsList = []
    for shot in shots:
        shotData = shot.to_dict()
        shotsList.append(shotData)
    return shotsList