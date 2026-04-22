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
│   │   ├── config/
│   │   │   ├── index.ts        # 主配置入口
│   │   │   └── shared.ts       # 共享基础配置
│   │   ├── theme/
│   │   │   ├── index.ts        # 主题入口（扩展默认主题）
│   │   │   ├── en.ts           # 英文主题配置
│   │   │   ├── zh.ts           # 中文主题配置
│   │   │   ├── navbar/
│   │   │   │   ├── en.ts                # 英文导航栏（构建时由模板生成，勿手动修改）
│   │   │   │   ├── zh.ts                # 中文导航栏（构建时由模板生成，勿手动修改）
│   │   │   │   ├── en.main.ts           # CN 版英文导航模板（docs.agione.cc）
│   │   │   │   ├── zh.main.ts           # CN 版中文导航模板（docs.agione.cc）
│   │   │   │   ├── en.global.main.ts    # Global 版英文导航模板（docs.agione.pro）
│   │   │   │   └── zh.global.main.ts    # Global 版中文导航模板（docs.agione.pro）
│   │   │   └── sidebar/
│   │   │       ├── en.ts       # 英文侧边栏配置
│   │   │       └── zh.ts       # 中文侧边栏配置
│   │   └── social.ts           # 社交链接配置
│   ├── assets/
│   │   └── images/             # 文档图片资源
│   ├── public/                 # 静态资源（favicon, logo 等）
│   ├── index.md                # English homepage
│   ├── presales/               # English pre-sales docs
│   │   ├── best-practices/     # 最佳实践子目录
│   │   └── survey/             # 调研子目录
│   ├── solution/               # English solution docs
│   ├── deployment/             # English deployment docs
│   ├── operations/             # English operations docs
│   ├── troubleshooting/        # English troubleshooting docs
│   ├── oem/                    # English OEM docs
│   └── zh/                     # Chinese locale
│       ├── index.md            # 中文首页
│       ├── presales/           # 中文售前资料
│       │   ├── best-practices/ # 最佳实践子目录
│       │   └── survey/         # 调研子目录
│       ├── solution/           # 中文方案设计
│       ├── deployment/         # 中文交付部署
│       ├── operations/         # 中文运维运营
│       ├── troubleshooting/    # 中文排错支持
│       └── oem/                # 中文 OEM 配置
├── .github/workflows/
│   ├── main.yml                # 主分支 CI/CD（CN + Global 双构建）
│   └── preview.yml             # 预览分支 CI/CD
├── .gitignore
├── GUIDE.md                    # 项目完整指南（目录结构、配置说明、CI/CD）
├── package.json
└── package-lock.json
```

## 配置说明

本项目采用模块化配置结构，导航栏使用模板 + 生成方式管理：

| 配置文件 | 说明 |
|----------|------|
| `config/index.ts` | 主配置入口，合并所有配置 |
| `config/shared.ts` | 共享基础配置（title, description） |
| `theme/navbar/en.main.ts` | CN 版英文导航模板（手动编辑） |
| `theme/navbar/zh.main.ts` | CN 版中文导航模板（手动编辑） |
| `theme/navbar/en.global.main.ts` | Global 版英文导航模板（手动编辑） |
| `theme/navbar/zh.global.main.ts` | Global 版中文导航模板（手动编辑） |
| `theme/navbar/en.ts` | 英文导航栏（构建时自动生成，勿手动修改） |
| `theme/navbar/zh.ts` | 中文导航栏（构建时自动生成，勿手动修改） |
| `theme/sidebar/en.ts` | 英文侧边栏配置 |
| `theme/sidebar/zh.ts` | 中文侧边栏配置 |
| `social.ts` | 社交链接配置 |

## 添加文档

在 `docs/` 目录下新增 `.md` 文件，VitePress 会自动生成路由。路由路径即文件路径：

| 文件路径 | 访问路径 |
|---|---|
| `docs/presales/new-doc.md` | `/presales/new-doc` |
| `docs/zh/presales/new-doc.md` | `/zh/presales/new-doc` |

添加文档后，需要同步更新配置：

- **侧边栏配置**：`docs/.vitepress/theme/sidebar/en.ts`（英文）和 `zh.ts`（中文）
- **导航栏配置**：编辑对应的导航栏模板文件（`*.main.ts` / `*.global.main.ts`），CI/CD 构建时会自动生成 `en.ts` / `zh.ts`

详细说明请参考 [GUIDE.md](./GUIDE.md)。

## License

MIT
