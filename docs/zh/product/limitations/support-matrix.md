# AGIOne 产品支持矩阵及限制条件

## 1. 文档说明

本文档用于说明 AGIOne 当前产品支持范围、部署环境、纳管算力节点、纳管算力平台、模型能力、on-prem 快速部署模型清单，以及已知限制条件。

本文档属于支持矩阵草案，适用于产品介绍、售前方案、交付评估和部署前技术确认。实际项目交付前，应结合正式 release note、交付包兼容矩阵、驱动版本、推理引擎版本和现场环境评估结果确认最终支持范围。

## 2. 总体支持范围

| 范围             | 支持说明                                                                 | 限制条件                            |
| -------------- | -------------------------------------------------------------------- | ------------------------------- |
| 管理节点部署         | 支持 All-in-One、本地多节点、Kubernetes / 云原生、私有化、离线或弱网交付                     | 具体规格需按部署形态、纳管规模和交付包版本确认         |
| 算力节点纳管         | 支持 NVIDIA Hopper / Ampere / Ada，Ascend910B/910C，Enflame106，Biren S60 | 芯片可纳管不等于所有模型、驱动、CUDA、推理引擎组合均已验证 |
| 算力平台纳管         | 支持阿里云、AWS、Google Cloud、AGIOne 异构卡纳管（算模方）等云平台，暂不支持华为云             | 不同云平台的账号权限、网络互通、API 密钥和安全策略需单独评估    |
| 模型服务能力         | 支持文本生成、推理、多模态、OCR、Embedding、Reranker、RAG（规划中）、工具调用（规划中）、聚合模型、流式输出和 usage计量等    | 具体能力依赖模型本身、推理引擎、协议适配和产品版本       |
| 快速部署模型         | 支持 DeepSeek、Qwen、Kimi、MiniMax、GLM、Llama 等系列                          | 超大模型需评估显存、并行策略、量化方式、存储和网络条件     |

## 3. AGIOne 管理节点部署支持矩阵

| 部署形态 | 支持状态 |典型环境 |关键要求 | 限制条件 |
| --- | --- | --- | --- | --- |
| All-in-One 单机部署 | 支持 | 单台 Linux物理机或虚拟机 | 推荐8C /16GiB /200GiB 可用磁盘，root 或等效权限，Docker / Compose |适合演示、测试、PoC 或小规模部署，不建议承载高可用生产负载 |
| 本地 Host-mode 多节点部署 | 支持 | 多台 Linux物理机或虚拟机 | 至少4 台机器：2 台应用节点、1 台中间件节点、1 台数据库备库节点；节点 IP 固定；SSH 可达；时间同步 | 历史数据、端口占用、目录权限和数据库主备风险需部署前确认 |
| Kubernetes / 云原生部署 | 支持 |既有 Kubernetes 集群或 AGIOne交付 kube-cluster | kubeconfig 可用，节点 Ready，命名空间权限充足，镜像仓库、StorageClass、Ingress、DNS、证书就绪 | Kubernetes版本需按交付包兼容矩阵确认；存储、CNI 和 Ingress 差异会影响交付 |
| 私有化部署 | 支持 | 企业内网、IDC、私有云、专有云 | 可部署管理平面、模型服务、资源纳管和统一入口；支持数据不出域场景 | 网络隔离、离线包、证书、DNS、代理、安全基线和审计策略需现场评估 |
| 离线或弱网部署 | 支持 | 无公网或受限公网环境 | 离线 bundle、离线 Python、镜像包、checksum 校验、Docker/Compose 安装或修复能力 | 缺失离线资源、镜像导入失败、仓库不可达会阻塞部署 |

## 4. 管理节点操作系统与组件支持

