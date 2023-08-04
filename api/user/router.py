from fastapi import APIRouter
from api.user.helpers import getShortData


router = APIRouter(
    prefix='/api/user',
    tags=['Пользователь'],
)

@router.get('/short')
async def updateShortData(userId: str):
    shortData = await getShortData(userId)
    return shortData
