# AGIOne Product Support Matrix and Known Limitations

## 1. Document Overview

This document specifies AGIOne's current product support scope, deployment environments, managed compute nodes, managed compute platforms, model capabilities, on-premises rapid-deployment model catalog, and known limitations.

This document constitutes a draft support matrix, applicable to product introductions, presales proposals, delivery assessments, and pre-deployment technical confirmations. Prior to actual project delivery, the final support scope should be confirmed by referencing the official release notes, delivery package compatibility matrix, driver versions, inference engine versions, and on-site environment assessment results.

## 2. Overall Support Scope

| Scope | Support Description | Constraints |
| --- | --- | --- |
| Management Node Deployment | Supports All-in-One, local multi-node, Kubernetes/cloud-native, private deployment, and offline or low-connectivity delivery | Specific specifications must be confirmed based on deployment form, managed scale, and delivery package version |
| Compute Node Management | Supports NVIDIA Hopper / Ampere / Ada, Ascend 910B/910C, Enflame 106, Biren S60 | Chip manageability does not imply that all model, driver, CUDA, and inference engine combinations have been validated |
| Compute Platform Management | Supports Alibaba Cloud, AWS, Google Cloud, AGIOne heterogeneous card management (PowerOne), and other cloud platforms; Huawei Cloud not currently supported | Account permissions, network connectivity, API credentials, and security policies for different cloud platforms require separate evaluation |
| Model Service Capabilities | Supports text generation, reasoning, multimodal, OCR, embedding, reranking, RAG（Planning）, function calling（Planning）, aggregate models, streaming output, and usage metering | Specific capabilities depend on the model itself, inference engine, protocol adaptation, and product version |
|Rapid-Deployment Models | Supports DeepSeek, Qwen, Kimi, MiniMax, GLM, Llama, and other model series | Ultra-large models require evaluation of VRAM, parallelism strategy, quantization method, storage, and network conditions |

## 3. AGIOne Management Node Deployment Support Matrix

| Deployment Form | Support Status | Typical Environment | Key Requirements | Constraints |
| --- | --- | --- | --- | --- |
| All-in-One Single-Node Deployment | Supported | Single Linux physical server or VM | Recommended: 8C / 16GiB / 200GiB available disk; root or equivalent privileges; Docker / Compose | Suitable for demonstrations, testing, PoC, or small-scale deployments; not recommended for high-availability production workloads |
| Local Host-Mode Multi-Node Deployment | Supported | Multiple Linux physical servers or VMs | Minimum 4 machines: 2 application nodes, 1 middleware node, 1 database standby node; fixed node IPs; SSH reachability; time synchronization | Historical data, port occupancy, directory permissions, and database primary-standby risks must be confirmed before deployment |
| Kubernetes / Cloud-Native Deployment | Supported | Existing Kubernetes cluster or AGIOne-delivered kube-cluster | kubeconfig available; nodes Ready; sufficient namespace permissions; image registry, StorageClass, Ingress, DNS, and certificates ready | Kubernetes version must be confirmed against the delivery package compatibility matrix; storage, CNI, and Ingress differences may affect delivery |
| Private Deployment | Supported | Enterprise intranet, IDC, private cloud, dedicated cloud | Management plane, model services, resource management, and unified entry point deployable; supports data residency compliance scenarios | Network isolation, offline packages, certificates, DNS, proxy, security baseline, and audit policies require on-site evaluation |
| Offline or Low-Connectivity Deployment | Supported | No public network or restricted public network environment | Offline bundle, offline Python, image packages, checksum verification, Docker/Compose installation or repair capability | Missing offline resources, failed image imports, or unreachable registries will block deployment |

## 4. Management Node Operating System and Component Support