| 类别 | 支持建议 | 限制条件 |
| --- | --- | --- |
| 操作系统 | Ubuntu22.04 推荐；Ubuntu20.04 可作为推荐范围；CentOS/Rocky7.x/8.x 条件支持；Kylin/UOS需评估 |生产应以正式 release note、交付包兼容矩阵和现场验证结果为准 |
| Docker | Docker24.x+ 建议 |需匹配操作系统、内核、镜像包和离线安装方式 |
| Kubernetes | Kubernetes1.24-1.29 建议 |需结合交付包、GPU/NPU 插件、CNI、CSI、Ingress Controller 验证 |
| Helm | Helm3.10+ 建议 |仅适用于 Helm 或 chart交付形态 |
| 中间件 | MariaDB、Redis、Nacos、Kafka、MinIO、OpenResty/Nginx |端口冲突、存储持久化、备份恢复和安全基线需部署前确认 |

## 5. AGIOne 纳管算力节点支持矩阵

| 厂商 | 架构 / 系列 | 支持型号 |典型用途 | 限制条件 |
| --- | --- | --- | --- | --- |
| NVIDIA | Hopper | H800、H200、H100、H20 |旗舰大模型推理、长上下文、多卡并行、高吞吐服务 |需结合驱动、CUDA、推理引擎、显存和网络验证 |
| NVIDIA | Ampere | A100、A800、A40、A30、A10、RTX A6000、RTX A5000、RTX A4000、RTX A2000、RTX3090、RTX3060 | 通用推理、存量算力复用、中小模型部署 | 不同型号显存差异大，不能直接等同支持所有模型规格 |
| NVIDIA | Ada | L40、L40S、L20、L20S、L4、L2、RTX6000、RTX5000、RTX4500、RTX4000、RTX2000、RTX4090、RTX4090D | 中等规模高并发推理、知识问答、代码辅助、多模态推理 | 消费级或工作站型号需额外确认驱动、散热、稳定性和数据中心交付要求 |
| Huawei Ascend | Ascend910 | Ascend910B、Ascend910C | 国产化、信创、本地化推理、批量推理 |需结合 CANN、MindIE、模型适配和镜像版本确认 |
| Enflame | Enflame |106 | 国产加速卡纳管与适配 |需结合驱动、推理框架和模型适配验证 |
| Biren | Biren | S60 | 国产加速卡纳管与适配 |需结合驱动、推理框架和模型适配验证 |

## 6. AGIOne 纳管算力节点操作系统要求

| 节点类型 | 支持建议 | 限制条件 |
| --- | --- | --- |
| NVIDIA GPU 算力节点 | Linux服务器，建议使用与 NVIDIA 驱动、CUDA、容器运行时和 GPU Operator兼容的发行版 |具体 OS版本需结合驱动和交付包确认 |
| Ascend NPU 算力节点 | Linux服务器，需满足 Ascend 驱动、CANN、MindIE 或相关推理栈要求 |需按 Ascend 软件栈版本和模型适配情况确认 |
| 国产加速卡算力节点 | Linux服务器，需满足对应厂商驱动、运行时和推理框架要求 | 不同国产芯片生态差异较大，需项目级验证 |
| Kubernetes Worker 节点 | 节点 Ready、可调度、容器运行时正常、驱动插件正常、网络和存储可用 | 同一 Kubernetes 集群建议管理相同 CPU 架构，避免异构架构混入导致调度不稳定 |

## 7. CUDA 支持说明

| 项目 | 当前口径 | 限制条件 |
| --- | --- | --- |
| CUDA 固定版本声明 | 当前文档不声明固定 CUDA版本 | CUDA需结合 NVIDIA GPU 型号、驱动版本、容器镜像、推理引擎和 AGIOne交付包兼容矩阵确认 |
| NVIDIA GPU 推理 | 支持基于 NVIDIA GPU 的模型推理和纳管 | 不同模型对 CUDA、显存、TensorRT-LLM、vLLM、SGLang 等依赖不同 |
| CUDA 与模型部署 | CUDA 是 NVIDIA 模型部署链路中的关键依赖 | 支持某 GPU 型号不等于支持任意 CUDA版本或任意模型镜像 |
| CUDA 与生产交付 |生产交付前需冻结 GPU 驱动、CUDA、容器镜像和推理引擎版本 | 不建议在生产中混用未验证 CUDA / Driver / Runtime组合 |

