# Core Capabilities and Features

## Overview

AGIOne is a **one-stop intelligent compute and model management platform** purpose-built for enterprise-grade large model productionization. Centered on the end-to-end closed loop of **"Compute → Model → Service → Operations"**, it delivers six core capabilities:

![Figure 1   Overview of AGIOne's Six Core Capabilities (with end-to-end Invocation Observability)](./images/fig_overview_capabilities.png)

<p align="center"><i>Figure 1   Overview of AGIOne's Six Core Capabilities (with end-to-end Invocation Observability)</i></p>

> The seventh capability, **Invocation Observability**, runs horizontally across all six capabilities, providing full-stack visualization and analysis from hardware resources to business-level invocations.

---

## 1. Compute Management — Unified Pooling of Heterogeneous Accelerators

### 1.1 Capability Overview

Through a unified compute management layer, AGIOne consolidates accelerators (GPUs / NPUs) distributed across **different data centers, vendors, and hardware generations** into a compute resource pool that is **logically unified yet physically heterogeneous**. Resources are **automatically scheduled and allocated** based on workload specifications, fundamentally addressing enterprise pain points such as resource fragmentation, low utilization, and difficulty in scaling.

### 1.2 Supported Heterogeneous Accelerators

| Vendor | Architecture / Series | Representative Models | Inference Engine Support |
|---|---|---|----------------------|
| **NVIDIA** | Hopper       | H200 / H20 / H100 / H800                                 | vLLM / SGLang        |
| **NVIDIA** | Ada          | L40 / L40S / L20 / L20S / L4 / L2 / RTX 4090, etc.       | vLLM / SGLang        |
| **NVIDIA** | Ampere       | A100 / A800 / A40 / A30 / A10 / RTX A Series / RTX 30 Series | vLLM             |
| **Huawei Ascend** | Ascend 910 | 910B / 910C                                          | vLLM-Ascend / MindIE |
| **Enflame** | Enflame     | 106                                                      | Vendor inference framework |
| **Biren**   | Biren       | S60                                                      | Vendor inference framework |

### 1.3 Core Sub-capabilities

#### 1.3.1 Node Onboarding and Lifecycle Management

- **Multi-cluster onboarding**: Supports cross-data-center and cross-network-domain integration (public cloud HCS, private cloud, IDC bare-metal) under a unified management view, using a "central control plane + edge execution" architecture.
- **Node initialization**: Provides standardized node initialization scripts that automatically install the container runtime, Kubernetes components, AGIOne Agent, and other dependencies.
- **Base image standards**: Maintains base images bundling the OS, drivers, Kubernetes components, and Agent.
- **Self-healing**: Built on Kubernetes Deployments — when a node fails and sufficient capacity remains, the model is automatically rescheduled and restarted on a healthy node.

#### 1.3.2 Resource Scheduling and Allocation Strategies

| Scheduling Dimension | Strategy | Use Case |
|---|---|---|
| **Hardware-label-based scheduling** | Precise routing via labels such as `xpu_type=ascend-910b64g` / `nvidia-h2096g` | Binding inference engines to specific accelerators |
| **Spec-based scheduling** | Automatically selects accelerators meeting compute-spec requirements (e.g., a 72B model requires ≥ 80 GB HBM) | Large model inference |
| **Priority-based scheduling** | Mission-critical workloads claim high-performance accelerators first; secondary workloads use the remainder | Multi-business-line resource sharing |
| **Multi-card parallel scheduling** | Automatically configures `tensor_parallel_size` / `world_size`; supports HCCL / NCCL communication | Single-node multi-card and multi-node multi-card |

#### 1.3.3 Hardware Monitoring Metrics

Metrics are collected in real time via DCGM (NVIDIA) and npu-exporter (Ascend) and pushed to monitoring dashboards at **15–30 second granularity**:

- **GPU/NPU compute utilization** & SM occupancy
- **VRAM usage** & memory bandwidth
- **Core temperature** & memory temperature
- **Real-time power draw** & TDP utilization
- **NVLink / InfiniBand bandwidth** & link health


## 2. Model Templates — Codifying Best Practices

### 2.1 Capability Overview

Drawing on **accumulated deployment experience**, AGIOne distills the deployment know-how of every mainstream large model into **reusable model templates**. This transforms work that traditionally **depends on expert intuition** — "how many cards does this model need, which engine should I use, what parameters should I set" — into **out-of-the-box standardized products**.

### 2.2 What's Inside a Model Template

Each model template encapsulates the following five categories of information, forming a complete deployment knowledge asset:

![Figure 2   The Five Components of a Model Template](./images/fig_model_template.png)

<p align="center"><i>Figure 2   The Five Components of a Model Template</i></p>

### 2.3 Built-in Model Template Examples

#### 2.3.1 Pre-built Templates for Mainstream Large Models

| Model Family    | Representative Versions                 | Parameter Scale     | Recommended Compute Spec | Inference Engine | Context Length      |
|--------------|-----------------------------------------|:------------------:|------------------------|:---:|:-------------------:|
| **DeepSeek** | V3.1 / R1                               | 671B MoE / 14B–70B | H200×8 / H20×2         | vLLM         |    32K / 64K / 128K     |
| **Qwen**     | QwQ-32B                                 |        32B         | H20×1 / L20×4          | vLLM         |       32K / 64K       |
| **Qwen-VL**  | 2 / 3                                   |     14B / 72B      | L20×1 / L20×4          | vLLM         |     Multimodal      |
| **Llama3**   | 8B                                      |         8B         | L20S×1 / Ascend 910B×1 | vLLM / MindIE |        32K          |
| **GLM**      | 5.1                                     |        744B        | H20×16                 | vLLM         | 32K / 64K / 128K        |
| **Embedding / Reranker** | bge-m3 / bge-reranker / qwen3-embedding |     —          | L20×1 / L4×2           | vLLM         |          —          |

### 2.4 Template Version Management

- **Official templates**: Continuously maintained by the AGIOne team and kept in sync with mainstream model releases.
- **Enterprise custom templates**: Customers can codify proprietary templates based on their own production workloads (e.g., "Optimal configuration for a fine-tuned Qwen3-VL-7B on 4× L20"), building an internal library of best practices.

## 3. Rapid Deployment — A "One-Click" Experience That Hides Technical Complexity

### 3.1 Capability Overview

Building on the model template capability, AGIOne transforms model deployment — work that traditionally requires multiple engineers collaborating over several days — into a productized workflow of **"Pick a model → Pick a spec → Deploy with one click."** Inference framework configuration, VRAM sizing, parallelism parameters, container orchestration, and other complex technical details are completely abstracted away, **enabling general operations and business staff to perform professional-grade model deployments**.

### 3.2 Three-Step Rapid Deployment Workflow

![Figure 3   Three-Step Rapid Deployment Workflow](./images/fig_quick_deploy_flow.png)

<p align="center"><i>Figure 3   Three-Step Rapid Deployment Workflow</i></p>

### 3.3 Intelligent Spec Filtering

Once the user selects a model, AGIOne **automatically scans the current compute pool** and instantly computes and presents all **immediately deployable spec combinations** based on the following criteria:

| Filter Criterion | Automated Decision Logic |
|---|---|
| **Sufficient VRAM**    | Computes model weights × quantization factor + KV cache reservation + system overhead |
| **Sufficient cards**   | Verifies free cards in the target compute pool ≥ `tensor_parallel_size` |
| **Sufficient network** | For multi-node deployments, validates RDMA bandwidth and latency |

### 3.4 Visualized Deployment Process

Once deployment starts, the UI **displays each phase in real time**, keeping users fully informed of deployment status:

| Phase | UI Display | Typical Duration |
|:----------:|-------------------------------------------|:-----------:|
| **① Resource allocation** | Highlights the selected physical cards (rack / node / card ID), with animated resource locking | < 30 seconds |
| **② Container scheduling** | K8s Pod creation progress, with scheduling policy, node match, and resource quota validation | 30 seconds – 2 minutes |
| **③ Image pull** | Inference engine image download progress (near-edge image services can complete in seconds) | 1 – 5 minutes |
| **④ Model loading** | Model weights loaded from shared storage into VRAM, with shard-by-shard progress | 2 – 15 minutes |
| **⑤ Health check** | HTTP port readiness probe | 30 seconds – 2 minutes |

The full workflow typically completes **within 10–25 minutes** — no command line, no manual YAML editing, no familiarity with inference framework internals required.

### 3.5 Failure Rollback and Diagnostics

- **Failure at any phase** triggers automatic rollback of allocated resources, preventing resource leaks.
- **Failure causes** are pinpointed by a rule engine: typical errors such as "insufficient VRAM / image pull timeout / model file checksum mismatch / port conflict" are surfaced with clear diagnostics.
- **Full deployment history** is retained, supporting post-mortem analysis and root-cause attribution.

---

## 4. Model Publishing — Exposing Models as Services

### 4.1 Capability Overview

AGIOne **wraps deployed model instances as standardized service Endpoints**, exposing model capabilities to business consumers in a secure and controlled manner through unified authentication, pricing strategies, and rate-limiting configurations — enabling the critical leap from **"functional" to "commercially viable."**

### 4.2 Standardized Endpoint Encapsulation

| Encapsulation Dimension | Details |
|---|---|
| **Protocol compatibility** | OpenAI-compatible (`/v1/chat/completions`, `/v1/embeddings`, `/v1/models`)<br>Anthropic-compatible (`/v1/messages`); existing clients migrate with zero code changes |
| **Endpoint URL** | Standard URL format, e.g., `https://agione.example.com/v1/chat/completions`, with routing driven by a custom `model` field |
| **Request / Response specs** | Fully aligned with community standards, including full support for tool use (function calling), streaming output (SSE), and multimodal inputs |

### 4.3 Authentication and Authorization

- **API key authentication**: Independent API keys are issued per tenant / business line, with support for multiple concurrent keys and key rotation.
- **OAuth 2.0 / SSO**: Integrates with enterprise identity systems (LDAP, DingTalk, WeCom, SAML) for unified identity management.
- **RBAC permission model**: Four-tier authorization granularity — Tenant → Project → Model → Operation — controlling who can invoke models, view billing, and manage instances.

### 4.4 Pricing Configuration

At publication time, **differentiated pricing strategies** can be configured for each Endpoint:

| Pricing Model | Use Case | Example Configuration |
|---|---|---|
| **Per-Token (separate input / output rates)** | General dialogue, document generation | DeepSeek-V3: input ¥0.12 / 1K tokens, output ¥0.48 / 1K tokens |
| **Per-call** | Fixed-structure requests (OCR, embeddings) | Embedding: ¥0.001 / call |
| **Per-duration** | Streaming output, long-running tasks | Speech synthesis: ¥0.05 / second |

### 4.5 Multi-dimensional Rate Limiting

At the API gateway layer, AGIOne provides **fine-grained, multi-dimensional rate limiting** to prevent any single consumer from causing system overload and to safeguard core workloads:

| Rate-limit Dimension | Configuration Granularity | Typical Scenario |
|---|---|---|
| **Per-tenant RPM / TPM** | Independent quota per tenant | Smart Manufacturing Division: RPM = 500, TPM = 2,000,000 |

**Over-limit policy** can be set to either "reject immediately (HTTP 429)" or "queue and wait" — queuing is recommended for critical workloads to avoid request loss.

## 5. Model Aggregation — Multi-objective Intelligent Orchestration

### 5.1 Capability Overview

The **Aggregated Model** is AGIOne's **core abstraction for value delivery**: **logically**, it presents a single unified model Endpoint to consumers; **physically**, it is composed of multiple backend inference instances that may span hardware types, clusters, and geographies. The aggregation layer makes **real-time dynamic routing decisions** for every request based on multi-dimensional objectives — **cost, high availability, load balancing, protocol translation, and user experience** — so that upstream applications never need to deal with backend complexity.

### 5.2 Five Optimization Objectives of the Aggregated Model

![Figure 4   Five Optimization Objectives of the Aggregated Model](./images/fig_aggregate_targets.png)

<p align="center"><i>Figure 4   Five Optimization Objectives of the Aggregated Model</i></p>

### 5.3 Five Aggregation Strategies in Detail

#### 5.3.1 Cost-optimized Aggregation

- **Goal**: Meet SLA at the lowest possible cost.
- **Strategy**: Route preferentially to the backend instance with the lowest per-token cost (e.g., prefer L20 over H200, prefer INT4-quantized variants).
- **Typical scenarios**: Day-to-day Q&A, internal productivity assistants, knowledge base retrieval.

#### 5.3.2 High-Availability (HA) Aggregation

- **Goal**: 99.9%+ service availability with no service disruption from single-point failures.
- **Strategy**: Hot-standby across multiple source instances; instances are automatically removed from the traffic pool after 2 consecutive heartbeat failures (60 seconds), and re-added once recovered. Deployments span data centers and availability zones.
- **Typical scenarios**: Core business system integrations, externally exposed commercial APIs.

#### 5.3.3 Load-Balancing Aggregation

- **Goal**: Prevent load imbalance across instances (inference latency varies widely, so naive round-robin can overload some instances).
- **Strategy**: Dynamically weighted dispatch based on **real-time running task counts**, using the formula:

```
Weight(i) = BaseCapacity(i) × HealthScore(i) / (RunningTasks(i) + 1)
```
Where:
- `BaseCapacity` — Normalized TPM baseline from instance load testing (reflecting hardware performance differences).
- `HealthScore` — Range 0.0–1.0 (success rate); drops to 0 when the instance is unhealthy.
- `RunningTasks` — Number of in-flight requests (collected in real time).

The scheduler **refreshes weights every minute**, biasing requests toward healthier, less-loaded instances.

#### 5.3.4 Protocol-Translation Aggregation

- **Goal**: Upstream clients use the OpenAI protocol, but backend instances may run different inference frameworks with different protocols.
- **Strategy**: The aggregation layer **automatically translates protocol formats** on the request and response paths, transparent to the backend models.
- **Supported translations**: OpenAI ⇄ Anthropic, OpenAI ⇄ MindIE native protocol, streaming ⇄ non-streaming.

#### 5.3.5 Experience-optimized Aggregation

- **Goal**: Low TTFT and high output throughput, maximizing perceived quality.
- **Strategy**: Selects instances delivering the best experience based on **historical P95 latency and output TPS**; configurable SLA thresholds (e.g., TTFT < 2s) cause underperforming instances to be deprioritized.
- **Typical scenarios**: Interactive chatbots, real-time agentic conversations.

### 5.4 Multi-scenario Aggregation Configurations

| Aggregation Scenario | Backend Instances | Load Strategy | Timeout | Active Window |
|---|:---:|---|:---:|---|
| **Light load (daytime API support)** | 3 – 5  | Experience + round-robin | 3000s | Weekdays 08:00–20:00 |
| **Heavy load (daytime batch reporting)** | 10 – 30 | Experience + round-robin | 3000s | Weekdays 09:00–20:00 |
| **Full load (overnight batch processing)** | All instances | Experience + round-robin + batching | 3000s | Daily 20:00 – 08:00 next day |

### 5.5 Transparent Scaling of Aggregated Models

![Figure 5   Transparent Scaling Workflow for Aggregated Models](./images/fig_scaling_flow.png)

<p align="center"><i>Figure 5   Transparent Scaling Workflow for Aggregated Models</i></p>

**The aggregated Endpoint URL remains unchanged throughout — fully transparent to upstream consumers**.

---

## 6. Metering and Billing — Fine-grained Operational Control

### 6.1 Capability Overview

AGIOne provides an **enterprise-grade SaaS metering and billing system** that converts every model invocation into precisely quantifiable, allocatable, and settle-able business data. Through a **credit-based system**, internal business units can adopt flexible pricing while maintaining unified reconciliation — moving AI cost from a "black box" to **complete transparency**.

### 6.2 Multi-dimensional Metering Data Collection

For every API call, AGIOne accurately records the following metering data:

| Metering Dimension | Captured Content | Precision |
|---|---|:---:|
| **Input token count** | Computed input tokens (including system prompts and conversation history) | 1 token |
| **Output token count** | Tokens actually generated by the model (precisely captured even when streaming is interrupted) | 1 token |
| **Call count** | Number of API calls (success / failure recorded separately) | 1 call |
| **Inference duration** | End-to-end processing time (used for duration-based billing) | 1 ms |
| **Multimodal metering** | Image count / audio duration / video frame count (varies by modality) | Per modality |

### 6.3 Credit-based Pricing System

AGIOne uses **credits** as the unified internal unit of pricing, which offers significant advantages over direct monetary pricing:

- **Uniform comparability**: Credits provide a common unit across models, business units, and billing cycles, insulating accounting from FX and price fluctuations.
- **Flexible conversion**: Credits convert to currency at a configurable ratio (e.g., ¥1 = 100 credits), adjustable to business needs.
- **Cross-period rollover**: Credits can roll over on a monthly, quarterly, or annual basis.
- **Flexible allocation**: Administrators can issue credit packages to departments in bulk; departments then consume them freely.

#### Billing Rule Examples

| Model Spec | Input Pricing | Output Pricing | Use Case |
|---|:---:|:---:|---|
| **DeepSeek-V3 / 128K** | 12 credits / 1K tokens | 48 credits / 1K tokens | High-value, complex reasoning |
| **Qwen2.5-72B / 64K**  | 8 credits / 1K tokens  | 32 credits / 1K tokens | Standard document processing |
| **DeepSeek-7B / 32K**  | 2 credits / 1K tokens  | 8 credits / 1K tokens  | High-concurrency, lightweight workloads |
| **Embedding models**     | 1 credit / 1K tokens  | —                  | Knowledge base indexing and retrieval |
| **OCR service**           | 5 credits / call        | —                  | Image recognition |

> **💡 Credit ⇄ Currency Example**
>
> Assume a conversion ratio of `¥1 = 100 credits`:
> - A single DeepSeek-V3 call with 1,000 input tokens + 500 output tokens = 12 + 24 = **36 credits** = ¥0.36
> - The Smart Manufacturing Division receives **10,000,000 credits** at the start of the month (equivalent to ¥100,000), to be consumed freely throughout the month.

### 6.4 Metering Logs and Deduction Logs

AGIOne automatically generates **two types of logs** that serve as the primary records for reconciliation and audit:

#### 6.4.1 Metering Log (per-invocation)

Captures the complete metering record of **every individual API call**:

| Field | Example |
|---|---|
| Call ID | `req_2026042701000123` |
| Timestamp | `2026-04-27 10:23:45.123` |
| Tenant / User | Smart Manufacturing Division / zhangsan |
| Model / Endpoint | `deepseek-v3-128k-aggregated` |
| Input tokens | 1,243 |
| Output tokens | 587 |
| Inference duration (ms) | 8,234 |
| Result | Success |
| Credits charged | 1243 × 0.012 + 587 × 0.048 = **42.7 credits** |

#### 6.4.2 Deduction Log (per-account)

Aggregates credit deductions by tenant / user / period:

| Dimension | Example | Period | Opening Credits | Cumulative Deduction | Balance |
|---|---|:---:|---:|---:|---:|
| Smart Manufacturing Division | (Department-level) | 2026-04 | 10,000,000 | 6,234,891 | 3,765,109 |
| Smart Manufacturing Division / Zhang San | (User-level) | 2026-04 | — | 432,156 | — |
| Smart Manufacturing Division / RAG System | (Application-level) | 2026-04 | — | 1,892,344 | — |


## 7. Invocation Observability — End-to-End Monitoring and Analysis

### 7.1 Capability Overview

Invocation observability runs **horizontally across** all six capabilities described above, providing **complete end-to-end tracing** from the user's request, through aggregation-layer routing decisions and inference instance processing, down to the underlying hardware. Multi-dimensional analytics derived from this telemetry then **drive operational decisions and continuous optimization**.

### 7.2 Three-Tier Monitoring Metric Framework

![Figure 6   Three-Tier Monitoring Metric Framework for Invocation Observability](./images/fig_observability_layers.png)

<p align="center"><i>Figure 6   Three-Tier Monitoring Metric Framework for Invocation Observability</i></p>

### 7.3 Multi-dimensional Invocation Analytics

#### 7.3.1 By Model

- **Invocation volume trends** per model / aggregated model (hourly / daily / weekly).
- **Average TTFT, P95 latency, token-per-second throughput** per model.
- **Error rate distribution and Top-N error types** per model.
- **Cost efficiency** per model (credits per token, cost per instance).

#### 7.3.2 By Customer / Tenant

- **Invocation volume, token consumption, and credit deduction** per tenant / API key.
- **Rate-limit trigger count and over-limit request distribution** per tenant.
- **Usage heatmap by time of day** per tenant (informing capacity planning).
- **Top invoked endpoints and top users** per tenant.

#### 7.3.3 By Time Period

- Identification of business peak patterns (intra-week, intra-month, seasonal).
- Capacity forecasting: extrapolating RPM / TPM over the next 30 days from historical trends.

### 7.4 Coordinated Anomaly Diagnostic Workflow

When users report abnormal invocations, AGIOne provides a standardized, minute-scale diagnostic path **from application → scheduling → infrastructure**:

![Figure 7   Coordinated Anomaly Diagnostic Workflow](./images/fig_diagnostic_flow.png)

<p align="center"><i>Figure 7   Coordinated Anomaly Diagnostic Workflow</i></p>


## 8. Closed-loop Synergy Across Capabilities

AGIOne's six core capabilities are not standalone; together they form an organic whole that **interlocks and reinforces** end-to-end:

![Figure 8   Closed-loop Synergy Across AGIOne's Six Core Capabilities](./images/fig_capability_loop.png)

<p align="center"><i>Figure 8   Closed-loop Synergy Across AGIOne's Six Core Capabilities</i></p>

**A representative business loop**:

1. ① **Compute Management** provides the resource foundation →
2. ② **Model Templates** codify deployment expertise →
3. ③ **Rapid Deployment** brings models online →
4. ④ **Model Publishing** turns them into commercial services →
5. ⑤ **Model Aggregation** optimizes user experience →
6. ⑥ **Metering and Billing** drives financial accounting →
7. ⑦ **Invocation Observability** feeds back into resource planning and template refinement → returning to ①
