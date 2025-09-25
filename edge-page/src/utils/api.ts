import axios from 'axios'

// API基础URL - EdgeOne Page 部署后的域名
const API_BASE_URL = window.location.origin // 自动使用当前域名

// 获取平台列表
export const getPlatforms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/platforms`)
    return response.data.data || []
  } catch (error) {
    console.error('获取平台列表失败:', error)
    throw error
  }
}

// 获取新闻数据
export const getNews = async (platform: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news`, {
      params: { platform }
    })
    return response.data.data || []
  } catch (error) {
    console.error('获取新闻数据失败:', error)
    throw error
  }
}

// 获取图片代理URL
export const getProxyImageUrl = (url: string, options: {
  width?: number
  height?: number
  quality?: number
  format?: string
} = {}) => {
  const params = new URLSearchParams()
  params.set('url', url)
  
  if (options.width) params.set('w', options.width.toString())
  if (options.height) params.set('h', options.height.toString())
  if (options.quality) params.set('q', options.quality.toString())
  if (options.format) params.set('fmt', options.format)
  
  return `${API_BASE_URL}/proxy/image?${params.toString()}`
}
