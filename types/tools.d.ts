declare module 'tools' {
    export interface NewsItem {
        id: string | number // unique
        title: string
        url: string
        mobileUrl?: string
        pubDate?: number | string
        extra?: {
            hover?: string
            date?: number | string
            info?: false | string
            diff?: number
            icon?: false | string | {
                url: string
                scale: number
            }
        }
    }
}

