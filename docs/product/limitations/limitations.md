# AGIOne Product Limitations

## 1. Document Overview

This document describes the limitations, risk items, and pending confirmation items within the current AGIOne product support scope.

## 2. General Limitations

| Scope | Limitation |
| --- | --- |
| Management Node Deployment | Specific specifications must be confirmed based on deployment form, management scale, and delivery package version |
| Compute Node Management | Chip manageability does not guarantee all combinations of models, drivers, CUDA, and inference engines have been validated |
| Compute Platform Management | Account permissions, network connectivity, API keys, and security policies vary across different cloud platforms and require separate evaluation |
| Model Service Capabilities | Specific capabilities depend on the model itself, inference engine, protocol adaptation, and product version |
| Rapid Deployment Models | Extra-large models require evaluation of VRAM, parallel strategy, quantization method, storage, and network conditions |

## 3. Management Node Deployment Limitations

| Deployment Form | Limitation |
| --- | --- |
| All-in-One Single-Node Deployment | Suitable for demonstrations, testing, PoC, or small-scale deployments; not recommended for high-availability production workloads |
| Local Host-mode Multi-Node Deployment | Historical data, port conflicts, directory permissions, and database primary/replica risks must be confirmed before deployment |
| Kubernetes / Cloud-Native Deployment | Kubernetes version must be confirmed against delivery package compatibility matrix; differences in storage, CNI, and Ingress affect delivery |
| Private Deployment | Network isolation, offline packages, certificates, DNS, proxies, security baselines, and audit policies require on-site evaluation |
| Offline or Low-Network Deployment | Missing offline resources, failed image imports, or unreachable repositories may block deployment |

## 4. Management Node Operating System and Component Limitations

| Category | Limitation |
| --- | --- |
| Operating System | Production environments should rely on official release notes, delivery package compatibility matrix, and on-site validation results |
| Docker | Must match operating system, kernel, image package, and offline installation method |
| Kubernetes | Must be validated against delivery package, GPU/NPU plugins, CNI, CSI, and Ingress Controller |
| Helm | Only applicable to Helm or chart-based delivery forms |
| Middleware | Port conflicts, storage persistence, backup/recovery, and security baselines must be confirmed before deployment |

## 5. Managed Compute Node Limitations

| Vendor | Architecture / Series | Limitation |
| --- | --- | --- |
| NVIDIA | Hopper | Requires validation of driver, CUDA, inference engine, VRAM, and network |
| NVIDIA | Ampere | Different models have varying VRAM specifications; cannot directly equate support for all model sizes |
| NVIDIA | Ada | Consumer or workstation models require additional confirmation of driver, cooling, stability, and data center delivery requirements |
| Huawei Ascend | Ascend910 | Requires confirmation of CANN, MindIE, model adaptation, and image version |
| Enflame | Enflame | Requires validation of driver, inference framework, and model adaptation |
| Biren | Biren | Requires validation of driver, inference framework, and model adaptation |

## 6. Compute Node Operating System Limitations

| Node Type | Limitation |
| --- | --- |
| NVIDIA GPU Compute Nodes | Specific OS version must be confirmed against driver and delivery package |
| Ascend NPU Compute Nodes | Must be confirmed based on Ascend software stack version and model adaptation status |
| Domestic Accelerator Compute Nodes | Different domestic chip ecosystems vary significantly; project-level validation required |
| Kubernetes Worker Nodes | The same Kubernetes cluster is recommended to manage identical CPU architectures; mixing heterogeneous architectures may cause scheduling instability |

## 7. CUDA Limitations

| Item | Limitation |
| --- | --- |
| CUDA Fixed Version Declaration | CUDA must be confirmed against NVIDIA GPU model, driver version, container image, inference engine, and AGIOne delivery package compatibility matrix |
| NVIDIA GPU Inference | Different models have varying dependencies on CUDA, VRAM, TensorRT-LLM, vLLM, SGLang, etc. |
| CUDA and Model Deployment | Support for a GPU model does not equal support for arbitrary CUDA versions or arbitrary model images |
| CUDA and Production Delivery | Mixing unvalidated CUDA/Driver/Runtime combinations in production is not recommended |

## 8. Managed Compute Platform Limitations

| Platform Type | Limitation |
| --- | --- |
| Alibaba Cloud | Account permissions, network connectivity, and key management must be confirmed |
| AWS | Region, IAM permissions, and API keys must be confirmed |
| Google Cloud | Project permissions and API enablement must be confirmed |
| AGIOne Heterogeneous Card Management (Compute/Model Party) | Platform interface and access method must be confirmed |
| Huawei Cloud | Currently not supported; planned for future versions |

## 9. Model Capability Limitations

| Capability Type | Limitation |
| --- | --- |
| Text Generation / Chat | Affected by model context length, VRAM, throughput, and inference engine |
| Reasoning / Thinking Models | Reasoning models typically have higher latency and token consumption; capacity evaluation required |
| Multimodal / Vision-Language | Depends on model image, visual preprocessing, VRAM, and inference framework support |
| OCR | OCR quality and throughput depend on image quality, model version, and inference resources |
| Embedding | RAG scenarios require integration with vector database, chunking, permission filtering, and recall strategy |
| Reranker | Improves recall quality but increases request chain latency |
| RAG（Planning） | Requires governance of knowledge permissions, data chunking, vectorization, recall, and auditing |
| Function Calling / Tool Use | Model protocol, tool schema, permissions, and execution auditing must be confirmed |
| Agent / Workflow | Depends on Agent Builder, tool integration, and enterprise permission system |
| OpenAI-compatible API | Specific interface scope must be confirmed by product version |
| Anthropic-compatible API | Must be confirmed by product version, upstream model, and protocol strategy |
| SSE Streaming Output | Usage fields and event formats may vary across different upstream providers |
| Aggregated Model Routing | When different models have inconsistent capabilities, context lengths, tool calling abilities, policy constraints are required |
| Metering and Billing | Billing rules, License, and Credential abstraction must be confirmed according to business rules |

