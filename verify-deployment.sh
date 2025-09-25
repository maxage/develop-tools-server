#!/bin/bash

# 部署验证脚本
# 用于验证Docker部署是否正常工作

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Docker 部署验证脚本          ${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 检查端口是否被占用
check_port() {
    print_info "检查端口5083是否被占用..."
    
    if lsof -i :5083 > /dev/null 2>&1; then
        print_warning "端口5083已被占用，请先停止其他服务"
        lsof -i :5083
        return 1
    else
        print_success "端口5083可用"
        return 0
    fi
}

# 检查Docker是否运行
check_docker() {
    print_info "检查Docker服务状态..."
    
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker服务未运行，请启动Docker"
        return 1
    else
        print_success "Docker服务正常运行"
        return 0
    fi
}

# 检查环境变量文件
check_env() {
    print_info "检查环境变量配置..."
    
    if [ ! -f ".env" ]; then
        print_warning ".env文件不存在，正在创建..."
        if [ -f "env.example" ]; then
            cp env.example .env
            print_success "已从env.example创建.env文件"
        else
            print_error "env.example文件不存在"
            return 1
        fi
    else
        print_success ".env文件存在"
    fi
    
    # 检查关键环境变量
    if grep -q "NODE_ENV=production" .env; then
        print_success "NODE_ENV配置正确"
    else
        print_warning "NODE_ENV未设置为production"
    fi
    
    if grep -q "PORT=3022" .env; then
        print_success "PORT配置正确"
    else
        print_warning "PORT未设置为3022"
    fi
    
    return 0
}

# 测试Docker Compose配置
test_compose() {
    print_info "测试Docker Compose配置..."
    
    if docker-compose config > /dev/null 2>&1; then
        print_success "Docker Compose配置正确"
        return 0
    else
        print_error "Docker Compose配置有误"
        docker-compose config
        return 1
    fi
}

# 启动服务并测试
test_deployment() {
    print_info "启动服务进行测试..."
    
    # 启动服务
    if docker-compose up -d; then
        print_success "服务启动成功"
    else
        print_error "服务启动失败"
        return 1
    fi
    
    # 等待服务启动
    print_info "等待服务启动（40秒）..."
    sleep 40
    
    # 检查容器状态
    if docker-compose ps | grep -q "Up"; then
        print_success "容器运行正常"
    else
        print_error "容器未正常运行"
        docker-compose ps
        return 1
    fi
    
    # 测试健康检查
    print_info "测试健康检查..."
    if docker-compose exec develop-tools-server node -e "require('http').get('http://localhost:3022/platforms', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" 2>/dev/null; then
        print_success "健康检查通过"
    else
        print_warning "健康检查失败，但服务可能仍在启动中"
    fi
    
    # 测试外部访问
    print_info "测试外部访问..."
    if curl -s http://localhost:5083/platforms > /dev/null; then
        print_success "外部访问正常 - http://localhost:5083"
    else
        print_warning "外部访问失败，请检查端口映射"
    fi
    
    return 0
}

# 显示服务信息
show_service_info() {
    print_info "服务信息："
    echo "  容器名称: develop-tools-server"
    echo "  外部端口: 5083"
    echo "  内部端口: 3022"
    echo "  访问地址: http://localhost:5083"
    echo "  平台列表: http://localhost:5083/platforms"
    echo "  新闻API: http://localhost:5083/news?platform=baidu"
    echo ""
    
    print_info "管理命令："
    echo "  查看状态: docker-compose ps"
    echo "  查看日志: docker-compose logs -f"
    echo "  停止服务: docker-compose down"
    echo "  重启服务: docker-compose restart"
}

# 清理测试环境
cleanup() {
    print_info "清理测试环境..."
    docker-compose down
    print_success "测试环境已清理"
}

# 主函数
main() {
    print_header
    
    local all_passed=true
    
    # 运行所有检查
    if ! check_port; then all_passed=false; fi
    if ! check_docker; then all_passed=false; fi
    if ! check_env; then all_passed=false; fi
    if ! test_compose; then all_passed=false; fi
    
    if [ "$all_passed" = true ]; then
        print_success "所有预检查通过，开始部署测试..."
        
        if test_deployment; then
            print_success "🎉 部署测试成功！"
            show_service_info
            
            # 询问是否清理
            echo ""
            print_warning "是否清理测试环境？(y/N)"
            read -r response
            if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
                cleanup
            else
                print_info "测试环境保持运行状态"
            fi
        else
            print_error "部署测试失败"
            cleanup
            exit 1
        fi
    else
        print_error "预检查失败，请修复问题后重试"
        exit 1
    fi
}

# 运行主函数
main "$@"
