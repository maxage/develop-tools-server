# 使用说明

## 🚀 快速开始

### 1. 环境准备
确保已安装：
- Docker
- Docker Compose

### 2. 配置环境变量
```bash
# 复制环境变量模板
cp env.example .env

# 编辑配置文件，添加必要的API密钥
vim .env
```

### 3. 启动服务
```bash
# 使用部署脚本（推荐）
./deploy.sh start

# 或直接使用docker-compose
docker-compose up -d
```

### 4. 访问服务
- 服务地址: http://localhost:5083
- 平台列表: http://localhost:5083/platforms
- 新闻API: http://localhost:5083/news?platform=baidu

## 📋 管理命令

```bash
./deploy.sh start    # 启动服务
./deploy.sh stop     # 停止服务  
./deploy.sh restart  # 重启服务
./deploy.sh logs     # 查看日志
./deploy.sh status   # 查看状态
./deploy.sh clean    # 清理资源
```

## ⚠️ 重要提醒

1. **必须配置 `.env` 文件**：项目使用 `.env` 文件加载环境变量
2. **复制模板文件**：`cp env.example .env`
3. **编辑配置**：在 `.env` 文件中添加必要的API密钥
4. **自动加载**：Docker Compose会自动加载 `.env` 文件中的所有环境变量
5. **不要提交敏感信息**：`.env` 文件包含敏感信息，不要提交到Git

## 🔧 环境变量说明

主要配置项：
- `AI_URL`: AI服务地址（如OpenAI API）
- `AI_SK`: AI服务密钥
- `AI_MODEL`: AI模型名称
- `PROXY_SECRET`: 代理服务密钥
- `FRONTEND_URL`: 前端地址
- 各平台API地址（详见env.example）

## 🐳 Docker镜像使用

如果你想使用GitHub Packages发布的镜像：

1. 确保docker-compose.yml中的镜像地址正确
2. 配置好.env文件
3. 运行：`docker-compose up -d`

## 📁 数据存储

数据会持久化到本地目录：
- 短链接数据: `./app_data/short-links/`
- AI摘要数据: `./app_data/summary/`

数据存储在项目根目录的 `app_data` 文件夹中，即使删除容器数据也不会丢失。