## 10. Deployment and Operation Limitations

| Limitation | Description | Recommendation |
| --- | --- | --- |
| Different roles for management and compute nodes | Management nodes do not require GPU/XPU; compute nodes require at least 1 XPU/GPU/NPU | Clearly define management plane and compute plane boundaries in deployment design |
| Multiple resource specification standards | All-in-One recommends 8C/16GiB/200GiB; production management nodes require >=16C/>=16GiB, at least 3 nodes | Differentiate between all-in-one, host-mode multi-node, and production management plane |
| Multiple port entry standards | Documentation references `443`, `18090`, `80`, `8089` as entry points | Differentiate external HTTPS entry, portal/API entry, Nginx entry, and job access proxy entry |
| Offline delivery depends on complete packages | Missing bundle, images, offline Python, checksum, or Docker/Compose resources may block deployment | Perform integrity delivery validation before deployment |
| Homogeneous architecture preferred | The same Kubernetes cluster is recommended to manage identical CPU architectures | Heterogeneous CPU architectures should split clusters or resource pools |
| Time synchronization requirements | Multi-node deployments require NTP or equivalent time synchronization | Clock drift recommended to be controlled within 1 second |
| Production resource redundancy | High concurrency and core business require reserved resource headroom | Production recommends reserving 20%-30% resource redundancy |

## 11. Model Deployment Limitations

| Limitation | Description | Recommendation |
| --- | --- | --- |
| Chip compatibility does not equal model validation | Supporting a chip for management does not mean all models, inference engines, and quantization schemes for that chip have been validated | Establish a model-chip-driver-inference engine validation matrix |
| Extra-large models have high resource thresholds | Models such as qwen3.5-397b, qwen3-235b, DeepSeek-V3 require high VRAM, multi-card, or parallel strategies | Evaluate VRAM, card count, parallelism, KV Cache, context length, and throughput before deployment |
| Multimodal and OCR depend on additional pipelines | Vision models and OCR models depend on image preprocessing, model images, and inference framework support | Validate end-to-end pipeline separately by model type |
| Embedding / Reranker affect RAG latency | Adding vectorization and reranking increases chain latency | Perform separate stress testing on recall quality, latency, and concurrency for RAG scenarios |
| Reasoning models have higher consumption | Thinking models typically output longer content with higher latency and token consumption | Set separate rate limiting, quota, and cost strategies |
| Aggregated model capabilities must be aligned | Sub-models under aggregated models may have different contexts, tool calling capabilities, prices, and protocol capabilities | Add capability constraints and degradation strategies in routing policies |

## 12. Network, Storage, and High Availability Limitations

| Limitation | Description | Recommendation |
| --- | --- | --- |
| RDMA requirements vary by scenario | Single-card inference does not strongly depend on RDMA; multi-machine multi-card inference or training recommends 100Gbps+ RDMA | Design network based on model scale, parallel strategy, and throughput targets |
| Shared storage depends on model scale | Model weights, images, logs, MinIO, databases, and middleware require persistent storage | Plan block storage, NAS, NFS, Ceph, or RWX storage in advance |
| Cloud-native deployment depends on StorageClass | Database and middleware persistent volumes require RWO; some shared data requires RWX | Validate PVC creation, mounting, and backup/recovery before deployment |
| Image registry must be reachable | Cloud-native deployment requires all nodes to access image registry | Validate registry, authentication Secret, and image pull in advance |
| Ingress / DNS / TLS affect access | Cloud-native entry depends on domain resolution, certificates, and ingress controller | Complete external access, internal resolution, and certificate validation before launch |
| High availability requires multi-node design | Single-node deployment cannot provide full high availability | Production recommends multi-management nodes, database primary/replica, backup, and rollback mechanisms |

## 13. Pending Confirmation Items

| Pending Item | Current Status | Recommended Action |
| --- | --- | --- |
| CUDA version matrix | Current knowledge base does not declare fixed CUDA versions | Supplement CUDA matrix based on delivery package, GPU driver, image, and inference engine |
| GPU driver version matrix | Currently only specifies chip model; driver versions not provided | Establish GPU model-Driver-CUDA-inference engine-image version matrix |
| Ascend software stack version | Currently only confirms Ascend910B/910C support | Supplement CANN, MindIE, driver, and model adaptation versions |
| Model VRAM and card count requirements | Current list only specifies model names | Supplement FP16/BF16/INT8/INT4, tensor parallelism, and minimum card count by model scale |
| API protocol support scope | Whitepaper mentions OpenAI / Anthropic protocols | Confirm interface scope and field compatibility by official product version |
| Port standards | Multiple expressions exist: `443`, `18090`, `80`, `8089` | Form official network port planning table |