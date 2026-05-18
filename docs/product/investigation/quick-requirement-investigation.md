# AGIOne Requirements Quick Survey Document

## 1. Document Purpose

This document is used to quickly determine whether AGIOne can meet the customer's model usage requirements and compute infrastructure management needs during initial customer meetings, pre-sales surveys, PoC project initiation, or private deployment assessment phases.

The survey focuses on two dimensions:

| Dimension | Key Questions to Confirm | Decision Impact |
| --- | --- | --- |
| Model Requirements | What model, what capabilities, how many users, expected call volume | Determines whether AGIOne already supports the model, or if listing, resource testing, protocol adaptation, or metering method development is needed |
| Compute Resources | Whether the customer already has compute resources or plans to procure them, specific CPU, memory, storage, GPU/NPU models, etc. | Determines whether customer-side compute resources are already adapted by AGIOne; if not, whether driver, image, scheduling, or management development is needed |

> 📥 **Download fillable template:** <a href="/downloads/AGIOne_Requirements_Quick_Survey.xlsx" download>Requirements Quick Survey (.xlsx)</a>

## 2. Quick Conclusion Section

| Survey Item | Conclusion | Notes |
| --- | --- | --- |
| Customer Name | `<Customer Name>` | |
| Survey Date | `<YYYY-MM-DD>` | |
| Business Scenario | `<Government/Enterprise Q&A/Code Assistant/Knowledge Base/RAG/Agent/OCR/Multimodal/Other>` | |
| Target Deployment Form | `<SaaS/Private/Local Single Node/Local Multi-Node/Kubernetes/Hybrid>` | |
| Model Support Conclusion | `<Supported/Requires Listing/Requires Testing/Requires Development/Not Currently Supported>` | |
| Compute Adaptation Conclusion | `<Adapted/Requires Validation/Requires Adaptation Development/Not Currently Supported>` | |
| PoC Recommendation | `<Ready for Direct PoC/Requires Environment Supplement/Requires Model Testing/Requires Compute Adaptation/On Hold>` | |
| Risk Level | `<Low/Medium/High>` | |
| Next Actions | `<Action, Owner, Timeline>` | |

## 3. Survey Dimension 1: Model Requirements

### 3.1 Model Usage Objectives

| Question | Customer Response | Notes |
| --- | --- | --- |
| What business problem does the customer want to solve? | `<Fill in>` | e.g., Knowledge Q&A, Code Generation, Customer Service, Document Review, OCR, Data Analysis |
| Who are the primary users? | `<Fill in>` | e.g., Development, Operations, Customer Service, Legal, Business Departments, External Customers |
| Is there a specified model? | `<Fill in>` | e.g., DeepSeek-R1, Qwen3-32B, MiniMax-M2.5, GLM-5 |
| Are alternative models acceptable? | `<Fill in>` | If the specified model is not supported, can a similar model be used as a substitute |
| Is private deployment required? | `<Fill in>` | Yes/No; Is calling third-party APIs allowed |
| Is data residency required? | `<Fill in>` | Affects SaaS, BYOK, and on-premises model deployment choices |
| Is multi-model aggregation needed? | `<Fill in>` | Whether a unified model name is needed to route to multiple backends |

### 3.2 User Scale and Call Volume

| Question | Customer Response | Notes |
| --- | --- | --- |
| Expected number of users | `<Fill in>` | Total user count |
| Daily Active Users (DAU) | `<Fill in>` | DAU |
| Concurrent Users | `<Fill in>` | Peak concurrency |
| Daily Request Volume | `<Fill in>` | Requests/day |
| Peak QPS / RPM | `<Fill in>` | Requests per second or per minute |
| Daily Token Consumption | `<Fill in>` | Input + Output |
| Peak TPM | `<Fill in>` | Tokens per minute |
| Is streaming output required | `<Fill in>` | SSE / stream |
| Acceptable Time to First Token (TTFT) | `<Fill in>` | TTFT target |
| Acceptable Total Response Latency | `<Fill in>` | P95/P99 target |
| Is rate limiting/quota required | `<Fill in>` | By user, department, model, project, time period |

### 3.3 Model Capability Requirements

