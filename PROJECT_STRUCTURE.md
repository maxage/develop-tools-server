# 项目结构说明

## 📁 目录结构

```
develop-tools-server/
├── .github/                          # GitHub 配置
│   └── workflows/                    # GitHub Actions 工作流
│       └── docker-build.yml         # Docker 构建和发布工作流
├── ai/                               # AI 功能模块
│   └── index.ts                      # AI 服务实现
├── bin/                              # 启动脚本
│   └── www.ts                        # 服务器启动入口
├── config/                           # 配置文件
│   └── platforms.json                # 平台配置信息
├── constant/                         # 常量定义
│   └── index.ts                      # 全局常量
├── manager/                          # 管理模块
│   └── index.ts                      # 管理功能实现
├── public/                           # 静态资源
│   └── stylesheets/
│       └── style.css                 # 样式文件
├── routes/                           # 路由定义
│   ├── index.ts                      # 主路由
│   ├── news.ts                       # 新闻路由
│   ├── platforms.ts                  # 平台路由
│   ├── proxy.ts                      # 代理路由
│   └── shortUrl.ts                   # 短链接路由
├── shared/                           # 共享模块（各平台API实现）
│   ├── _36kr.ts                      # 36氪
│   ├── _51cto.ts                     # 51CTO
│   ├── autohome.ts                   # 汽车之家
│   ├── baidu.ts                      # 百度
│   ├── bilibili.ts                   # 哔哩哔哩
│   ├── cankaoxiaoxi.ts               # 参考消息
│   ├── cls.ts                        # 财联社
│   ├── coolapk.ts                    # 酷安
│   ├── csdn.ts                       # CSDN
│   ├── dongchedi.ts                  # 懂车帝
│   ├── douban.ts                     # 豆瓣
│   ├── douyin.ts                     # 抖音
│   ├── fastbull.ts                   # 快牛
│   ├── fishpi.ts                     # 鱼皮
│   ├── gelonghui.ts                  # 格隆汇
│   ├── github.ts                     # GitHub
│   ├── guoheboke.ts                  # 果核博客
│   ├── hackernews.ts                 # Hacker News
│   ├── hupu.ts                       # 虎扑
│   ├── init.ts                       # 初始化模块
│   ├── ithome.ts                     # IT之家
│   ├── jin10.ts                      # 金十数据
│   ├── jqka.ts                       # 同花顺
│   ├── juejin.ts                     # 掘金
│   ├── kaopu.ts                      # 考谱
│   ├── kuaishou.ts                   # 快手
│   ├── linuxdo.ts                    # Linux DO
│   ├── music.ts                      # 音乐相关
│   ├── nowcoder.ts                   # 牛客网
│   ├── pcbeta.ts                     # PCbeta
│   ├── producthunt.ts                # Product Hunt
│   ├── smzdm.ts                      # 什么值得买
│   ├── solidot.ts                    # Solidot
│   ├── sputniknewscn.ts              # 俄罗斯卫星通讯社
│   ├── sspai.ts                      # 少数派
│   ├── thepaper.ts                   # 澎湃新闻
│   ├── tieba.ts                      # 百度贴吧
│   ├── toutiao.ts                    # 今日头条
│   ├── v2ex.ts                       # V2EX
│   ├── wallstreetcn.ts               # 华尔街见闻
│   ├── weibo.ts                      # 微博
│   ├── xueqiu.ts                     # 雪球
│   └── zaobao.ts                     # 联合早报
├── types/                            # TypeScript 类型定义
│   ├── cls.d.ts                      # 财联社类型
│   ├── index.d.ts                    # 主类型定义
│   ├── shared.d.ts                   # 共享类型
│   └── tools.d.ts                    # 工具类型
├── utils/                            # 工具函数
│   ├── index.ts                      # 通用工具
│   └── response.ts                    # 响应处理
├── views/                            # 视图模板（Pug）
│   ├── error.pug                     # 错误页面
│   ├── expired.pug                   # 过期页面
│   ├── index.pug                     # 首页
│   ├── layout.pug                    # 布局模板
│   ├── notfound.pug                  # 404页面
│   └── password.pug                  # 密码页面
├── .dockerignore                     # Docker 忽略文件
├── .env                              # 环境变量（本地，不提交）
├── .env.example                      # 环境变量模板
├── .gitignore                        # Git 忽略文件
├── Dockerfile                        # Docker 镜像配置
├── LICENSE                           # 开源许可证
├── README.md                         # 项目说明文档
├── README_DOCKER.md                  # Docker 部署说明
├── USAGE.md                          # 使用说明
├── WORKFLOW_SUMMARY.md               # 工作流总结
├── PROJECT_STRUCTURE.md              # 项目结构说明（本文件）
├── app.ts                            # 应用主入口
├── deploy.sh                         # 部署脚本
├── docker-compose.yml                # Docker Compose 配置
├── package.json                      # 项目配置和依赖
├── test-workflow.sh                  # 工作流测试脚本
├── tsconfig.json                     # TypeScript 配置
└── verify-deployment.sh              # 部署验证脚本
```

