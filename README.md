# Develop Tools Server

一个现代化的开发工具服务器，提供各种实用的 API 接口。

## 🚀 功能特点

- 📰 新闻聚合：支持多个平台的新闻聚合
- 🔍 热搜榜单：支持多个平台的热搜榜单
- ⚡ 快速响应：使用 TypeScript 和 Express 构建，性能优异
- 🔒 类型安全：完整的 TypeScript 类型支持
- 📦 模块化：采用模块化设计，易于扩展

## 📋 支持的平台

### 新闻聚合
- 36氪
- 百度热搜
- 抖音热搜
- PCbeta Windows 新闻
- PCbeta Windows 11 新闻

## 🚀 快速开始

### 方式一：一键部署（推荐）

```bash
# 克隆项目
git clone https://github.com/maxage/develop-tools-server.git
cd develop-tools-server

# 运行一键部署脚本
./quick-deploy.sh
```

### 方式二：Docker Compose 部署

```bash
# 1. 准备环境文件
cp env.example .env
vim .env  # 编辑配置文件

# 2. 启动服务
docker-compose up -d

# 3. 查看日志
docker-compose logs -f
```

### 方式三：Docker Run 部署

```bash
# 1. 准备环境文件
cp env.example .env
vim .env  # 编辑配置文件

# 2. 创建数据目录
mkdir -p app_data/short-links app_data/summary

# 3. 运行容器
docker run -d \
  --name develop-tools-server \
  -p 5083:3022 \
  -v $(pwd)/app_data:/app/data \
  -v $(pwd)/.env:/app/.env \
  --restart unless-stopped \
  ghcr.io/maxage/develop-tools-server:latest
```

### 方式四：本地开发

```bash
# 安装依赖
npm install

# 复制环境文件
cp env.example .env

# 启动开发服务器
npm run dev
```

## 📖 详细部署文档

查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取完整的部署指南。

### API 使用示例

#### 获取新闻列表
```bash
GET /news?platform=_36kr
```

响应示例：
```json
[
  {
    "title": "新闻标题",
    "url": "https://example.com/news/1",
    "id": "1",
    "pubDate": "2024-04-10 12:30:45"
  }
]
```

## 🛠️ 开发指南

### 添加新的 API

1. 在 `shared` 目录下创建新的 API 文件
2. 在 `shared/init.ts` 中注册新的 API
3. 在 `constant.ts` 中添加必要的配置

### 项目结构
```
develop-tools-server/
├── bin/                # 启动脚本
├── routes/            # 路由定义
├── shared/            # API 实现
├── types/             # 类型定义
├── utils/             # 工具函数
├── app.ts             # 应用入口
└── package.json       # 项目配置
```

## 📝 贡献指南

欢迎提交 Pull Request 或创建 Issue！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Express](https://expressjs.com/) - Web 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [Day.js](https://day.js.org/) - 日期处理
- [Axios](https://axios-http.com/) - HTTP 客户端 
- [大佬 ourongxing](https://github.com/ourongxing/) - 开源逻辑
