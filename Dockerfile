# 多阶段构建 - 构建阶段
FROM node:20-alpine AS builder

# 安装构建依赖
RUN apk add --no-cache vips-dev python3 make g++

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装所有依赖（包括devDependencies）
RUN npm ci && npm cache clean --force

# 复制源代码
COPY . .

# 生产阶段
FROM node:20-alpine AS production

# 只安装运行时需要的依赖
RUN apk add --no-cache vips

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY package*.json ./

# 只安装生产依赖
RUN npm ci --only=production && npm cache clean --force

# 从构建阶段复制node_modules中的sharp等编译好的包
COPY --from=builder /app/node_modules/sharp ./node_modules/sharp

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
CMD ["npx", "tsx", "./bin/www.ts"]