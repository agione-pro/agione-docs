# AGIOne 环境安装部署指南

AGIOne 安装器用于在离线或弱网环境中完成 AGIOne 单机交付安装。本文档按“先快速安装，再深入配置，最后运维排障”的方式组织，安装人员优先阅读 **Quick Install** 即可开始。

安装前建议先完成环境快速调研，判断是否满足安装部署前置条件，并识别整改与上线风险：

- [环境快速调研](/zh/product/investigation/quick-env-investigation)
- 
---

## 主机规格

推荐申请规格：

| 项目 | 推荐值 | 说明 |
| --- | --- | --- |
| 操作系统 | Linux | ubuntu 22.04 |
| CPU | 8 核 | CPU 核数必须满足 8 核 |
| 内存 | 16 GiB | 检测允许少量系统/虚拟化保留损耗，约 `15.2GiB` 以上可通过 |
| 可用磁盘 | 200 GiB | `/opt/hyperone` 所在分区检测允许约 20% 文件系统保留损耗，约 `160GiB` 以上可通过 |
| 执行用户 | `root` | 推荐 root 安装，避免 Docker、目录权限和系统服务权限问题 |

## Quick Install

### 1. 上传 bundle

将 `agione-release-v1.0-20260513.tar.gz` 上传到目标主机，例如：

```bash
scp -r agione-release-v1.0-20260513.tar.gz root@<target-host>:/opt/hyperone/
ssh root@<target-host>
cd /opt/hyperone && \
tar -zxvf agione-release-v1.0-20260513.tar.gz && \
cd /opt/hyperone/agione-release-v1.0-20260513
```

### 2. 一键安装

推荐使用 `quick`，它会自动完成解包、环境检查和安装流程：

```bash
chmod +x ./agione
./agione quick
```

安装器会自动执行：

1. 在 `/tmp/agione-quick-check.*` 临时工作区执行安装前检查
2. 检查通过后刷新 bundle 到 `/opt/agione-installer-bundle`
3. 准备离线 Python 运行时
4. 检查离线资源包
5. 渲染配置与 Compose 文件
6. 安装或修复 Docker / Compose
7. 加载离线镜像
8. 启动 AGIOne 服务
9. 导入 Nacos 配置
10. 输出安装结果和服务列表

### 3. 查看安装结果

安装成功后，`quick` 会在终端末尾输出实际访问入口和默认账号信息。`quick` 默认使用英文输出，格式如下：

```text
Installation Result:
Console URL: http://<target-host-ip>:18090/

Access Information (Account/Password):
admin .system.admin.123./
operator .system.admin.123./
manager .system.admin.123./
```

也可以执行：

```bash
./agione health
./agione ps
```

### 4. 浏览器访问

默认访问地址：

```text
http://<target-host-ip>:18090/modelone/
```

如果使用域名或自定义端口，请以安装配置中的 `domain` / `public_port` 为准。

---

## Home

### AGIOne 安装器做什么

AGIOne 安装器负责完成以下工作：

- 解包离线交付物到标准运行目录
- 检查主机环境、资源、Docker、Compose、端口和基础命令
- 渲染安装配置与 `compose.rendered.yaml`
- 加载离线 Docker 镜像并启动 AGIOne 服务
- 导入 Nacos 配置并等待核心服务注册
- 输出安装结果、服务状态、诊断报告和交付包

### 推荐阅读路径

