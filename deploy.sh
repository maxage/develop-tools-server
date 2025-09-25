#!/bin/bash

# 开发工具服务器 Docker 部署脚本
# 使用方法: ./deploy.sh [start|stop|restart|logs|status|clean]

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查Docker是否安装
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker 未安装，请先安装 Docker"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose 未安装，请先安装 Docker Compose"
        exit 1
    fi
}

# 检查环境变量文件
check_env() {
    if [ ! -f .env ]; then
        print_warning ".env 文件不存在，正在创建..."
        if [ -f env.example ]; then
            cp env.example .env
            print_message "已从 env.example 创建 .env 文件"
            print_warning "请编辑 .env 文件配置必要的API密钥后再启动服务"
            print_message "编辑命令: vim .env"
            exit 1
        else
            print_error "env.example 文件不存在，无法创建 .env 文件"
            exit 1
        fi
    else
        print_message ".env 文件已存在，开始启动服务"
    fi
}

# 启动服务
start_service() {
    print_message "启动服务..."
    check_docker
    check_env
    
    docker-compose up -d
    
    print_message "服务启动完成"
    print_message "访问地址: http://localhost:5083"
    print_message "查看日志: ./deploy.sh logs"
}

# 停止服务
stop_service() {
    print_message "停止服务..."
    docker-compose down
    print_message "服务已停止"
}

# 重启服务
restart_service() {
    print_message "重启服务..."
    stop_service
    sleep 2
    start_service
}

# 查看日志
show_logs() {
    docker-compose logs -f
}

# 查看状态
show_status() {
    print_message "服务状态:"
    docker-compose ps
}

# 清理资源
clean_resources() {
    print_warning "这将删除所有容器和本地数据，确定要继续吗？(y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_message "清理资源..."
        docker-compose down
        # 删除本地数据目录
        if [ -d "./app_data" ]; then
            rm -rf ./app_data
            print_message "已删除本地数据目录"
        fi
        docker system prune -f
        print_message "清理完成"
    else
        print_message "取消清理操作"
    fi
}

# 显示帮助
show_help() {
    echo "使用方法: $0 [命令]"
    echo ""
    echo "可用命令:"
    echo "  start    - 启动服务"
    echo "  stop     - 停止服务"
    echo "  restart  - 重启服务"
    echo "  logs     - 查看日志"
    echo "  status   - 查看状态"
    echo "  clean    - 清理资源"
    echo "  help     - 显示帮助"
}

# 主函数
case "${1:-help}" in
    start)
        start_service
        ;;
    stop)
        stop_service
        ;;
    restart)
        restart_service
        ;;
    logs)
        show_logs
        ;;
    status)
        show_status
        ;;
    clean)
        clean_resources
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "未知命令: $1"
        show_help
        exit 1
        ;;
esac