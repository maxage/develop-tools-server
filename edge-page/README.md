# 开发工具聚合 API 使用说明页面

这是一个专为 EdgeOne Page 设计的静态页面，用于展示开发工具聚合 API 的使用说明和调用示例。

## 🎯 项目说明

- **用途**：API 使用说明页面，不是完整的前端应用
- **部署**：EdgeOne Page 自动从 GitHub 拉取并部署
- **功能**：展示 API 接口、调用示例、平台列表等

## 🚀 EdgeOne Page 自动部署

### 1. 在 EdgeOne Page 中配置

1. **创建项目**
   - 项目类型：静态网站
   - 仓库：`https://github.com/你的用户名/develop-tools-server`
   - 分支：`master`
   - **构建目录**：`edge-page` （重要！）

2. **构建配置**
   - 构建命令：`cd edge-page && npm ci && npm run build`
   - 输出目录：`edge-page/dist`
   - Node.js 版本：`20`

3. **环境变量**
   - 在 EdgeOne Page 项目设置中添加所有 API 配置
   - 参考 `EDGEONE_DEPLOYMENT.md` 文件

### 2. 自动化流程

```
代码推送 → GitHub 更新 → EdgeOne Page 检测 → 自动构建 → 自动部署
```

## 📁 项目结构

```
edge-page/
├── src/
│   ├── components/     # React 组件
│   ├── utils/
│   │   └── api.ts     # API 调用（自动使用当前域名）
│   ├── App.tsx        # 主应用
│   └── main.tsx       # 入口文件
├── index.html         # 入口 HTML
├── package.json       # 依赖配置
├── vite.config.ts     # Vite 配置
└── dist/              # 构建输出（自动生成）
```

## 🔧 本地开发

### 安装依赖

```bash
cd edge-page
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建

```bash
npm run build
```

## 🎯 核心特性

- ✅ **自动域名适配**：API 调用自动使用当前域名
- ✅ **响应式设计**：支持桌面端和移动端
- ✅ **实时演示**：可直接测试 API 接口
- ✅ **平台展示**：支持的所有平台列表
- ✅ **调用示例**：JavaScript、cURL、Python 示例
- ✅ **错误处理**：完善的错误提示和加载状态

## 🔗 API 接口说明

### 获取平台列表
```
GET /platforms
```

### 获取新闻数据
```
GET /news?platform={platform_name}
```

### 图片代理服务
```
GET /proxy/image?url={image_url}&w={width}&h={height}
```

## 📋 支持的平台

- 百度热搜 (baidu)
- 微博热搜 (weibo)
- 知乎热榜 (zhihu)
- 36氪新闻 (_36kr)
- V2EX热门 (v2ex)
- 掘金热榜 (juejin)
- 更多平台...

## 🛠️ 技术栈

- **React 19** - 用户界面
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Axios** - HTTP 客户端
- **CSS3** - 样式设计

## 📄 许可证

MIT License