| Category | Support Recommendation | Constraints |
| --- | --- | --- |
| Operating System | Ubuntu 22.04 recommended; Ubuntu 20.04 within acceptable recommendation scope; CentOS/Rocky 7.x/8.x conditionally supported; Kylin/UOS requires evaluation | Production deployments should follow official release notes, delivery package compatibility matrix, and on-site validation results |
| Docker | Docker 24.x+ recommended | Must be compatible with the OS, kernel, image packages, and offline installation method |
| Kubernetes | Kubernetes 1.24–1.29 recommended | Must be validated in conjunction with the delivery package, GPU/NPU plugins, CNI, CSI, and Ingress Controller |
| Helm | Helm 3.10+ recommended | Applicable only to Helm or chart-based delivery forms |
| Middleware | MariaDB, Redis, Nacos, Kafka, MinIO, OpenResty/Nginx | Port conflicts, storage persistence, backup and recovery, and security baselines must be confirmed before deployment |

## 5. AGIOne Managed Compute Node Support Matrix

| Vendor | Architecture / Series | Supported Models | Typical Use Cases | Constraints |
| --- | --- | --- | --- | --- |
| NVIDIA | Hopper | H800, H200, H100, H20 | Flagship foundation model inference, long-context, multi-GPU parallelism, high-throughput serving | Must be validated against driver, CUDA, inference engine, VRAM, and network configuration |
| NVIDIA | Ampere | A100, A800, A40, A30, A10, RTX A6000, RTX A5000, RTX A4000, RTX A2000, RTX 3090, RTX 3060 | General inference, legacy compute reuse, small-to-medium model deployment | Different models have significantly varying VRAM capacities; cannot directly equate support for all model specifications |
| NVIDIA | Ada | L40, L40S, L20, L20S, L4, L2, RTX 6000, RTX 5000, RTX 4500, RTX 4000, RTX 2000, RTX 4090, RTX 4090D | Medium-scale high-concurrency inference, knowledge Q&A, code assistance, multimodal inference | Consumer-grade or workstation models require additional confirmation of driver, cooling, stability, and data-center deployment requirements |
| Huawei Ascend | Ascend 910 | Ascend 910B, Ascend 910C | Domestic compliance, localized inference, batch inference | Must be confirmed against CANN, MindIE, model adaptation, and image versions |
| Enflame | Enflame | 106 | Domestic accelerator card management and adaptation | Must be validated against driver, inference framework, and model adaptation |
| Biren | Biren | S60 | Domestic accelerator card management and adaptation | Must be validated against driver, inference framework, and model adaptation |

## 6. AGIOne Managed Compute Node Operating System Requirements

| Node Type | Support Recommendation | Constraints |
| --- | --- | --- |
| NVIDIA GPU Compute Nodes | Linux servers; recommended to use distributions compatible with NVIDIA drivers, CUDA, container runtime, and GPU Operator | Specific OS versions must be confirmed against drivers and the delivery package |
| Ascend NPU Compute Nodes | Linux servers; must satisfy Ascend driver, CANN, MindIE, or related inference stack requirements | Must be confirmed based on Ascend software stack version and model adaptation status |
| Domestic Accelerator Compute Nodes | Linux servers; must satisfy corresponding vendor driver, runtime, and inference framework requirements | Different domestic chip ecosystems vary significantly; project-level validation is required |
| Kubernetes Worker Nodes | Nodes Ready, schedulable, container runtime operational, driver plugins functional, network and storage available | The same Kubernetes cluster is recommended to manage identical CPU architectures; heterogeneous architectures should be avoided to prevent scheduling instability |

## 7. CUDA Support Notes

| Item | Current Position | Constraints |
| --- | --- | --- |
| Fixed CUDA Version Statement | This document does not declare a fixed CUDA version | CUDA must be confirmed in combination with NVIDIA GPU model, driver version, container image, inference engine, and AGIOne delivery package compatibility matrix |
| NVIDIA GPU Inference | Supports NVIDIA GPU-based model inference and management | Different models have varying dependencies on CUDA, VRAM, TensorRT-LLM, vLLM, SGLang, etc. |
| CUDA and Model Deployment | CUDA is a critical dependency in the NVIDIA model deployment chain | Support for a given GPU model does not equate to support for arbitrary CUDA versions or arbitrary model images |
| CUDA and Production Delivery | GPU driver, CUDA, container image, and inference engine versions must be frozen prior to production delivery | Mixing unvalidated CUDA / Driver / Runtime combinations in production is not recommended |

