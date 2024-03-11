export type Message = {
    messageId: string
    creatorName: string
    title: string
    comment: string
    url: string
    createdOn: string
}

export type Label = {
    labelId: string
    messageId: string
    content: string
    jumpTime: number
    creatorName: string
    createdOn: string
}