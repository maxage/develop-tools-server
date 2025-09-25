#!/bin/bash

# 快速部署脚本
# 支持 Docker Compose 和 Docker Run 两种方式

set -e

echo "🚀 develop-tools-server 快速部署脚本"
echo "=================================="

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查docker-compose是否安装
if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
elif command -v docker &> /dev/null && docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD=""
fi

# 选择部署方式
echo "请选择部署方式："
echo "1) Docker Compose (推荐)"
echo "2) Docker Run"
read -p "请输入选择 (1-2): " choice

case $choice in
    1)
        if [ -z "$COMPOSE_CMD" ]; then
            echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
            exit 1
        fi
        deploy_with_compose
        ;;
    2)
        deploy_with_run
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

# Docker Compose 部署函数
deploy_with_compose() {
    echo "🐳 使用 Docker Compose 部署..."
    
    # 检查必要文件
    if [ ! -f "docker-compose.yml" ]; then
        echo "❌ docker-compose.yml 文件不存在"
        exit 1
    fi
    
    # 创建数据目录
    echo "📁 创建数据目录..."
    mkdir -p app_data/short-links app_data/summary
    
    # 检查环境文件
    if [ ! -f ".env" ]; then
        if [ -f "env.example" ]; then
            echo "📝 复制环境变量模板..."
            cp env.example .env
            echo "⚠️  请编辑 .env 文件配置您的API密钥"
            echo "   编辑完成后重新运行此脚本"
            exit 1
        else
            echo "❌ 环境文件不存在，请创建 .env 文件"
            exit 1
        fi
    fi
    
    # 停止现有服务
    echo "🛑 停止现有服务..."
    $COMPOSE_CMD down 2>/dev/null || true
    
    # 拉取最新镜像
    echo "📦 拉取最新镜像..."
    docker pull ghcr.io/maxage/develop-tools-server:latest
    
    # 启动服务
    echo "🚀 启动服务..."
    $COMPOSE_CMD up -d
    
    # 等待服务启动
    echo "⏳ 等待服务启动..."
    sleep 10
    
    # 检查服务状态
    check_service
}

# Docker Run 部署函数
deploy_with_run() {
    echo "🐳 使用 Docker Run 部署..."
    
    # 创建数据目录
    echo "📁 创建数据目录..."
    mkdir -p app_data/short-links app_data/summary
    
    # 检查环境文件
    if [ ! -f ".env" ]; then
        if [ -f "env.example" ]; then
            echo "📝 复制环境变量模板..."
            cp env.example .env
            echo "⚠️  请编辑 .env 文件配置您的API密钥"
            echo "   编辑完成后重新运行此脚本"
            exit 1
        else
            echo "❌ 环境文件不存在，请创建 .env 文件"
            exit 1
        fi
    fi
    
    # 停止现有容器
    echo "🛑 停止现有容器..."
    docker stop develop-tools-server 2>/dev/null || true
    docker rm develop-tools-server 2>/dev/null || true
    
    # 拉取最新镜像
    echo "📦 拉取最新镜像..."
    docker pull ghcr.io/maxage/develop-tools-server:latest
    
    # 启动容器
    echo "🚀 启动容器..."
    docker run -d \
        --name develop-tools-server \
        -p 5083:3022 \
        -v "$(pwd)/app_data:/app/data" \
        -v "$(pwd)/.env:/app/.env" \
        --restart unless-stopped \
        ghcr.io/maxage/develop-tools-server:latest
    
    # 等待服务启动
    echo "⏳ 等待服务启动..."
    sleep 10
    
    # 检查服务状态
    check_service
}

# 检查服务状态
check_service() {
    echo "🔍 检查服务状态..."
    
    # 等待服务完全启动
    for i in {1..30}; do
        if curl -f http://localhost:5083/platforms > /dev/null 2>&1; then
            echo "✅ 部署成功！"
            echo ""
            echo "🌐 访问地址:"
            echo "   主页: http://localhost:5083"
            echo "   平台列表: http://localhost:5083/platforms"
            echo "   新闻API: http://localhost:5083/news?platform=baidu"
            echo ""
            echo "📊 管理命令:"
            if [ "$choice" = "1" ]; then
                echo "   查看日志: $COMPOSE_CMD logs -f"
                echo "   停止服务: $COMPOSE_CMD down"
                echo "   重启服务: $COMPOSE_CMD restart"
            else
                echo "   查看日志: docker logs -f develop-tools-server"
                echo "   停止服务: docker stop develop-tools-server"
                echo "   重启服务: docker restart develop-tools-server"
            fi
            echo ""
            echo "🎉 部署完成！"
            exit 0
        fi
        echo "   等待服务启动... ($i/30)"
        sleep 2
    done
    
    echo "❌ 服务启动失败"
    echo "📋 请检查日志:"
    if [ "$choice" = "1" ]; then
        echo "   $COMPOSE_CMD logs"
    else
        echo "   docker logs develop-tools-server"
    fi
    exit 1
}

# 显示帮助信息
show_help() {
    echo "使用方法:"
    echo "  $0                    # 交互式部署"
    echo "  $0 --compose          # 强制使用 Docker Compose"
    echo "  $0 --run              # 强制使用 Docker Run"
    echo "  $0 --help             # 显示帮助"
}

# 处理命令行参数
case "${1:-}" in
    --compose)
        deploy_with_compose
        ;;
    --run)
        deploy_with_run
        ;;
    --help)
        show_help
        exit 0
        ;;
    "")
        # 交互式模式，已在上面处理
        ;;
    *)
        echo "❌ 未知参数: $1"
        show_help
        exit 1
        ;;
esac