## 8. AGIOne Managed Compute Platform Support Matrix

| Platform Type | Support Status | Description | Constraints |
| --- | --- | --- | --- |
| Alibaba Cloud | Supported | Manages Alibaba Cloud GPU/NPU compute nodes | Must confirm account permissions, network connectivity, and credential management |
| AWS | Supported | Manages AWS GPU compute nodes | Must confirm Region, IAM permissions, and API credentials |
| Google Cloud | Supported | Manages Google Cloud GPU compute nodes | Must confirm project permissions and API enablement |
| AGIOne Heterogeneous Card Management (PowerOne) | Supported | Manages PowerOne platform compute nodes | Must confirm platform interface and access method |
| Huawei Cloud | Not Currently Supported | Huawei Cloud compute platform access | Planned for future release |

## 9. Model Capability Support Matrix

| Capability Type | Support Status | Description | Constraints |
| --- | --- | --- | --- |
| Text Generation / Chat | Supported | Supports general conversation, Q&A, summarization, code assistance, and other text generation capabilities | Affected by model context length, VRAM, throughput, and inference engine |
| Reasoning / Thinking Models | Supported | Supports reasoning models such as DeepSeek-R1, Qwen Thinking, Kimi Thinking | Reasoning models typically incur higher latency and token consumption, requiring capacity assessment |
| Multimodal / Vision-Language | Supported | Supports vision-language models such as DeepSeek-VL2, Qwen VL | Depends on model images, visual preprocessing, VRAM, and inference framework support |
| OCR | Supported | Supports OCR models such as DeepSeek-OCR, DeepSeek-OCR-2 | OCR quality and throughput depend on image quality, model version, and inference resources |
| Embedding | Supported | Supports vector models such as qwen3-embedding-8b | RAG scenarios require combining vector database, chunking, permission filtering, and recall strategies |
| Reranker | Supported | Supports reranking models such as qwen3-reranker-8b | Improves recall quality at the cost of increased request chain latency |
| RAG（Planning） | Supported | Supports knowledge base-augmented Q&A, document retrieval, and context injection | Requires governance of knowledge permissions, data chunking, vectorization, recall, and auditing |
| Function Calling / Tool Use（Planning） | Supported | Supports tool calling and agent orchestration scenarios | Requires confirmation of model protocol, tool schema, permissions, and execution auditing |
| Agent / Workflow | Supported | Supports composing models, knowledge, tools, and human nodes into intelligent workflows | Depends on Agent Builder, tool integrations, and enterprise permission systems |
| OpenAI-Compatible API | Supported | Supports OpenAI-style Chat Completions, Responses, Embeddings, and other interface forms | Specific interface scope must be confirmed by product version |
| Anthropic-Compatible API | Conditionally Supported | Can be used for Anthropic Messages and other protocol adaptation scenarios | Must be confirmed by product version, upstream model, and protocol strategy |
| SSE Streaming Output | Supported | Supports streaming responses, usage preservation, and event stream processing | Different upstream providers may have variations in usage fields and event formats |
| Aggregate Model Routing | Supported | Supports unified model naming, dynamic routing, circuit breaking, and health-probe-based recovery across multiple backend instances | Capability constraints and degradation strategies are required when model capabilities, context lengths, tool-calling abilities, pricing, or protocols are inconsistent |
| Metering and Billing | Supported | Supports metering across tokens, call counts, inference duration, multimodal dimensions, etc. | Billing rules, License, and Credential abstraction must be confirmed against commercial policies |

## 10. On-Premises Rapid-Deployment Model Catalog

### 10.1 DeepSeek

