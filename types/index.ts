
export type TextBlock = {
    type: 'text'
    text: string
    size: 0 | 1 | 2 | 3
    align: 'left' | 'center' | 'right',
    isBold: boolean
    isItalic: boolean
}

export type ImageBlock = {
    type: 'image',
    link: string
}

export type VideoBlock = {
    type: 'video',
    link: string
}

export type ShotGridBlock = {
    type: 'shotGrid',
    ids: string[]
}

export type CommentBlockNoAnswers = Omit<CommentBlock, 'answers'>

export type NewCommentBlock = {
    authorId: string
    text: string
    createdAt: number
    answers: CommentBlockNoAnswers[]
}

export type CommentBlock = {
    id: string
    authorId: string
    text: string
    createdAt: number
    answers: CommentBlockNoAnswers[]
}

export type Thumbnail = {
    width: string
    height: string
    link: string
}

export type ShotForUpload = {
    title: string
    rootBlock: ImageBlock | VideoBlock
    blocks: (TextBlock | ImageBlock | ShotGridBlock)[]
    thumbnail: Thumbnail | null
}

export type DraftShotData = {
    isDraft: boolean
    authorId: string
    title: string
    rootBlock: ImageBlock | VideoBlock
    blocks: (TextBlock | ImageBlock | ShotGridBlock)[]
    createdAt: number
    thumbnail: Thumbnail | null
}

export type ShotData = {
    isDraft: boolean
    authorId: string
    title: string
    rootBlock: ImageBlock | VideoBlock
    blocks: (TextBlock | ImageBlock | ShotGridBlock)[]
    createdAt: number
    likes: string[]
    views: string[]
    comments: CommentBlock[]
    needFeedback: boolean
    tags: string[]
    thumbnail: Thumbnail | null
}

export type DocShotData = { doc_id: string } & ShotData
export type DocDraftShotData = { doc_id: string } & DraftShotData

export type ShortUserData = {
    photoUrl: string
    displayName: string
    email: string
    isSubscriber: boolean
}