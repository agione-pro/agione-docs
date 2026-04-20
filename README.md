# AGIOne Docs

[![Node.js](https://img.shields.io/badge/node-%3E%3D20.19.0-brightgreen)](https://nodejs.org/)
[![VitePress](https://img.shields.io/badge/VitePress-2.0.0--alpha.17-5c73e7)](https://vitepress.dev/)

AGIOne AI Gateway Platform Documentation

Bilingual: [English](/) / [中文](/zh/)

## 环境要求

- **Node.js**: `>= 20.19.0`

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# 本地访问
npm run docs:dev

# 局域网访问
npm run docs:dev -- --host
```

开发服务器启动后，浏览器打开 `http://localhost:5173/` 即可预览，修改文档会热重载。

### 生产构建

```bash
npm run docs:build
```

构建产物输出到 `docs/.vitepress/dist/`，可直接部署到任意静态服务器。

### 预览生产构建

```bash
npm run docs:preview
```

## 文档结构

| 章节 | 英文路径 | 中文路径 |
|------|---------|---------|
| 售前资料 | `/presales/` | `/zh/presales/` |
| 方案设计 | `/solution/` | `/zh/solution/` |
| 交付部署 | `/deployment/` | `/zh/deployment/` |
| 运维运营 | `/operations/` | `/zh/operations/` |
| 排错支持 | `/troubleshooting/` | `/zh/troubleshooting/` |
| OEM 配置 | `/oem/` | `/zh/oem/` |

## 项目结构

```
.
├── docs/
│   ├── .vitepress/
│   │   └── config.mts          # VitePress 站点配置 (i18n)
│   ├── index.md                # English homepage
│   ├── presales/               # English pre-sales docs
│   ├── solution/               # English solution docs
│   ├── deployment/             # English deployment docs
│   ├── operations/             # English operations docs
│   ├── troubleshooting/        # English troubleshooting docs
│   ├── oem/                    # English OEM docs
│   └── zh/                     # Chinese locale
│       ├── index.md            # 中文首页
│       ├── presales/           # 中文售前资料
│       ├── solution/           # 中文方案设计
│       ├── deployment/         # 中文交付部署
│       ├── operations/         # 中文运维运营
│       ├── troubleshooting/    # 中文排错支持
│       └── oem/                # 中文 OEM 配置
├── .gitignore
├── package.json
└── package-lock.json
```

## 添加文档

在 `docs/` 目录下新增 `.md` 文件，VitePress 会自动生成路由。路由路径即文件路径：

| 文件路径 | 访问路径 |
|---|---|
| `docs/presales/new-doc.md` | `/presales/new-doc` |
| `docs/zh/presales/new-doc.md` | `/zh/presales/new-doc` |

侧边栏和导航栏配置在 `docs/.vitepress/config.mts` 中同步更新。

## License

MIT