| Capability | Required | Specified Model or Description | AGIOne Current Support Assessment |
| --- | --- | --- | --- |
| Text Generation / Chat | `<Yes/No>` | `<Fill in>` | Supported; model and inference resources confirmation needed |
| Reasoning / Thinking Models | `<Yes/No>` | DeepSeek-R1, Qwen thinking, Kimi thinking, etc. | Supported; higher token and latency consumption needs evaluation |
| Multimodal / Vision-Language | `<Yes/No>` | DeepSeek-VL2, Qwen VL, etc. | Supported; visual preprocessing and VRAM validation needed |
| OCR | `<Yes/No>` | DeepSeek-OCR, DeepSeek-OCR-2 | Supported; image quality and throughput validation needed |
| Embedding | `<Yes/No>` | qwen3-embedding-8b | Supported; commonly used for RAG |
| Reranker | `<Yes/No>` | qwen3-reranker-8b | Supported; improves recall quality but adds chain latency |
| RAG | `<Yes/No>` | Knowledge base Q&A, Document retrieval | Supported; knowledge permissions, chunking, vector database, and recall strategy confirmation needed |
| Function Calling / Tool Use | `<Yes/No>` | Tool calling, Function calling | Supported; model protocol and tool schema confirmation needed |
| Agent / Workflow | `<Yes/No>` | Agent, Workflow, Digital Employee | Supported; tools, permissions, and audit boundary confirmation needed |
| OpenAI-compatible API | `<Yes/No>` | Chat Completions, Responses, Embeddings | Supported; specific fields confirmed by version |
| Anthropic-compatible API | `<Yes/No>` | Messages API | Conditionally supported; subject to product version and protocol strategy confirmation |
| Usage Metering | `<Yes/No>` | Tokens, Call counts, Duration, Multimodal dimensions | Supported; complex metering requires separate confirmation |

### 3.4 Heterogeneous Card Management and Rapid Deployment Model Survey

| Vendor | Customer Selected Model | On Current Rapid Deployment List | Items Requiring Testing or Development |
| --- | --- | --- | --- |
| DeepSeek | `<Fill in>` | DeepSeek-R1, R1-0528, R1-Distill-Llama-70B, R1-Distill-Qwen-32B/14B/7B, V3, V3-0324, V3.1, V3.1-Terminus, V3.2, VL2, OCR, OCR-2 | `<Fill in>` |
| Qwen | `<Fill in>` | Qwen2.5-7B/14B/32B/72B-Instruct, Qwen3 series, Qwen3.5 series, Qwen3 VL series, qwen3-embedding-8b, qwen3-reranker-8b | `<Fill in>` |
| Kimi | `<Fill in>` | kimi-k2-thinking, Moonshot-Kimi-K2-Instruct, kimi-k2.5 | `<Fill in>` |
| MiniMax | `<Fill in>` | MiniMax-M2.7, MiniMax-M2.5, MiniMax-M2.1 | `<Fill in>` |
| GLM | `<Fill in>` | glm-4.7, glm-4.6, glm-4.5, glm-4.5-air, glm-5, glm-5.1 | `<Fill in>` |
| Llama | `<Fill in>` | Llama3-8B-Instruct, Llama3.1-8B-Instruct, Llama3.2-8B-Instruct | `<Fill in>` |
| Other Models | `<Fill in>` | `<Not on list / To be confirmed>` | Protocol, image, inference engine, metering, VRAM, and License evaluation needed |

### 3.5 Model Requirements Assessment

| Assessment Item | Conclusion | Action |
| --- | --- | --- |
| Is the model on the AGIOne rapid deployment list | `<Yes/No/Partial>` | Models on the list can proceed to resource evaluation; models outside the list require listing or adaptation assessment |
| Is the model capability already supported | `<Yes/No/Partial>` | Unsupported capabilities require protocol adaptation, metering method, or product development evaluation |
| Is model listing required | `<Yes/No>` | Clarify model source, weights, image, inference engine, and License |
| Is resource testing required | `<Yes/No>` | Clarify GPU/NPU, VRAM, driver, CUDA/CANN, and inference engine |
| Is protocol adaptation required | `<Yes/No>` | OpenAI, Anthropic, private protocol, SSE, tool calling, multimodal |
| Is metering development required | `<Yes/No>` | Tokens, images, audio, video, call counts, duration, usage field completion |
| Is performance stress testing required | `<Yes/No>` | TTFT, TPOT, TPS, P95/P99, RPM, TPM, concurrency |

## 4. Survey Dimension 2: Customer Compute Resources

### 4.1 Compute Resource Source

