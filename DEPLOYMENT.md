# 部署指南

本文档介绍两种部署方式：Docker Compose 和 Docker Run。

## 🐳 方式一：Docker Compose 部署（推荐）

### 1. 准备环境文件

```bash
# 复制环境变量模板
cp env.example .env

# 编辑配置文件
vim .env
```

### 2. 配置环境变量

编辑 `.env` 文件，配置必要的参数：

```bash
# ===========================================
# 应用基础配置
# ===========================================
NODE_ENV=production                    # 运行环境
PORT=3022                             # 服务器端口号
FRONTEND_URL=http://your-domain.com   # 前端访问地址

# ===========================================
# AI功能配置
# ===========================================
AI_URL=https://api.openai.com/v1/chat/completions  # AI服务地址
AI_SK=your_openai_api_key                          # AI服务密钥
AI_MODEL=gpt-3.5-turbo                            # AI模型名称

# ===========================================
# 安全配置
# ===========================================
PROXY_SECRET=your_proxy_secret_key                 # 代理服务密钥

# ===========================================
# 其他API配置
# ===========================================
# 根据需要在env.example中复制其他API配置
```

### 3. 启动服务

```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 4. 验证部署

```bash
# 检查服务状态
curl http://localhost:5083/platforms

# 测试新闻API
curl "http://localhost:5083/news?platform=baidu"
```

## 🐳 方式二：Docker Run 部署

### 1. 准备目录结构

```bash
# 创建数据目录
mkdir -p ./app_data/short-links
mkdir -p ./app_data/summary

# 准备环境文件
cp env.example .env
vim .env  # 编辑配置
```

### 2. 拉取镜像

```bash
# 从GitHub Container Registry拉取
docker pull ghcr.io/maxage/develop-tools-server:latest

# 或从Docker Hub拉取
docker pull jasonvip888/develop-tools-server:latest
```

### 3. 运行容器

```bash
# 基础运行
docker run -d \
  --name develop-tools-server \
  -p 5083:3022 \
  -v $(pwd)/app_data:/app/data \
  -v $(pwd)/.env:/app/.env \
  ghcr.io/maxage/develop-tools-server:latest

# 带环境变量的运行
docker run -d \
  --name develop-tools-server \
  -p 5083:3022 \
  -e NODE_ENV=production \
  -e PORT=3022 \
  -e AI_SK=your_openai_api_key \
  -e PROXY_SECRET=your_proxy_secret_key \
  -v $(pwd)/app_data:/app/data \
  ghcr.io/maxage/develop-tools-server:latest
```

### 4. 管理容器

```bash
# 查看容器状态
docker ps | grep develop-tools-server

# 查看日志
docker logs -f develop-tools-server

# 重启容器
docker restart develop-tools-server

# 停止容器
docker stop develop-tools-server

# 删除容器
docker rm develop-tools-server
```

## 🔧 高级配置

### 自定义端口

```bash
# Docker Compose方式
# 修改docker-compose.yml中的端口映射
ports:
  - "8080:3022"  # 将本地8080端口映射到容器3022端口

# Docker Run方式
docker run -d \
  --name develop-tools-server \
  -p 8080:3022 \  # 自定义端口
  -v $(pwd)/app_data:/app/data \
  -v $(pwd)/.env:/app/.env \
  ghcr.io/maxage/develop-tools-server:latest
```

### 数据持久化

```bash
# 确保数据目录存在且有正确权限
mkdir -p ./app_data/short-links
mkdir -p ./app_data/summary
chmod 755 ./app_data
```

### 环境变量配置

```bash
# 方式1：使用.env文件（推荐）
-v $(pwd)/.env:/app/.env

# 方式2：直接传递环境变量
-e NODE_ENV=production \
-e PORT=3022 \
-e AI_SK=your_api_key \
-e PROXY_SECRET=your_secret
```

## 🚀 生产环境部署

### 使用Nginx反向代理

```nginx
# nginx.conf
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:5083;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 使用Docker Compose + Nginx

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  app:
    image: ghcr.io/maxage/develop-tools-server:latest
    container_name: develop-tools-server
    restart: unless-stopped
    volumes:
      - ./app_data:/app/data
      - ./.env:/app/.env
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    container_name: nginx-proxy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

## 🔍 故障排除

### 常见问题

1. **容器启动失败**
   ```bash
   # 检查日志
   docker logs develop-tools-server
   
   # 检查环境变量
   docker exec develop-tools-server env
   ```

2. **端口冲突**
   ```bash
   # 检查端口占用
   lsof -i :5083
   
   # 使用其他端口
   docker run -p 8080:3022 ...
   ```

3. **数据目录权限问题**
   ```bash
   # 修复权限
   chmod -R 755 ./app_data
   chown -R 1000:1000 ./app_data
   ```

4. **环境变量未生效**
   ```bash
   # 检查.env文件格式
   cat .env | grep -v "^#" | grep -v "^$"
   
   # 重启容器
   docker restart develop-tools-server
   ```

### 健康检查

```bash
# 检查服务状态
curl -f http://localhost:5083/platforms || echo "服务异常"

# 检查容器健康状态
docker inspect develop-tools-server | grep -A 10 "Health"
```

## 📊 监控和维护

### 查看资源使用

```bash
# 查看容器资源使用
docker stats develop-tools-server

# 查看容器详细信息
docker inspect develop-tools-server
```

### 备份数据

```bash
# 备份数据目录
tar -czf backup_$(date +%Y%m%d).tar.gz app_data/

# 恢复数据
tar -xzf backup_20240101.tar.gz
```

### 更新服务

```bash
# 拉取最新镜像
docker pull ghcr.io/maxage/develop-tools-server:latest

# 停止旧容器
docker stop develop-tools-server
docker rm develop-tools-server

# 启动新容器
docker run -d \
  --name develop-tools-server \
  -p 5083:3022 \
  -v $(pwd)/app_data:/app/data \
  -v $(pwd)/.env:/app/.env \
  ghcr.io/maxage/develop-tools-server:latest
```

## 🎯 快速开始

### 一键部署脚本

```bash
#!/bin/bash
# quick-deploy.sh

echo "🚀 开始部署 develop-tools-server..."

# 创建必要目录
mkdir -p app_data/short-links app_data/summary

# 检查环境文件
if [ ! -f .env ]; then
    echo "📝 复制环境变量模板..."
    cp env.example .env
    echo "⚠️  请编辑 .env 文件配置您的API密钥"
    exit 1
fi

# 拉取镜像
echo "📦 拉取最新镜像..."
docker pull ghcr.io/maxage/develop-tools-server:latest

# 启动服务
echo "🚀 启动服务..."
docker run -d \
  --name develop-tools-server \
  -p 5083:3022 \
  -v $(pwd)/app_data:/app/data \
  -v $(pwd)/.env:/app/.env \
  --restart unless-stopped \
  ghcr.io/maxage/develop-tools-server:latest

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
if curl -f http://localhost:5083/platforms > /dev/null 2>&1; then
    echo "✅ 部署成功！"
    echo "🌐 访问地址: http://localhost:5083"
    echo "📊 平台列表: http://localhost:5083/platforms"
else
    echo "❌ 部署失败，请检查日志: docker logs develop-tools-server"
fi
```

使用方法：
```bash
chmod +x quick-deploy.sh
./quick-deploy.sh
```

---

## 📞 支持

如果遇到问题，请：

1. 查看容器日志：`docker logs develop-tools-server`
2. 检查GitHub Issues：https://github.com/maxage/develop-tools-server/issues
3. 提交新的Issue描述您的问题

---

**部署愉快！🎉**