| Series | Supported Models |
| --- | --- |
| DeepSeek-R1 Series | DeepSeek-R1, DeepSeek-R1-0528, DeepSeek-R1-Distill-Llama-70B, DeepSeek-R1-Distill-Qwen-32B, DeepSeek-R1-Distill-Qwen-14B, DeepSeek-R1-Distill-Qwen-7B |
| DeepSeek-V3 Series | DeepSeek-V3, DeepSeek-V3-0324, DeepSeek-V3.1, DeepSeek-V3.1-Terminus, DeepSeek-V3.2 |
| DeepSeek-VL2 Series | DeepSeek-VL2 |
| DeepSeek-OCR | DeepSeek-OCR, DeepSeek-OCR-2 |

### 10.2 Qwen

| Series | Supported Models |
| --- | --- |
| Qwen2.5 Series | Qwen2.5-7B-Instruct, Qwen2.5-14B-Instruct, Qwen2.5-32B-Instruct, Qwen2.5-72B-Instruct |
| Qwen3 Series | qwen3-next-80b-a3b-thinking, qwen3-next-80b-a3b-instruct, qwen3-235b-a22b-thinking-2507, qwen3-235b-a22b-instruct-2507, qwen3-30b-a3b-thinking-2507, qwen3-30b-a3b-instruct-2507, qwen3-235b-a22b, qwen3-32b, qwen3-30b-a3b, qwen3-14b, qwen3-8b, qwq-32b |
| Qwen3.5 Series | qwen3.5-397b-a17b, qwen3.5-122b-a10b, qwen3.5-27b, qwen3.5-35b-a3b, qwen3.5-9b |
| Qwen3 VL Series | qwen3-vl-235b-a22b-thinking, qwen3-vl-235b-a22b-instruct, qwen3-vl-32b-thinking, qwen3-vl-32b-instruct, qwen3-vl-30b-a3b-thinking, qwen3-vl-30b-a3b-instruct, qwen3-vl-8b-thinking, qwen3-vl-8b-instruct, qwen2.5-vl-72b-instruct, qwen2.5-vl-32b-instruct, qwen2.5-vl-7b-instruct |
| Embedding / Reranking | qwen3-embedding-8b, qwen3-reranker-8b |

### 10.3 Kimi

| Series | Supported Models |
| --- | --- |
| Kimi2 Series | kimi-k2-thinking, Moonshot-Kimi-K2-Instruct, kimi-k2.5 |

### 10.4 MiniMax

| Series | Supported Models |
| --- | --- |
| MiniMax M2 Series | MiniMax-M2.7, MiniMax-M2.5, MiniMax-M2.1 |

### 10.5 GLM

| Series | Supported Models |
| --- | --- |
| GLM4 Series | glm-4.7, glm-4.6, glm-4.5, glm-4.5-air |
| GLM5 Series | glm-5, glm-5.1 |

### 10.6 Llama

| Series | Supported Models |
| --- | --- |
| Llama3 Series | Llama3-8B-Instruct, Llama3.1-8B-Instruct, Llama3.2-8B-Instruct |

## 11. Deployment and Runtime Constraints

| Constraint | Description | Recommendation |
| --- | --- | --- |
| Management and compute node roles are distinct | Management nodes do not require GPU/XPU; compute nodes require at least 1 XPU/GPU/NPU | Clearly define management plane and compute plane boundaries in deployment design |
| Resource specifications have multiple interpretations | All-in-One recommendation is 8C/16GiB/200GiB; production management node requirements can reach >=16C/>=16GiB with a minimum of 3 nodes | Differentiate between All-in-One, host-mode multi-node, and production management plane by deployment form |
| Port entry points have multiple interpretations | Ports such as `443`, `18090`, `80`, `8089` appear in the documentation | Distinguish between external HTTPS entry, portal/API entry, Nginx entry, and job access proxy entry |
| Offline delivery depends on complete packages | Missing bundle, images, offline Python, checksum, or Docker/Compose resources will block deployment | Execute integrity verification of delivery artifacts before deployment |
| Homogeneous architecture is preferred | The same Kubernetes cluster is recommended to manage identical CPU architectures | Heterogeneous CPU architectures should be split across clusters or resource pools |
| Time synchronization requirements | Multi-node deployments require NTP or equivalent time synchronization | Clock skew should preferably be kept within 1 second |
| Production resource headroom | High-concurrency and core business workloads require reserved resource headroom | Production deployments should reserve 20%–30% resource headroom |

