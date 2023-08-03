from typing import List
from pydantic import BaseModel

class ImageBlock(BaseModel):
    type: str
    link: str

class TextBlock(BaseModel):
    type: str
    size: int
    align: str
    isBold: bool
    isItalic: bool

class ShotGridBlock(BaseModel):
    type: str
    ids: list[str]

class CommentBlockNoAnswers(BaseModel):
    authorId: str
    text: str
    createdAt: int


class CommentBlock(BaseModel):
    authorId: str
    text: str
    createdAt: int
    answers: list[CommentBlockNoAnswers]

class ShotDataForUpload(BaseModel):
    title: str
    rootBlock: ImageBlock
    blocks: list[TextBlock or ShotGridBlock or ImageBlock]

class ShotData(BaseModel):
    isDraft: bool
    authorId: str
    title: str
    rootBlock: ImageBlock
    blocks: list[TextBlock or ShotGridBlock or ImageBlock]
    createdAt: int
    likes: list[str]
    views: list[str]
    comments: list[CommentBlock]

    class Config: 
        orm_mode = True