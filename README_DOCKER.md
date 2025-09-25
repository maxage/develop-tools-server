# Docker 部署指南

## 🚀 快速开始

### 1. 配置环境变量
```bash
# 拷贝环境变量模板文件
cp env.example .env

# 编辑 .env 文件，配置必要的API密钥
vim .env
```

**重要说明：**
- 项目使用 `.env` 文件来加载环境变量
- 必须将 `env.example` 复制为 `.env` 才能正常运行
- 在 `.env` 文件中配置所有必要的API密钥和参数

### 2. 启动服务
```bash
# 使用脚本启动
./deploy.sh start

# 或直接使用docker-compose
docker-compose up -d
```

### 3. 访问服务
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

## 🐳 使用发布的镜像

如果你想使用GitHub Packages发布的镜像：

1. 确保docker-compose.yml中的镜像地址正确
2. 直接运行：`docker-compose up -d`

## 📁 数据持久化

数据会持久化到本地目录：
- 短链接数据: `./app_data/short-links/`
- AI摘要数据: `./app_data/summary/`

数据存储在项目根目录的 `app_data` 文件夹中，即使删除容器数据也不会丢失。

## 🔧 环境变量配置

### 环境变量文件
项目使用 `.env` 文件来管理环境变量，Docker Compose会自动加载该文件中的所有环境变量。

**配置步骤：**

1. **复制模板文件**：
   ```bash
   cp env.example .env
   ```

2. **编辑配置文件**：
   ```bash
   vim .env
   ```

**优势：**
- ✅ 所有环境变量统一在 `.env` 文件中管理
- ✅ Docker Compose自动加载，无需逐个配置
- ✅ 配置更简洁，维护更方便

### 主要配置项
- `AI_URL`: AI服务地址
- `AI_SK`: AI服务密钥  
- `AI_MODEL`: AI模型名称
- `PROXY_SECRET`: 代理密钥
- `FRONTEND_URL`: 前端地址
- 各平台API地址（详见env.example文件）

### 注意事项
- `.env` 文件包含敏感信息，不要提交到Git仓库
- 确保所有必要的环境变量都已正确配置
- 如果某个API不需要，可以留空或注释掉

## 🚀 发布新版本

1. 创建标签：`git tag v1.0.0`
2. 推送标签：`git push origin v1.0.0`
3. GitHub Actions会自动构建并发布镜像到Releases