## 12. Model Deployment Constraints

| Constraint | Description | Recommendation |
| --- | --- | --- |
| Chip compatibility does not equal model validation | Support for chip management does not imply that all models, inference engines, and quantization schemes for that chip have been validated | Establish a model-chip-driver-inference engine validation matrix |
| Ultra-large models have high resource thresholds | Models such as qwen3.5-397b, qwen3-235b, DeepSeek-V3 require high VRAM, multi-GPU, or parallelism strategies | Evaluate VRAM, card count, parallelism, KV Cache, context length, and throughput before deployment |
| Multimodal and OCR depend on additional pipelines | Vision models and OCR models depend on image preprocessing, model images, and inference framework support | Separately validate end-to-end pipelines by model type |
| Embedding / Reranker affect RAG latency | Adding vectorization and reranking increases chain latency | Conduct separate stress testing on RAG scenarios for recall quality, latency, and concurrency |
| Reasoning models have higher consumption | Thinking models typically produce longer outputs with higher latency and token consumption | Configure separate rate limiting, quota, and cost policies |
| Aggregate model capabilities must be aligned | Sub-models within an aggregate model may differ in context length, tool-calling ability, multimodal capability, pricing, and protocol support | Add capability constraints and degradation strategies to routing policies |

## 13. Network, Storage, and High-Availability Constraints

| Constraint | Description | Recommendation |
| --- | --- | --- |
| RDMA requirements vary by scenario | Single-GPU inference does not strictly require RDMA; multi-node, multi-GPU inference or training recommends 100 Gbps+ RDMA | Design network based on model scale, parallelism strategy, and throughput objectives |
| Shared storage depends on model scale | Model weights, images, logs, MinIO, databases, and middleware require persistent storage | Plan block storage, NAS, NFS, Ceph, or RWX storage in advance |
| Cloud-native deployment depends on StorageClass | Databases and middleware persistent volumes require RWO; some shared data requires RWX | Validate PVC creation, mounting, and backup recovery before deployment |
| Image registry must be reachable | Cloud-native deployment requires all nodes to have access to the image registry | Validate registry connectivity, authentication Secrets, and image pull in advance |
| Ingress / DNS / TLS affect accessibility | Cloud-native entry depends on domain resolution, certificates, and ingress controllers | Complete external access, internal resolution, and certificate validation before go-live |
| High availability requires multi-node design | Single-node deployment cannot provide full high availability | Production deployments should adopt multi-node management, database primary-standby, backup, and rollback mechanisms |

## 14. Pending Confirmation Items

| Pending Item | Current Status | Recommended Action |
| --- | --- | --- |
| CUDA version matrix | The current knowledge base does not declare a fixed CUDA version | Supplement the CUDA matrix based on delivery package, GPU driver, images, and inference engines |
| GPU driver version matrix | Currently only specifies chip models without driver versions | Establish a GPU model–Driver–CUDA–Inference Engine–Image version matrix |
| Ascend software stack versions | Currently only confirms Ascend 910B/910C support | Supplement CANN, MindIE, driver, and model adaptation versions |
| Model VRAM and card count requirements | The current catalog only lists model names | Supplement FP16/BF16/INT8/INT4, tensor parallelism, and minimum card counts by model scale |
| API protocol support scope | The white paper mentions OpenAI / Anthropic and other protocols | Confirm interface scope and field compatibility against the official product version |
| Port specifications | Multiple expressions such as `443`, `18090`, `80`, `8089` exist across documentation | Produce an official network port planning table