## 8. AGIOne 纳管算力平台支持矩阵

| 平台类型 | 支持状态 |说明 | 限制条件 |
| --- | --- | --- | --- |
| 阿里云 | 支持 | 纳管阿里云 GPU/NPU 算力节点 | 需确认账号权限、网络互通、密钥管理 |
| AWS | 支持 | 纳管 AWS GPU 算力节点 | 需确认 Region、IAM 权限、API 密钥 |
| Google Cloud | 支持 | 纳管 Google Cloud GPU 算力节点 | 需确认项目权限、API 启用 |
| AGIOne 异构卡纳管（算模方） | 支持 | 纳管算模方平台算力节点 | 需确认平台接口和接入方式 |
| 华为云 | 暂不支持 | 华为云算力平台接入 | 未来版本规划中 |

## 9. 模型能力支持矩阵

| 能力类型 | 支持状态 |说明 | 限制条件 |
| --- | --- | --- | --- |
| 文本生成 / Chat | 支持 | 支持通用对话、问答、总结、代码辅助等文本生成能力 |受模型上下文长度、显存、吞吐和推理引擎影响 |
| Reasoning / 思考模型 | 支持 | 支持 DeepSeek-R1、Qwen thinking、Kimi thinking 等推理模型 | 推理模型通常有更高时延和 token 消耗，需要容量评估 |
| 多模态 / Vision-Language | 支持 | 支持 DeepSeek-VL2、Qwen VL 等视觉语言模型 |依赖模型镜像、视觉预处理、显存和推理框架支持 |
| OCR | 支持 | 支持 DeepSeek-OCR、DeepSeek-OCR-2 等 OCR 模型 | OCR 效果和吞吐依赖图片质量、模型版本和推理资源 |
| Embedding | 支持 | 支持 qwen3-embedding-8b 等向量模型 | RAG 场景需结合向量库、chunking、权限过滤和召回策略 |
| Reranker | 支持 | 支持 qwen3-reranker-8b 等重排序模型 | 增加召回质量的同时会增加请求链路时延 |
| RAG（规划中） | 支持 | 支持知识库增强问答、文档检索、上下文注入 |需治理知识权限、数据切分、向量化、召回和审计 |
| Function Calling / Tool Use（规划中） | 支持 | 支持工具调用和智能体编排场景 |需确认模型协议、工具 schema、权限和执行审计 |
| Agent / Workflow | 支持 | 支持将模型、知识、工具和人工节点组合为智能工作流 |依赖 Agent Builder、工具集成和企业权限体系 |
| OpenAI-compatible API | 支持 | 支持 OpenAI 风格 Chat Completions、Responses、Embeddings 等接口形态 |具体接口范围需按产品版本确认 |
| Anthropic-compatible API | 条件支持 | 可用于 Anthropic Messages 等协议适配场景 |需按产品版本、上游模型和协议策略确认 |
| SSE 流式输出 | 支持 | 支持流式返回、usage 保留和事件流处理 | 不同上游 provider 的 usage 字段和事件格式可能存在差异 |
| 聚合模型路由 | 支持 | 支持多后端实例统一模型名、动态路由、熔断、探活恢复 | 不同模型能力、上下文长度、工具调用能力不一致时需要策略约束 |
|计量计费 | 支持 | 支持 token、调用次数、推理时长、多模态维度等计量 |计费规则、License 和 Credential 抽象需按商业规则确认 |

## 10. On-prem 快速部署模型清单

### 10.1 DeepSeek