## 🏗️ 架构说明

### 核心模块

#### 1. **应用入口** (`app.ts`)
- Express 应用配置
- 中间件设置
- 路由注册
- 错误处理

#### 2. **启动脚本** (`bin/www.ts`)
- 服务器启动逻辑
- 端口配置
- 错误处理

#### 3. **路由模块** (`routes/`)
- `index.ts` - 主路由，首页和基础API
- `news.ts` - 新闻聚合API
- `platforms.ts` - 平台列表API
- `proxy.ts` - 代理服务API
- `shortUrl.ts` - 短链接服务API

#### 4. **平台实现** (`shared/`)
- 各平台API的具体实现
- 统一的接口规范
- 错误处理和重试机制

#### 5. **类型定义** (`types/`)
- TypeScript 类型声明
- 接口定义
- 数据结构规范

#### 6. **工具函数** (`utils/`)
- 通用工具函数
- 响应格式化
- 数据处理

### 配置模块

#### 1. **环境配置**
- `.env.example` - 环境变量模板
- `.env` - 实际环境变量（不提交）
- `config/platforms.json` - 平台配置

#### 2. **构建配置**
- `package.json` - 项目依赖和脚本
- `tsconfig.json` - TypeScript 配置
- `Dockerfile` - Docker 镜像配置
- `docker-compose.yml` - 容器编排配置

### 部署模块

#### 1. **部署脚本**
- `deploy.sh` - 一键部署脚本
- `test-workflow.sh` - 工作流测试
- `verify-deployment.sh` - 部署验证

#### 2. **CI/CD**
- `.github/workflows/docker-build.yml` - GitHub Actions 工作流

### 文档模块

#### 1. **用户文档**
- `README.md` - 项目介绍
- `README_DOCKER.md` - Docker 部署指南
- `USAGE.md` - 使用说明

#### 2. **开发文档**
- `WORKFLOW_SUMMARY.md` - 工作流总结
- `PROJECT_STRUCTURE.md` - 项目结构说明（本文件）

## 🔧 技术栈

- **后端框架**: Express.js
- **语言**: TypeScript
- **模板引擎**: Pug
- **HTTP客户端**: Axios
- **容器化**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **包管理**: npm

## 📦 依赖管理

### 生产依赖
- `express` - Web 框架
- `axios` - HTTP 客户端
- `cheerio` - HTML 解析
- `dayjs` - 日期处理
- `pug` - 模板引擎
- `sharp` - 图像处理
- 其他平台特定依赖

### 开发依赖
- `typescript` - TypeScript 编译器
- `tsx` - TypeScript 执行器
- `@types/*` - 类型定义

## 🚀 部署架构

### Docker 化部署
1. **单容器部署**: 使用 `docker-compose up -d`
2. **多架构支持**: amd64/arm64
3. **数据持久化**: 本地目录映射
4. **健康检查**: 自动监控服务状态

### 环境变量管理
- 统一在 `.env` 文件中管理
- Docker Compose 自动加载
- 支持不同环境配置

## 📝 开发规范

### 代码组织
- 模块化设计，每个平台独立文件
- 统一的错误处理机制
- 类型安全的 TypeScript 代码

### 文件命名
- 使用 kebab-case 命名文件
- 平台文件使用平台名称
- 工具文件使用功能描述

### 提交规范
- 使用语义化提交信息
- 功能开发使用 `feat:` 前缀
- 修复使用 `fix:` 前缀
- 文档使用 `docs:` 前缀

## 🔍 维护指南

### 添加新平台
1. 在 `shared/` 目录创建新文件
2. 在 `shared/init.ts` 中注册
3. 在 `config/platforms.json` 中添加配置
4. 更新相关文档

### 修改配置
1. 更新 `env.example` 模板
2. 更新相关文档
3. 测试配置变更

### 部署更新
1. 修改代码
2. 创建 Git 标签
3. GitHub Actions 自动构建发布
4. 更新生产环境

---

**最后更新**: 2024年9月25日  
**维护者**: 项目开发团队