| Question | Customer Response | Notes |
| --- | --- | --- |
| Does the customer already have compute resources? | `<Yes/No>` | Existing/Planned procurement/Rented/Cloud resources |
| Compute deployment location | `<Fill in>` | IDC, Private cloud, Public cloud, HCS, ModelArts Lite, Kubernetes cluster |
| Is AGIOne management allowed? | `<Yes/No>` | Account permissions, network, security policies, operations boundary |
| Is there an existing Kubernetes cluster? | `<Yes/No>` | Version, CNI, CSI, Ingress, namespace permissions |
| Are bare metal servers used? | `<Yes/No>` | Driver, container runtime, storage, and network confirmation needed |
| Are new compute resources planned for procurement? | `<Yes/No>` | Recommended models and quantities need to be provided |
| Are there localization or Xinchuang (信创) requirements? | `<Yes/No>` | Ascend, Enflame, Biren, Kylin/UOS, etc. |

### 4.2 Compute Node Hardware Information

| Node ID | Purpose | CPU Model/Architecture | CPU Cores | Memory | System Disk | Data Disk/Shared Storage | GPU/NPU Model | VRAM | Card Count | Network | Operating System |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `<node-1>` | `<Management/Inference/Training/Development/Storage>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<LAN/RDMA/IB/RoCE>` | `<Fill in>` |
| `<node-2>` | `<Management/Inference/Training/Development/Storage>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<LAN/RDMA/IB/RoCE>` | `<Fill in>` |
| `<node-3>` | `<Management/Inference/Training/Development/Storage>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<Fill in>` | `<LAN/RDMA/IB/RoCE>` | `<Fill in>` |

### 4.3 GPU / NPU Model Adaptation Assessment

| Vendor | Customer Model | On AGIOne Management Compatibility List | Recommended Action |
| --- | --- | --- | --- |
| NVIDIA Hopper | `<H800/H200/H100/H20/Other>` | `<Yes/No/To be confirmed>` | Models on the list still require validation of driver, CUDA, image, inference engine, and model |
| NVIDIA Ampere | `<A100/A800/A40/A30/A10/RTX A/RTX30/Other>` | `<Yes/No/To be confirmed>` | Existing cards require key confirmation of VRAM, driver, and data center stability |
| NVIDIA Ada | `<L40/L40S/L20/L20S/L4/L2/RTX4090/Other>` | `<Yes/No/To be confirmed>` | Consumer or workstation models require cooling, driver, and delivery strategy confirmation |
| Huawei Ascend | `<Ascend910B/Ascend910C/Other>` | `<Yes/No/To be confirmed>` | CANN, MindIE, model adaptation, and image version confirmation needed |
| Enflame | `<106/Other>` | `<Yes/No/To be confirmed>` | Driver, inference framework, and model adaptation confirmation needed |
| Biren | `<S60/Other>` | `<Yes/No/To be confirmed>` | Driver, inference framework, and model adaptation confirmation needed |
| Other | `<Fill in>` | `<No/To be confirmed>` | Usually requires management adaptation development or project-level validation |

### 4.4 Operating System, Driver, and Runtime

| Item | Customer Environment | AGIOne Recommended Scope | Adaptation Conclusion |
| --- | --- | --- | --- |
| Management Node OS | `<Fill in>` | Ubuntu22.04 recommended; Ubuntu20.04 can be within recommendation range; CentOS/Rocky 7.x/8.x conditionally supported; Kylin/UOS requires evaluation | `<Adapted/To be validated/Requires adaptation>` |
| Compute Node OS | `<Fill in>` | Linux server; needs to match GPU/NPU driver, container runtime, and delivery package | `<Adapted/To be validated/Requires adaptation>` |
| NVIDIA Driver | `<Fill in>` | Needs to match GPU model, CUDA, container image, and inference engine | `<Adapted/To be validated/Requires adaptation>` |
| CUDA | `<Fill in>` | Currently no fixed version declared; needs to be confirmed with delivery package compatibility matrix | `<Adapted/To be validated/Requires adaptation>` |
| Ascend CANN / MindIE | `<Fill in>` | Needs to match Ascend model, model, and image version | `<Adapted/To be validated/Requires adaptation>` |
| Docker / Container Runtime | `<Fill in>` | Docker 24.x+ recommended; K8s scenarios require container runtime confirmation | `<Adapted/To be validated/Requires adaptation>` |
| Kubernetes | `<Fill in>` | Kubernetes 1.24-1.29 recommended; to be confirmed with delivery package | `<Adapted/To be validated/Requires adaptation>` |
| Helm | `<Fill in>` | Helm 3.10+ recommended | `<Adapted/To be validated/Requires adaptation>` |

### 4.5 Storage, Network, and Deployment Prerequisites