| 系列 | 支持模型 |
| --- | --- |
| DeepSeek-R1 系列 | DeepSeek-R1、DeepSeek-R1-0528、DeepSeek-R1-Distill-Llama-70B、DeepSeek-R1-Distill-Qwen-32B、DeepSeek-R1-Distill-Qwen-14B、DeepSeek-R1-Distill-Qwen-7B |
| DeepSeek-V3 系列 | DeepSeek-V3、DeepSeek-V3-0324、DeepSeek-V3.1、DeepSeek-V3.1-Terminus、DeepSeek-V3.2 |
| DeepSeek-VL2 系列 | DeepSeek-VL2 |
| DeepSeek-OCR | DeepSeek-OCR、DeepSeek-OCR-2 |

### 10.2 Qwen

| 系列 | 支持模型 |
| --- | --- |
| Qwen2.5 系列 | Qwen2.5-7B-Instruct、Qwen2.5-14B-Instruct、Qwen2.5-32B-Instruct、Qwen2.5-72B-Instruct |
| Qwen3 系列 | qwen3-next-80b-a3b-thinking、qwen3-next-80b-a3b-instruct、qwen3-235b-a22b-thinking-2507、qwen3-235b-a22b-instruct-2507、qwen3-30b-a3b-thinking-2507、qwen3-30b-a3b-instruct-2507、qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwq-32b |
| Qwen3.5 系列 | qwen3.5-397b-a17b、qwen3.5-122b-a10b、qwen3.5-27b、qwen3.5-35b-a3b、qwen3.5-9b |
| Qwen3 VL 系列 | qwen3-vl-235b-a22b-thinking、qwen3-vl-235b-a22b-instruct、qwen3-vl-32b-thinking、qwen3-vl-32b-instruct、qwen3-vl-30b-a3b-thinking、qwen3-vl-30b-a3b-instruct、qwen3-vl-8b-thinking、qwen3-vl-8b-instruct、qwen2.5-vl-72b-instruct、qwen2.5-vl-32b-instruct、qwen2.5-vl-7b-instruct |
| 嵌入重排 | qwen3-embedding-8b、qwen3-reranker-8b |

### 10.3 Kimi

| 系列 | 支持模型 |
| --- | --- |
| Kimi2 系列 | kimi-k2-thinking、Moonshot-Kimi-K2-Instruct、kimi-k2.5 |

### 10.4 MiniMax

| 系列 | 支持模型 |
| --- | --- |
| MiniMax M2 系列 | MiniMax-M2.7、MiniMax-M2.5、MiniMax-M2.1 |

### 10.5 GLM

| 系列 | 支持模型 |
| --- | --- |
| GLM4 系列 | glm-4.7、glm-4.6、glm-4.5、glm-4.5-air |
| GLM5 系列 | glm-5、glm-5.1 |

### 10.6 Llama

| 系列 | 支持模型 |
| --- | --- |
| Llama3 系列 | Llama3-8B-Instruct、Llama3.1-8B-Instruct、Llama3.2-8B-Instruct |

## 11. 部署与运行限制条件

| 限制项 |说明 | 建议 |
| --- | --- | --- |
| 管理节点与算力节点角色不同 | 管理节点不要求 GPU/XPU；算力节点至少需要1 个 XPU/GPU/NPU | 部署设计中明确管理面和算力面边界 |
|资源规格存在多口径 | All-in-One 推荐8C/16GiB/200GiB；生产管理节点要求可达 >=16C/>=16GiB，至少3 节点 | 按部署形态区分 all-in-one、host-mode 多节点、生产管理面 |
|端口入口存在多口径 | 文档中存在 `443`、`18090`、`80`、`8089` 等入口 | 区分外部 HTTPS入口、门户/API入口、Nginx入口和作业访问代理入口 |
| 离线交付依赖完整包 | 缺少 bundle、镜像、离线 Python、checksum 或 Docker/Compose资源会阻塞部署 | 部署前执行完整性交付物校验 |
| 同构架构优先 | 同一 Kubernetes 集群建议管理相同 CPU 架构 | 异构 CPU 架构建议拆分集群或资源池 |
| 时间同步要求 | 多节点部署要求 NTP 或等效时间同步 | 时钟偏差建议控制在1 秒以内 |
|生产资源冗余 | 高并发和核心业务需要预留资源头寸 |生产建议预留20%-30%资源冗余 |

