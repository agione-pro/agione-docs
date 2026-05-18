# AGIOne 安装前环境预检指南

本文档用于在执行 `./agione quick` 或 `./agione install` 前，通过 precheck / doctor 方式提前完成目标主机环境检测，重点覆盖驱动、CUDA、磁盘和端口风险。

预检的目标是尽量在安装前发现阻塞问题，避免进入安装流程后才暴露资源不足、端口占用、驱动不匹配或运行目录不可写等问题。

---

## 适用场景

| 场景 | 是否建议预检 | 说明 |
| --- | --- | --- |
| All-in-One 单机安装 | 是 | 安装前确认 CPU、内存、磁盘、端口、Docker、Compose 和基础命令 |
| 带 GPU / XPU 的算力节点 | 是 | 额外确认驱动、CUDA / CANN、容器运行时和设备可见性 |
| 离线或弱网交付 | 是 | 需确认 bundle、离线镜像、离线 Python 和运行目录可用 |
| 已有历史环境重装 | 是 | 需确认旧数据、旧容器、旧端口和旧目录是否会影响安装 |

---

## 执行方式

### 推荐方式：使用安装器 doctor

当前 AGIOne 安装器可使用 `doctor` 承担安装前预检职责：

```bash
cd /opt/hyperone/agione-release-v1.0-20260513
chmod +x ./agione
./agione doctor
```

`doctor` 会生成诊断报告和支持包，适合在正式安装前归档，也适合安装失败后定位问题。

首次安装场景下，`doctor` 使用 `/tmp` 临时检查工作区，不会提前创建或覆盖 `/opt/agione-installer-bundle`。

### 如果交付包提供独立 precheck 脚本

如果交付包中提供 `precheck.sh` 或同类脚本，可在安装前单独执行：

```bash
chmod +x ./precheck.sh
./precheck.sh
```

precheck 脚本应至少覆盖本文后续列出的驱动 / CUDA、磁盘、端口和基础运行环境检查。脚本输出建议统一为 `PASS`、`WARN`、`FAIL` 三类结果：

| 结果 | 含义 | 处理建议 |
| --- | --- | --- |
| `PASS` | 满足安装要求 | 可进入安装流程 |
| `WARN` | 存在风险但不一定阻塞 | 需交付负责人确认是否接受 |
| `FAIL` | 不满足关键前置条件 | 暂停安装，完成整改后重新预检 |

---

## 检查项总览

| 类别 | 能否提前检测 | 阻塞级别 | 说明 |
| --- | --- | --- | --- |
| 操作系统与权限 | 可以 | 高 | 确认 Linux 发行版、root 或等效权限、基础命令可用 |
| CPU / 内存 | 可以 | 高 | All-in-One 推荐 8 核 / 16 GiB |
| 磁盘空间 | 可以 | 高 | `/opt/hyperone` 所在分区推荐 200 GiB，可接受约 160 GiB 以上 |
| 端口占用 | 可以 | 高 | 本机端口占用可自动检测，跨节点访问需结合网络策略验证 |
| NVIDIA 驱动 | 可以 | 中 / 高 | 管理节点不强制要求 GPU；算力节点或本机推理场景必须确认 |
| CUDA | 可以 | 中 / 高 | 需结合 GPU 驱动、镜像、推理引擎和交付包兼容矩阵确认 |
| Docker / Compose | 可以 | 高 | 已安装则检查版本与状态；未安装则确认可通过离线资源安装 |
| 离线资源包 | 可以 | 高 | 建议同时执行 `./agione verify-bundle` |

---

## 驱动与 CUDA 检查

### 检查原则

AGIOne 管理节点本身不强制要求 GPU。如果目标主机同时承担算力节点、模型推理或 GPU 资源纳管职责，则必须提前检查驱动、CUDA 和容器运行时。

驱动 / CUDA 不建议只按单一版本号判断，应结合以下信息共同确认：

- GPU 型号
- NVIDIA Driver 版本
- CUDA Runtime / Toolkit 版本
- 推理引擎版本
- AGIOne 交付包和镜像版本
- 是否需要 GPU 容器运行时

### 推荐检查命令

```bash
# 检查 GPU 与驱动是否可见
nvidia-smi

# 检查 CUDA Toolkit，未安装 nvcc 时不一定阻塞，应以交付包要求为准
nvcc --version

# 检查内核模块
lsmod | grep -i nvidia

# 检查容器运行时是否识别 NVIDIA，命令存在时执行
nvidia-container-cli info
```

### 判定标准

| 检查项 | 通过标准 | 失败或风险表现 |
| --- | --- | --- |
| `nvidia-smi` | 能正常输出 GPU、Driver Version 和 CUDA Version | 命令不存在、报错、GPU 不可见 |
| Driver 版本 | 与 GPU 型号、镜像和交付包兼容 | 驱动过旧、与内核不匹配、重启后模块未加载 |
| CUDA 版本 | 与推理引擎和镜像兼容 | CUDA 版本不明确或与镜像要求不一致 |
| GPU 容器运行时 | 容器内可访问 GPU | 容器启动后无法看到 GPU 设备 |

### 注意事项

- `nvidia-smi` 中显示的 CUDA Version 表示驱动支持的 CUDA 能力，不一定等于系统安装的 CUDA Toolkit 版本。
- 如果 AGIOne 只部署管理面，驱动 / CUDA 缺失不应阻塞安装，但应在预检报告中标记为“不适用”。
- 如果部署包含本机推理或算力纳管，驱动 / CUDA 未确认应视为高风险。

---

## 磁盘检查

### 检查目标

