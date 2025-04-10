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

## 🛠️ 安装与使用

### 环境要求
- Node.js >= 16
- npm >= 7

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/yourusername/develop-tools-server.git
cd develop-tools-server
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
创建 `.env` 文件并配置必要的环境变量：
```env
PORT=3000
NODE_ENV=development
```

4. 启动服务
```bash
npm start
```

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
