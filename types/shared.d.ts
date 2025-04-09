declare module 'shared' {
    export interface Res {
        cards: {
            content: {
                isTop?: boolean
                word: string
                rawUrl: string
                desc?: string
            }[]
        }[]
    }
}