重点检查 `/opt/hyperone` 所在分区的可用空间、写入权限和 inode 情况。

All-in-One 单机安装推荐 `/opt/hyperone` 所在分区可用空间 200 GiB。安装器允许约 20% 文件系统保留损耗，约 160 GiB 以上可通过基础检查。

### 推荐检查命令

```bash
# 查看 /opt/hyperone 所在分区容量
df -h /opt/hyperone 2>/dev/null || df -h /opt

# 查看 inode 是否充足
df -ih /opt/hyperone 2>/dev/null || df -ih /opt

# 检查目录可创建与可写
mkdir -p /opt/hyperone
touch /opt/hyperone/.agione-precheck-write-test
rm -f /opt/hyperone/.agione-precheck-write-test
```

### 判定标准

| 检查项 | 通过标准 | 处理建议 |
| --- | --- | --- |
| 可用空间 | 推荐 200 GiB，最低约 160 GiB 以上 | 低于阈值时扩容或更换运行目录 |
| 写权限 | root 或等效权限可写入 `/opt/hyperone` | 修复目录权限或使用具备权限的账号 |
| inode | inode 使用率未接近 100% | 清理小文件或调整文件系统 |
| 历史数据 | 已确认是否保留、备份或清理 | 重装前必须完成数据确认 |

---

## 端口检查

### 检查目标

端口预检分为两类：

- 本机端口占用检查：确认 AGIOne 将使用的端口没有被非受控进程占用。
- 网络连通性检查：确认客户端、管理节点、算力节点或中间件节点之间可以访问必要端口。

precheck 脚本可以自动完成本机端口占用检查；跨主机网络连通性仍需结合防火墙、安全组、路由和客户网络策略验证。

### All-in-One 关键端口

| 端口 | 用途 | 预检重点 |
| --- | --- | --- |
| `22/TCP` | SSH 运维 | 运维端可登录目标主机 |
| `18090/TCP` | AGIOne Web 入口 | 未被占用，客户端可访问 |
| `80/TCP` | Nginx / OpenResty 入口 | 未被非受控进程占用 |
| `8089/TCP` | 作业访问代理 | 未被非受控进程占用 |
| `3306/TCP` | MariaDB | 未被旧数据库或其他服务占用 |
| `6379/TCP` | Redis | 未被旧 Redis 或其他服务占用 |
| `8848/8849/TCP` | Nacos | 未被旧 Nacos 或其他服务占用 |
| `9000/9001/TCP` | MinIO API / Console | 未被旧 MinIO 或其他服务占用 |
| `9092/TCP` | Kafka | 未被旧 Kafka 或其他服务占用 |
| `443/TCP` | HTTPS 入口，可选 | 如启用 HTTPS，需提前规划 |

### 推荐检查命令

```bash
# 检查本机监听端口
ss -lntup | grep -E ':(22|80|443|3306|6379|8089|8848|8849|9000|9001|9092|18090)\b'

# 或使用 lsof
lsof -iTCP -sTCP:LISTEN -P -n | grep -E ':(22|80|443|3306|6379|8089|8848|8849|9000|9001|9092|18090)\b'

# 从客户端或其他节点验证入口端口连通性
nc -vz <target-host-ip> 18090
nc -vz <target-host-ip> 22
```

### 判定标准

| 检查项 | 通过标准 | 失败或风险表现 |
| --- | --- | --- |
| 本机端口占用 | 端口未被非 AGIOne 进程占用 | 旧服务占用端口导致容器启动失败 |
| 防火墙 / 安全组 | 访问方能连接目标端口 | 浏览器无法访问或节点间服务不可达 |
| 端口规划 | 默认端口或自定义端口已审批 | 部署时临时改端口，导致访问地址和配置不一致 |

---

## precheck 输出建议

建议 precheck / doctor 报告至少包含以下内容：

| 模块 | 输出内容 |
| --- | --- |
| 主机信息 | hostname、IP、操作系统、内核、CPU 架构 |
| 资源信息 | CPU 核数、内存、磁盘、inode、运行目录权限 |
| 驱动与 CUDA | GPU 型号、Driver、CUDA、容器运行时、检查结论 |
| 端口 | 端口占用进程、监听地址、冲突端口列表 |
| Docker / Compose | 版本、服务状态、是否可用离线安装 |
| 离线包 | bundle manifest、checksum、镜像包、离线 Python |
| 结论 | PASS / WARN / FAIL、阻塞项、整改建议 |

---

## 安装准入建议

满足以下条件后再进入正式安装：

1. `./agione doctor` 或 precheck 脚本执行完成，并已归档报告。
2. CPU、内存、磁盘、端口、权限等基础项均为 `PASS`。
3. 如涉及 GPU / XPU，驱动、CUDA / CANN 和容器运行时已确认。
4. 所有 `FAIL` 项已整改并复检通过。
5. 所有 `WARN` 项已由交付负责人和客户负责人确认接受。
6. 离线交付场景已执行 `./agione verify-bundle` 并通过。

---

## 与安装流程的关系

推荐执行顺序：

```bash
# 1. 上传并解压 release bundle
cd /opt/hyperone/agione-release-v1.0-20260513

# 2. 安装前环境预检
chmod +x ./agione
./agione doctor

# 3. 交付物完整性校验
./agione verify-bundle

# 4. 正式安装
./agione quick

# 5. 安装后验收
./agione health
./agione ps
```

`precheck` 或 `doctor` 用于提前发现风险，不能替代安装过程中的系统检查。正式安装时，`quick` 仍会再次执行安装前检查，并在检查通过后继续解包、配置、加载镜像和启动服务。
