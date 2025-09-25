import { useState, useEffect } from 'react'
import { NewsList } from './components/NewsList'
import { PlatformSelector } from './components/PlatformSelector'
import { Header } from './components/Header'
import { Loading } from './components/Loading'
import { ErrorMessage } from './components/ErrorMessage'
import { getNews, getPlatforms } from './utils/api'
import type { NewsItem, Platform } from './types'
import './App.css'

function App() {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<string>('baidu')
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 获取平台列表
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const data = await getPlatforms()
        setPlatforms(data)
      } catch (err) {
        setError('获取平台列表失败')
      }
    }
    fetchPlatforms()
  }, [])

  // 获取新闻数据
  useEffect(() => {
    const fetchNews = async () => {
      if (!selectedPlatform) return
      
      setLoading(true)
      setError(null)
      
      try {
        const data = await getNews(selectedPlatform)
        setNews(data)
      } catch (err) {
        setError('获取新闻数据失败')
      } finally {
        setLoading(false)
      }
    }
    
    fetchNews()
  }, [selectedPlatform])

  return (
    <div className="app">
      <Header />
      
      <main className="main">
        <PlatformSelector 
          platforms={platforms}
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
        />
        
        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && <NewsList news={news} platform={selectedPlatform} />}
      </main>
      
      <footer className="footer">
        <p>数据来源：各平台公开API | 仅供学习交流使用</p>
      </footer>
    </div>
  )
}

export default App