| Item | Customer Environment | Recommended Confirmation Content | Risk |
| --- | --- | --- | --- |
| Management Node System Disk | `<Fill in>` | All-in-One recommends 200GiB available disk; production management plane needs evaluation based on scale | `<Low/Medium/High>` |
| Management Node Data Disk | `<Fill in>` | Production management node data disk can reference >=400GiB guideline | `<Low/Medium/High>` |
| Model Weight Storage | `<Fill in>` | Local disk, NAS, NFS, Ceph, Object storage, Shared storage | `<Low/Medium/High>` |
| Shared Storage | `<Fill in>` | Whether RWX is needed, whether multi-node read/write is supported | `<Low/Medium/High>` |
| Image Registry | `<Fill in>` | Whether a registry already exists, whether all nodes can pull images | `<Low/Medium/High>` |
| RDMA / IB / RoCE | `<Fill in>` | 100Gbps+ RDMA recommended for multi-machine multi-card inference or training | `<Low/Medium/High>` |
| DNS / NTP | `<Fill in>` | Domain name resolution, time synchronization; clock drift recommended to be controlled within 1 second | `<Low/Medium/High>` |
| Firewall / Security Group | `<Fill in>` | SSH, API entry, job agent, K8s, database, middleware ports | `<Low/Medium/High>` |
| Offline Environment | `<Fill in>` | Whether offline bundle, offline Python, image packages, checksum are needed | `<Low/Medium/High>` |

### 4.6 Compute Resource Assessment

| Assessment Item | Conclusion | Action |
| --- | --- | --- |
| Is the compute model on the compatibility list | `<Yes/No/Partial>` | Models on the list proceed to driver/image/model validation; models outside the list require management adaptation development evaluation |
| Is the OS within recommended scope | `<Yes/No/To be confirmed>` | Non-recommended scope requires project-level validation or OS change |
| Is driver/CUDA/CANN version clear | `<Yes/No>` | Unclear versions require version and compatibility matrix supplementation |
| Does storage meet model deployment requirements | `<Yes/No/To be confirmed>` | Extra-large models require additional weight storage and loading performance confirmation |
| Does network meet inference scale requirements | `<Yes/No/To be confirmed>` | Multi-machine multi-card or high-throughput scenarios require RDMA/IB/RoCE confirmation |
| Is compute management adaptation development required | `<Yes/No>` | Non-compatible chips, non-standard platforms, and special driver stacks usually require development |
| Is on-site environment remediation required | `<Yes/No>` | Resources, network, permissions, ports, offline packages, and storage issues enter the remediation list |

## 5. Model Requirements and Compute Resource Matching Assessment

| Assessment Dimension | Pass Condition | Action When Not Passed |
| --- | --- | --- |
| Model is on the support list | Model belongs to known on-prem rapid deployment models or supported protocols | Model listing, resource testing, protocol adaptation, or metering development |
| Model capability is supportable | Chat, Reasoning, Multimodal, OCR, Embedding, Reranker, RAG, Tool Calling, etc. already have solutions | Supplement model capability validation or product development evaluation |
| Compute model is manageable | GPU/NPU model is on the compatibility list | Management adaptation development or compute model change |
| Compute resources are sufficient | CPU, memory, VRAM, card count, storage, and network meet model scale | Adjust model specification, quantization method, parallel strategy, or procure resources |
| Driver runtime is available | OS, Driver, CUDA/CANN, Docker/K8s, and image versions match | Freeze versions, supplement compatibility matrix, or on-site validation |
| Performance targets are achievable | Concurrency, RPM, TPM, TTFT, P95/P99 meet business objectives | Stress testing, scaling, aggregated routing, rate limiting, or model replacement |
| Metering and governance are implementable | usage, tokens, call counts, duration, quotas, and audits can be recorded | Metering rule completion, field adaptation, or governance process design |

## 6. Preliminary Solution Recommendations

| Scenario | Recommended Path | Notes |
| --- | --- | --- |
| Model supported, compute adapted | Proceed directly to PoC or deployment solution design | Output model, compute, deployment, stress testing, and acceptance plan |
| Model supported, compute unconfirmed | First conduct compute environment validation | Confirm GPU/NPU, OS, driver, CUDA/CANN, container, storage, and network |
| Model unsupported, compute adapted | First conduct model listing and protocol/metering evaluation | Clarify model source, image, inference engine, API protocol, usage fields, and License |
| Model unsupported, compute unadapted | Split into model adaptation and compute adaptation two work packages | Direct delivery cycle commitment not recommended; technical validation must be completed first |
| Customer has no own compute resources | Recommend procurement specifications based on target model and usage scale | Design based on model parameter count, VRAM, concurrency, token scale, and high availability requirements |
| Customer plans to procure domestic compute | Prioritize confirming compatible models such as Ascend910B/910C, Enflame106, Biren S60 | Also confirm software stack, inference engine, and model adaptation maturity |

