import React from 'react'
import type { NewsItem } from '../types'

interface NewsListProps {
  news: NewsItem[]
  platform: string
}

export const NewsList: React.FC<NewsListProps> = ({ news }) => {
  if (news.length === 0) {
    return (
      <div className="news-container">
        <div className="loading">
          暂无数据
        </div>
      </div>
    )
  }

  return (
    <div className="news-container">
      {news.map((item, index) => (
        <div key={item.id || index} className="news-item">
          <div className="news-title">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </div>
          <div className="news-extra">
            {item.extra?.rank !== undefined && (
              <span className="news-rank">#{item.extra.rank + 1}</span>
            )}
            {item.extra?.num && (
              <span className="news-num">{item.extra.num}</span>
            )}
            {item.extra?.hover && (
              <span title={item.extra.hover}>{item.extra.hover}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