- **首次安装**：直接看 [Quick Install](#quick-install)
- **需要图形化交互**：看 [高级安装](#高级安装)
- **安装失败或交付验收**：看 [运维文档](#运维文档)
- **强制安装、跳过检查、数据恢复**：看 [FAQ](#faq)

### 标准目录

| 类型 | 路径 |
| --- | --- |
| release 解包源目录 | `agione-release-v1.0-YYYYMMDD` |
| 安装器运行目录 | `/opt/agione-installer-bundle` |
| AGIOne 运行数据目录 | `/opt/hyperone` |
| 离线 Python 运行时 | `/opt/agione-python` |
| 安装报告与诊断输出 | `/opt/agione-installer-bundle/reports` 或当前 bundle 的 `reports` |

---

## Getting Started

### 安装前检查

首次交付前建议先执行：

```bash
./agione doctor
```

`doctor` 会生成诊断报告和支持包，适合在安装前或失败后快速定位问题。首次安装场景会使用 `/tmp` 临时检查工作区，不创建 `/opt/agione-installer-bundle`。

### bundle 校验

如果需要确认交付物完整性：

```bash
./agione verify-bundle
```

校验通过后再执行安装。

---

## 高级安装

### TUI 交互式安装

如果需要逐页确认参数、资源策略、节点信息和安装计划，可以使用：

```bash
chmod +x ./agione
./agione install
```

TUI 流程包含：

1. Welcome
2. System Check
3. Offline Package Check
4. Module Selection
5. Basic Info
6. Node Input
7. Middleware Config
8. Resource Policy
9. Config Review
10. Start Install
11. Execute
12. Result

适合正式交付、客户现场演示或需要人工确认配置的场景。

### 配置审阅

执行安装前可生成脱敏配置审阅报告：

```bash
./agione review-config
```

报告通常包含：

- 安装模式
- 访问地址
- 数据库、Redis、Nacos、Kafka、MinIO 配置摘要
- 资源策略
- 关键路径
- 风险提示

### 资源策略

安装器支持两种资源策略：

| 策略 | 说明 |
| --- | --- |
| Docker 默认资源策略 | 默认推荐，不在 `compose.rendered.yaml` 中写入 `cpus` / `mem_limit` / `mem_reservation` |
| 手动资源配额 | 安装人员为每个服务填写 CPU、内存限制和内存预留 |

一般交付建议使用默认策略，避免在不同客户主机规格下过度限制服务资源。

---

## 运维文档

### 常用命令

```bash
./agione help
./agione ps
./agione health
./agione restart <service>
./agione stop <service>
./agione down
./agione doctor
./agione handover
```

### 查看服务状态

```bash
./agione ps
```

或进入安装目录后查看 Compose 状态：

```bash
cd /opt/agione-installer-bundle/outputs/agione-app
docker compose -f compose.rendered.yaml ps
```

如果系统使用旧版 Compose：

```bash
docker-compose -f compose.rendered.yaml ps
```

### 重启服务

重启全部服务：

```bash
./agione restart
```

重启指定服务：

```bash
./agione restart core_upms md_gateway nginx
```

### 健康检查

```bash
./agione health
```

健康检查报告用于交付验收和失败排查，建议安装完成后归档。

### 诊断包

安装失败后优先执行：

```bash
./agione doctor
```

诊断包通常包含：

- 系统检查结果
- 配置快照
- Compose 文件
- 服务状态
- 日志摘要
- 失败分类和建议命令

### 交付包

安装成功后建议导出交付包：

```bash
./agione handover
```

交付包可用于客户验收、内部归档和后续运维交接。

---

## FAQ

### Q1：`quick` 和 `install` 怎么选？

- 想最快安装：使用 `./agione quick`
- 想逐步确认配置：使用 `./agione install`
- 想只做检查不安装：使用 `./agione doctor`

### Q2：目标机没有 `python3` 怎么办？

不需要手动安装。bundle 内置离线 Python 运行时，安装器会优先准备 `/opt/agione-python`。

### Q3：为什么申请了 16G 内存，检测不是 16GiB？

云主机、虚拟化平台和操作系统会保留一部分内存，所以检测值常见为 `15.xGiB`。安装器已允许少量保留损耗，约 `15.2GiB` 以上可通过。

### Q4：为什么申请了 200G 磁盘，检测略小？

磁盘厂商单位、文件系统元数据和系统保留空间会导致实际可用空间小于标称值。安装器已允许约 20% 容差，约 `160GiB` 以上可通过。

### Q5：系统检查失败能跳过吗？

不建议跳过。系统检查失败通常意味着后续可能出现 OOM、初始化超时、服务注册失败或数据库启动缓慢。

如确认为临时联调或演示环境，可按安装器界面提示执行隐藏覆盖操作；`quick` 模式也支持：

```bash
./agione quick --skip-system-check
```

该参数只跳过安装前检查；执行阶段仍会检查并尽量使用离线资产安装或修复 Docker / Compose。跳过检查可能导致运行数据已解包后才暴露资源、端口或运行时问题，正式交付不建议使用。

### Q6：什么情况下使用强制干净安装？

只有在确认目标机旧数据可以被清理、且希望从基线包重新构建环境时才使用。

```bash
./agione unpackage --force-clean-install
```

强制安装会先备份已有 AGIOne 服务数据，再删除旧运行数据并解压新基线。

### Q7：强制安装的备份在哪里？

默认路径：

```text
/opt/hyperone/backups/force-restore/<timestamp>/all-service-data/
```

强制安装不会自动恢复旧数据。如需恢复，必须先停止服务，再按目录恢复。

### Q8：Nacos 配置缺失或服务启动失败怎么办？

优先执行：

```bash
./agione doctor
./agione health
./agione ps
```

然后查看失败服务日志：

```bash
docker logs <container-name> --tail 300
```

常见原因包括：Nacos 配置未导入、Redis 密码不一致、数据库未就绪、镜像未加载或主机资源不足。

### Q9：安装完成后需要交付哪些信息？

建议至少交付：

- 访问地址
- 管理账号或初始化账号信息
- `/opt/agione-installer-bundle` 路径
- `/opt/hyperone` 路径
- `health` 报告
- `handover` 交付包
- 如使用强制安装，还需记录备份路径

---

## 附录：推荐安装流程

```bash
# 1. 进入 bundle 目录
cd /opt/hyperone/agione-release-v1.0-20260513

# 2. 授权入口脚本
chmod +x ./agione

# 3. 可选：校验 bundle
./agione verify-bundle

# 4. 一键安装
./agione quick

# 5. 验收
./agione health
./agione ps

# 6. 导出交付包
./agione handover
```
