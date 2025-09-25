export interface NewsItem {
  id: string
  title: string
  url: string
  extra?: {
    rank?: number
    num?: string
    hover?: string
    desc?: string
    like?: string
    view?: string
    lights?: string
    replies?: string
    topic?: string
    cover?: string
    date?: number
    info?: string
    [key: string]: any
  }
}

export interface Platform {
  name: string
  displayName?: string
  category?: string
}

export interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}
