export type EmbedController = {
    seek: (num: number) => void
}

export type IframeAPI = {
    createController: (element: Element, options: {uri: string}, callback) => void
}