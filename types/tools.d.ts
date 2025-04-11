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
            [key: string]: any // 其他属性,用于扩展
        }
    }
    export interface RSSInfo {
        title: string
        description: string
        link: string
        image: string
        updatedTime: string
        items: RSSItem[]
    }
    export interface RSSItem {
        title: string
        description: string
        link: string
        created?: string
    }

}

