
export type TextBlock = {
    type: 'text'
    text: string
    size: 1 | 2 | 3 // 1: text-base, 2: text-lg, 3: text-xl
    align: 'left' | 'center' | 'right',
    isBold: boolean
    isItalic: boolean
}

export type ImageBlock = {
    type: 'image',
    link: string
}

export type ShotGridBlock = {
    type: 'shotGrid',
    ids: string[]
}

export type CommentBlockNoAnswers = Omit<CommentBlock, 'answers'>

export type CommentBlock = {
    authorId: string
    text: string
    createdAt: number
    answers: CommentBlockNoAnswers[]
}

export type ShotForUpload = {
    title: string
    rootBlock: ImageBlock
    blocks: (TextBlock | ImageBlock | ShotGridBlock)[]
}

export type ShotData = {
    isDraft: boolean
    authorId: string
    title: string
    rootBlock: ImageBlock
    blocks: (TextBlock | ImageBlock | ShotGridBlock)[]
    createdAt: number
    likes: string[]
    views: string[]
    comments: CommentBlock[]
}

export type DocShotData = { doc_id: string } & ShotData