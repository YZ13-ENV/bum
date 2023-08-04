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
    text: str

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
    blocks: list[TextBlock | ShotGridBlock | ImageBlock]

class DraftShotData(BaseModel):
    isDraft: bool
    authorId: str
    title: str
    rootBlock: ImageBlock
    blocks: list[TextBlock | ShotGridBlock | ImageBlock]
    createdAt: int

class ShotData(BaseModel):
    isDraft: bool
    authorId: str
    title: str
    rootBlock: ImageBlock
    blocks: list[TextBlock | ShotGridBlock | ImageBlock]
    createdAt: int
    likes: list[str]
    views: list[str]
    comments: list[CommentBlock]

    class Config: 
        orm_mode = True