## 7. Risk Register

| Risk ID | Risk | Impact | Severity | Recommended Action | Status |
| --- | --- | --- | --- | --- | --- |
| R-001 | Model not on rapid deployment list | Requires listing, testing, or development; affects delivery cycle | `<High/Medium/Low>` | Clarify model source, protocol, image, metering method, and testing resources | `<Fill in>` |
| R-002 | Customer GPU/NPU not on compatibility list | Cannot directly manage or deploy model | `<High/Medium/Low>` | Evaluate adaptation development or recommend compatible model replacement | `<Fill in>` |
| R-003 | Insufficient VRAM or card count | Extra-large models cannot be deployed or performance does not meet standards | `<High/Medium/Low>` | Reduce model specification, quantization, multi-card parallelism, or procure resources | `<Fill in>` |
| R-004 | CUDA/CANN/driver version unclear | Image and inference engine may not be able to run | `<High/Medium/Low>` | Supplement version matrix and conduct environment validation | `<Fill in>` |
| R-005 | Insufficient storage or network | Slow weight loading, unstable inference, poor multi-machine multi-card performance | `<High/Medium/Low>` | Plan shared storage, RDMA/IB/RoCE, and network isolation | `<Fill in>` |
| R-006 | Complex metering method | usage, token, or multimodal metering cannot be accurately settled | `<High/Medium/Low>` | Evaluate protocol fields, usage completion, and billing rule development | `<Fill in>` |
| R-007 | Strict data residency requirement | Cannot call external APIs or SaaS models | `<High/Medium/Low>` | Prioritize on-prem model deployment and private solutions | `<Fill in>` |

## 8. Deliverables Checklist

| Deliverable | Required | Owner | Deadline |
| --- | --- | --- | --- |
| Model Support Assessment Table | `<Yes/No>` | `<Fill in>` | `<Fill in>` |
| Compute Resource Inventory Table | `<Yes/No>` | `<Fill in>` | `<Fill in>` |
| Model-Chip-Driver-Inference Engine Validation Matrix | `<Yes/No>` | `<Fill in>` | `<Fill in>` |
| PoC Test Plan | `<Yes/No>` | `<Fill in>` | `<Fill in>` |
| Deployment Resource Requirements Table | `<Yes/No>` | `<Fill in>` | `<Fill in>` |
| Environment Remediation Checklist | `<Yes/No>` | `<Fill in>` | `<Fill in>` |
| Business and License Confirmation Checklist | `<Yes/No>` | `<Fill in>` | `<Fill in>` |

## 9. Final Sign-Off

| Role | Name | Conclusion | Date | Notes |
| --- | --- | --- | --- | --- |
| Customer Business Owner | `<Fill in>` | `<Approved/Conditionally Approved/Blocked>` | `<Fill in>` | `<Fill in>` |
| Customer Infrastructure Owner | `<Fill in>` | `<Approved/Conditionally Approved/Blocked>` | `<Fill in>` | `<Fill in>` |
| AGIOne Pre-Sales Owner | `<Fill in>` | `<Approved/Conditionally Approved/Blocked>` | `<Fill in>` | `<Fill in>` |
| AGIOne Delivery Owner | `<Fill in>` | `<Approved/Conditionally Approved/Blocked>` | `<Fill in>` | `<Fill in>` |
| AGIOne Product/R&D Owner | `<Fill in>` | `<Approved/Conditionally Approved/Blocked>` | `<Fill in>` | `<Fill in>` |

## 10. Conclusion Templates

### 10.1 Directly Supportable

The customer's target model falls within the scope of AGIOne supported or rapidly deployable models, the customer's compute model is on the AGIOne management compatibility list, and the operating system, driver, container runtime, storage, and network conditions meet deployment prerequisites. Recommendation to proceed to PoC or deployment solution design phase.

### 10.2 Conditionally Supportable

The customer's target model or compute resources have some items pending validation, but there are no definitive blockers. Recommendation to first complete model testing, compute environment validation, protocol/metering evaluation, or environment remediation before formal deployment.

### 10.3 Not Currently Supportable

The customer's target model is not within the current support scope and requires new protocols, inference engines, metering methods, or compute management adaptation; or the customer's compute model, driver, OS, storage, and network conditions cannot meet deployment requirements. Recommendation to proceed to product/R&D adaptation evaluation without committing to direct delivery.