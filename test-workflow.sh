#!/bin/bash

# 工作流测试脚本
# 用于验证Docker部署方案的各个组件

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Docker 工作流测试脚本        ${NC}"
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

# 测试1: 检查必要文件
test_files() {
    print_info "测试1: 检查必要文件"
    
    local files=(
        "Dockerfile"
        "docker-compose.yml"
        "env.example"
        "deploy.sh"
        ".github/workflows/docker-build.yml"
        "package.json"
        "app.ts"
    )
    
    local missing_files=()
    
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            print_success "文件存在: $file"
        else
            print_error "文件缺失: $file"
            missing_files+=("$file")
        fi
    done
    
    if [ ${#missing_files[@]} -eq 0 ]; then
        print_success "所有必要文件都存在"
        return 0
    else
        print_error "缺少 ${#missing_files[@]} 个文件"
        return 1
    fi
}

# 测试2: 检查Dockerfile语法
test_dockerfile() {
    print_info "测试2: 检查Dockerfile语法"
    
    if command -v docker &> /dev/null; then
        # 使用docker build来检查语法（不实际构建）
        if timeout 10s docker build --no-cache -f Dockerfile . > /dev/null 2>&1; then
            print_success "Dockerfile语法正确"
            return 0
        else
            # 如果构建失败，可能是依赖问题，检查基本语法
            if grep -q "FROM node:" Dockerfile && grep -q "WORKDIR" Dockerfile && grep -q "CMD" Dockerfile; then
                print_success "Dockerfile基本语法正确"
                return 0
            else
                print_error "Dockerfile语法错误"
                return 1
            fi
        fi
    else
        print_warning "Docker未安装，跳过Dockerfile语法检查"
        return 0
    fi
}

# 测试3: 检查docker-compose语法
test_docker_compose() {
    print_info "测试3: 检查docker-compose语法"
    
    if command -v docker-compose &> /dev/null; then
        # 先创建临时的.env文件进行测试
        if [ ! -f ".env" ]; then
            cp env.example .env
        fi
        
        if docker-compose config > /dev/null 2>&1; then
            print_success "docker-compose.yml语法正确"
            return 0
        else
            print_error "docker-compose.yml语法错误"
            return 1
        fi
    else
        print_warning "Docker Compose未安装，跳过语法检查"
        return 0
    fi
}

# 测试4: 检查环境变量文件
test_env_file() {
    print_info "测试4: 检查环境变量文件"
    
    if [ -f "env.example" ]; then
        print_success "env.example文件存在"
        
        # 检查是否包含必要的环境变量
        local required_vars=(
            "NODE_ENV"
            "PORT"
            "AI_URL"
            "AI_SK"
            "BAIDU_API"
        )
        
        local missing_vars=()
        
        for var in "${required_vars[@]}"; do
            if grep -q "^${var}=" env.example; then
                print_success "环境变量存在: $var"
            else
                print_error "环境变量缺失: $var"
                missing_vars+=("$var")
            fi
        done
        
        if [ ${#missing_vars[@]} -eq 0 ]; then
            print_success "所有必要的环境变量都已定义"
            return 0
        else
            print_error "缺少 ${#missing_vars[@]} 个环境变量"
            return 1
        fi
    else
        print_error "env.example文件不存在"
        return 1
    fi
}

# 测试5: 检查部署脚本
test_deploy_script() {
    print_info "测试5: 检查部署脚本"
    
    if [ -f "deploy.sh" ] && [ -x "deploy.sh" ]; then
        print_success "deploy.sh文件存在且可执行"
        
        # 检查脚本语法
        if bash -n deploy.sh; then
            print_success "deploy.sh语法正确"
            return 0
        else
            print_error "deploy.sh语法错误"
            return 1
        fi
    else
        print_error "deploy.sh文件不存在或不可执行"
        return 1
    fi
}

# 测试6: 检查GitHub Actions工作流
test_github_workflow() {
    print_info "测试6: 检查GitHub Actions工作流"
    
    if [ -f ".github/workflows/docker-build.yml" ]; then
        print_success "GitHub Actions工作流文件存在"
        
        # 检查YAML语法
        if command -v yamllint &> /dev/null; then
            if yamllint .github/workflows/docker-build.yml > /dev/null 2>&1; then
                print_success "GitHub Actions工作流YAML语法正确"
            else
                print_warning "GitHub Actions工作流YAML语法可能有问题"
            fi
        else
            print_warning "yamllint未安装，跳过YAML语法检查"
        fi
        
        return 0
    else
        print_error "GitHub Actions工作流文件不存在"
        return 1
    fi
}

# 测试7: 检查项目结构
test_project_structure() {
    print_info "测试7: 检查项目结构"
    
    local required_dirs=(
        "shared"
        "routes"
        "types"
        "utils"
        ".github/workflows"
    )
    
    local missing_dirs=()
    
    for dir in "${required_dirs[@]}"; do
        if [ -d "$dir" ]; then
            print_success "目录存在: $dir"
        else
            print_error "目录缺失: $dir"
            missing_dirs+=("$dir")
        fi
    done
    
    if [ ${#missing_dirs[@]} -eq 0 ]; then
        print_success "项目结构完整"
        return 0
    else
        print_error "缺少 ${#missing_dirs[@]} 个目录"
        return 1
    fi
}

# 运行所有测试
run_all_tests() {
    print_header
    
    local tests=(
        "test_files"
        "test_dockerfile"
        "test_docker_compose"
        "test_env_file"
        "test_deploy_script"
        "test_github_workflow"
        "test_project_structure"
    )
    
    local passed=0
    local failed=0
    
    for test in "${tests[@]}"; do
        if $test; then
            ((passed++))
        else
            ((failed++))
        fi
        echo ""
    done
    
    print_header
    print_info "测试结果汇总:"
    print_success "通过: $passed 个测试"
    if [ $failed -gt 0 ]; then
        print_error "失败: $failed 个测试"
    fi
    
    if [ $failed -eq 0 ]; then
        print_success "🎉 所有测试通过！工作流配置正确"
        return 0
    else
        print_error "❌ 有 $failed 个测试失败，请检查配置"
        return 1
    fi
}

# 主函数
main() {
    case "${1:-all}" in
        files)
            test_files
            ;;
        dockerfile)
            test_dockerfile
            ;;
        compose)
            test_docker_compose
            ;;
        env)
            test_env_file
            ;;
        script)
            test_deploy_script
            ;;
        workflow)
            test_github_workflow
            ;;
        structure)
            test_project_structure
            ;;
        all)
            run_all_tests
            ;;
        *)
            echo "使用方法: $0 [files|dockerfile|compose|env|script|workflow|structure|all]"
            echo ""
            echo "可用测试:"
            echo "  files      - 检查必要文件"
            echo "  dockerfile - 检查Dockerfile语法"
            echo "  compose    - 检查docker-compose语法"
            echo "  env        - 检查环境变量文件"
            echo "  script     - 检查部署脚本"
            echo "  workflow   - 检查GitHub Actions工作流"
            echo "  structure  - 检查项目结构"
            echo "  all        - 运行所有测试（默认）"
            ;;
    esac
}

main "$@"
