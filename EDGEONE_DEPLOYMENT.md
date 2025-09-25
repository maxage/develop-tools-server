# EdgeOne Page 自动化部署配置

## 📋 部署说明

EdgeOne Page 将自动从 GitHub 仓库拉取代码并部署，无需手动上传。

## 🚀 部署步骤

### 1. 在 EdgeOne Pages 中配置项目

1. **创建新项目**
   - 项目名称：`develop-tools-api`
   - 项目类型：选择 `静态网站`

2. **连接 GitHub 仓库**
   - 仓库地址：`https://github.com/你的用户名/develop-tools-server`
   - 分支：`master`
   - 根目录：`/` （项目根目录）

3. **构建配置**（会自动读取 `edgeone.json`）
   - 构建命令：`cd edge-page && npm ci && npm run build`
   - 输出目录：`./edge-page/dist`
   - Node.js 版本：`20.18.0`
   - 安装命令：`cd edge-page && npm ci`

### 2. 环境变量配置

在 EdgeOne Pages 项目设置中添加环境变量：

```bash
# 应用基础配置
NODE_ENV=production
PORT=3022
FRONTEND_URL=https://你的域名.com

# AI功能配置
AI_URL=https://api.ai.151551.xyz/proxy/gemini/v1beta/openai/chat/completions
AI_SK=你的AI密钥
AI_MODEL=gemini-2.5-flash

# 安全配置
PROXY_SECRET=你的代理密钥

# 其他API配置...
# (复制 .env 文件中的所有配置)
```

### 3. 域名配置

- **主域名**：`https://你的域名.com`
- **API 路径**：`https://你的域名.com/api/*`
- **静态文件**：`https://你的域名.com/*`

## 🔄 自动化流程

1. **代码推送** → GitHub 仓库更新
2. **EdgeOne Pages 检测** → 自动触发构建
3. **构建过程**：
   - 拉取最新代码
   - 读取 `edgeone.json` 配置
   - 安装依赖：`cd edge-page && npm ci`
   - 构建项目：`cd edge-page && npm run build`
   - 部署到 CDN
4. **部署完成** → 自动更新网站

## 📋 edgeone.json 配置说明

项目根目录的 `edgeone.json` 文件包含以下配置：

- **buildCommand**: 构建命令
- **installCommand**: 安装命令  
- **outputDirectory**: 输出目录
- **nodeVersion**: Node.js 版本
- **redirects**: URL 重定向规则
- **rewrites**: URL 重写规则
- **headers**: HTTP 响应头配置
- **caches**: 边缘缓存配置

## 📁 项目结构

```
develop-tools-server/
├── edge-page/           # EdgeOne Page 只构建这个文件夹
│   ├── src/
│   ├── dist/           # 构建输出目录
│   ├── index.html      # 入口文件
│   └── package.json
├── routes/             # 后端 API 路由
├── shared/             # 后端共享模块
└── ...                 # 其他后端文件
```

## 🎯 部署后的访问方式

- **API 文档页面**：`https://你的域名.com/`
- **API 接口**：`https://你的域名.com/api/platforms`
- **图片代理**：`https://你的域名.com/api/proxy/image?url=...`

## ⚠️ 注意事项

1. **构建目录**：确保 EdgeOne Page 配置为只构建 `edge-page` 文件夹
2. **环境变量**：所有后端 API 配置都需要在 EdgeOne Page 中设置
3. **API 调用**：前端会自动使用当前域名调用后端 API
4. **自动更新**：每次推送代码到 GitHub 都会自动重新部署

## 🔧 故障排除

如果部署失败，检查：
1. 构建目录是否正确设置为 `edge-page`
2. Node.js 版本是否为 20
3. 环境变量是否完整配置
4. GitHub 仓库权限是否正确
