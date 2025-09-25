# 使用官方 Node.js 18 镜像
FROM node:18-alpine

# 安装系统依赖（Sharp需要）
RUN apk add --no-cache vips-dev python3 make g++

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production && npm cache clean --force

# 复制源代码
COPY . .

# 创建数据目录
RUN mkdir -p /app/data/short-links /app/data/summary

# 设置权限
RUN chown -R node:node /app
USER node

# 暴露端口
EXPOSE 3022

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3022/platforms', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# 启动应用
CMD ["npm", "start"]