## 12. 模型部署限制条件

| 限制项 |说明 | 建议 |
| --- | --- | --- |
| 芯片兼容不等于模型验证 | 支持某芯片纳管，不代表该芯片已验证所有模型、推理引擎和量化方案 | 建立模型-芯片-驱动-推理引擎验证矩阵 |
| 超大模型资源门槛高 | 如 qwen3.5-397b、qwen3-235b、DeepSeek-V3 等需要高显存、多卡或并行策略 | 部署前评估显存、卡数、并行、KV Cache、上下文长度和吞吐 |
| 多模态和 OCR依赖额外链路 |视觉模型和 OCR 模型依赖图像预处理、模型镜像和推理框架支持 | 按模型类型单独验证端到端链路 |
| Embedding / Reranker影响 RAG 延迟 | 增加向量化和重排序后会增加链路耗时 | 对 RAG 场景单独压测召回质量、时延和并发 |
| Reasoning 模型消耗更高 | 思考模型通常输出更长、耗时更高、token 消耗更大 | 单独设置限流、额度和成本策略 |
| 聚合模型能力需对齐 | 聚合模型下不同子模型的上下文、工具调用、多模态、价格和协议能力可能不同 | 路由策略中增加能力约束和降级策略 |

## 13. 网络、存储与高可用限制条件

| 限制项 |说明 | 建议 |
| --- | --- | --- |
| RDMA 要求按场景区分 | 单卡推理可不强依赖 RDMA；多机多卡推理或训练建议100Gbps以上 RDMA | 按模型规模、并行策略和吞吐目标设计网络 |
|共享存储依赖模型规模 | 模型权重、镜像、日志、MinIO、数据库和中间件需要持久化存储 | 提前规划块存储、NAS、NFS、Ceph 或 RWX 存储 |
| 云原生部署依赖 StorageClass | 数据库和中间件持久卷需要 RWO，部分共享数据需要 RWX | 部署前验证 PVC 创建、挂载和备份恢复 |
| 镜像仓库必须可达 | 云原生部署要求所有节点可访问镜像仓库 | 提前验证 registry、认证 Secret 和 image pull |
| Ingress / DNS / TLS影响访问 | 云原生入口依赖域名解析、证书和入口控制器 | 上线前完成外部访问、内部解析和证书验证 |
| 高可用需要多节点设计 | 单机部署无法提供完整高可用 |生产建议采用多管理节点、数据库主备、备份和回滚机制 |

## 14. 待确认事项

| 待确认项 | 当前状态 | 建议动作 |
| --- | --- | --- |
| CUDA版本矩阵 | 当前知识库未声明固定 CUDA版本 | 根据交付包、GPU驱动、镜像和推理引擎补充 CUDA 矩阵 |
| GPU 驱动版本矩阵 | 当前只明确芯片型号，未给出驱动版本 | 建立 GPU型号-Driver-CUDA-推理引擎-镜像版本矩阵 |
| Ascend 软件栈版本 | 当前只明确 Ascend910B/910C 支持 | 补充 CANN、MindIE、驱动和模型适配版本 |
| 模型显存与卡数要求 | 当前清单只列模型名称 | 按模型规模补充 FP16/BF16/INT8/INT4、张量并行、最小卡数 |
| API 协议支持范围 | 白皮书提到 OpenAI / Anthropic 等协议 | 按正式产品版本确认接口范围和字段兼容性 |
|端口口径 | 存在 `443`、`18090`、`80`、`8089` 等多种表达 |形成正式网络端口规划表