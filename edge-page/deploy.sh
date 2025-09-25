#!/bin/bash

# EdgeOne Page 部署脚本
set -e

echo "🚀 开始构建前端项目..."

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建结果
if [ -d "dist" ]; then
    echo "✅ 构建成功！"
    echo "📁 构建文件位于: dist/"
    echo ""
    echo "📋 部署到 EdgeOne Page 的步骤:"
    echo "1. 登录 EdgeOne 控制台"
    echo "2. 选择你的站点"
    echo "3. 进入 '页面规则' 或 '静态站点'"
    echo "4. 上传 dist/ 文件夹中的所有文件"
    echo "5. 配置域名和CDN"
    echo ""
    echo "🌐 本地预览:"
    echo "npm run preview"
else
    echo "❌ 构建失败！"
    exit 1
fi
