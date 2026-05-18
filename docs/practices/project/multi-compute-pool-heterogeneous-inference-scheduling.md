# Multi-Compute Pool Heterogeneous Inference Scheduling Best Practice

> **IMMS · AGIOne Platform** Multi-Compute Pool Heterogeneous Inference Scheduling **Best Practice**
>
> *Best Practice Guide for Heterogeneous Inference Scheduling*
>
> **Applicable Scenario:** Hybrid deployment, elastic scheduling, and production operations of self-fine-tuned large models (Qwen-32B) on Huawei Ascend 910B NPU and NVIDIA A10 GPU
>
> **Coverage:** Multi-compute pool access · Fault self-healing · Inference engine optimization · Aggregated model scheduling · Operations monitoring and analysis
>
> **Version:** V1.0 | **Status:** Official Release
>
> **IMMS · Huawei Cloud · AGIOne Platform Team**
>
> 2026

---

# Table of Contents

---

# Chapter 1: Background and Architecture Overview

## 1.1 Business Background

This document is intended for enterprises that have deployed self-fine-tuned Qwen-32B models in production. It describes how the IMMS AGIOne platform enables unified multi-compute-pool management, elastic scheduling, and high-availability operations under heterogeneous hardware (Huawei Ascend 910B NPU + NVIDIA A10 GPU) and cross-network-domain conditions (Huawei HCS public cloud, on-premise IDC private cloud, IDC physical servers).

## 1.2 Core Challenges

* **Hardware heterogeneity:** Ascend 910B and NVIDIA A10 GPU/NPU coexist, with different inference engines (MindIE / vLLM);
* **Distributed nodes:** Compute resources spread across HCS public cloud, on-premise IDC private cloud, and IDC bare-metal servers, with network isolation;
* **Ascend node failures trigger automatic OS reinstallation**, requiring automated recovery to ensure inference service continuity;
* **Instance scale** grows from 4 to 20-36, with horizontal scaling not affecting upstream callers;
* **Multi-period differentiated loads** (nightly batch reports, daytime low-traffic, daytime batch reports) require scenario-based resource allocation;
* **Variable inference task durations** cause instance load imbalance with simple round-robin load balancing;
* **Call anomalies** require correlated views of throughput and NPU/GPU instance load for rapid root cause identification.

## 1.3 Overall Architecture

The IMMS AGIOne platform adopts a "Central Control + Edge Execution" architecture, divided into three layers: control plane, scheduling plane, and execution plane.

| **Architecture Layer** | **Core Responsibilities and Components** |
|---|---|
| Control Plane (HCS Private Cloud) | AGIONE Management Service: API Gateway, core scheduler, model publishing, billing and monitoring. Exposes model API externally, manages registration and heartbeats for all compute clusters. |
| Scheduling Plane (Per Compute Cluster) | Each compute cluster (HCS NVIDIA A10, ModelArts Lite Ascend, IDC Ascend physical machines) independently deploys K8s base services, scheduling components, and monitoring components, exposing task-build APIs to the control plane. |
| Execution Plane (Inference Instances) | MindIE containers (Ascend 910B) or vLLM containers (NVIDIA A10), loading Qwen-32B model weights and providing OpenAI-compatible inference interfaces. |
| Aggregated Scheduling Layer | Aggregated Models encapsulate multiple inference instances by scenario (full / partial / majority), providing dynamic weighted load balancing; RPM, TPM, TTFT, Running Tasks metrics are collected in real time to drive adaptive routing policy adjustments. |

> The control plane is deployed on HCS private cloud, connected to ModelArts Lite nodes via dedicated lines and to IDC physical machines via internal routing. NVIDIA A10 clusters are accessed through HCS VPC. All nodes are unified under the AGIONE multi-cluster view.

## 1.4 Network Connectivity Matrix

| **Node Type** | **Connection to AGIONE Control** | **Notes** |
|---|---|---|
| HCS NVIDIA A10 Servers | HCS VPC internal direct connection | Lowest latency; recommended for low VRAM, deploying small models like Qwen3.5-9B for internal Q&A. |
| ModelArts Lite Ascend 910B | Dedicated network connection | Stable exclusive bandwidth; suitable for batch inference |
| IDC Ascend 910B Physical Servers | Internal switch / router connection | Bare-metal performance; recommended for nightly full-batch processing |

---

# Chapter 2: Multi-Compute Pool Access and Management

## 2.1 Cluster Management Strategy

The AGIONE management service adopts a "multi-pool multi-cluster" model, unifying management of three compute environments while each cluster maintains an independent K8s control plane, interacting with AGIONE solely through standardized task-build APIs.

### 2.1.1 NVIDIA A10 Cluster Access (HCS VPC Mode)

1. Create a K8s cluster within HCS VPC and deploy the GPU scheduling plugin (nvidia-device-plugin).
2. Install AGIONE scheduling and monitoring components within the cluster.
3. AGIONE scheduling component registers cluster information (cluster ID, GPU model, available GPU count, network endpoint) with the control plane.
4. The control plane issues heartbeat detection tasks (every 60 seconds) to continuously monitor cluster health.

### 2.1.2 ModelArts Lite Ascend 910B Access (Dedicated Line Mode)

1. Deploy K8s base services on ModelArts Lite Server cloud hosts and install the Ascend Device Plugin.
2. Deploy AGIONE scheduling component, configuring the dedicated network endpoint for communication with AGIONE control.
3. Configure NPU monitoring component (npu-exporter) to collect NPU utilization, VRAM, and temperature metrics.
4. Register the cluster to AGIONE, annotating node attributes (hardware type: ascend-910b64g).

### 2.1.3 IDC Ascend 910B Physical Server Access (Internal Routing Mode)

1. After installing the OS on the physical server, execute the node initialization script provided by AGIONE (install Docker, K8s kubelet, Ascend driver).
2. Configure routing reachability to AGIONE control via internal switches and routers.
3. Deploy AGIONE scheduling and monitoring components and complete cluster registration.
4. Mount critical configuration data and persistent model cache to the data disk (separate from the system disk).

## 2.2 Cluster Resource Labels and Scheduling

AGIONE uses node Labels for scheduling control, ensuring that requests for different aggregated models are routed to the appropriate compute pool.

| **Label Key** | **Example Value** | **Meaning** | **Recommended Scheduling Scenario** |
|---|---|---|---|
| hardware-type | ascend-910b64g / nvidia-a1024g | Hardware type | Route by inference engine |

---

# Chapter 3: Ascend Node Fault Self-Healing Mechanism

## 3.1 Fault Trigger and Recovery Process

When an Ascend 910B node experiences hardware failure, the Huawei Cloud node failure trigger mechanism automatically performs OS reinstallation (Re-image). The AGIONE platform constructs an end-to-end rapid self-recovery process around this mechanism.

> **Self-Recovery Process (End-to-End Target):** Node failure alert → Automatic traffic removal → OS reinstallation (~10 min) → Base services rapid recovery (<5 min) → Inference service startup (~<15 min) → Health check passed → Automatic traffic reinstatement

## 3.2 Base Image Creation Specification

After node initialization, a base image (Base Image) should be created immediately to固化 OS configuration, drivers, K8s components, and AGIONE Agent into the image, reducing recovery time.

| **Image Layer** | **Contents** |
|---|---|
| OS Base Layer | EulerOS / Ubuntu 22.04 LTS + security patches + timezone / DNS configuration |
| Ascend Driver Layer | CANN toolkit, Ascend driver, firmware version locked |
| Container Runtime Layer | Docker CE, containerd, K8s kubelet (version locked), nvidia/ascend device plugin |
| AGIONE Component Layer | Monitoring component, log collector, node registration script (auto-register to control plane) |
| Inference Engine Layer (Optional) | MindIE base image / vLLM base image (including Python environment, dependency packages; model weights mounted via data disk) |

## 3.3 Critical Data Storage Specification

* **Model weight files:** Stored on the data disk (independent from the system disk), e.g., mount path `/data/models/<model-name>/`. OS reinstallation does not affect the data disk.
* **K8s cluster configuration** (kubeconfig, etcd snapshots): Stored in the data disk-mapped folder.

## 3.4 Traffic Removal and Auto-Recovery Linkage

1. After AGIONE heartbeat detection fails 2 times (60 seconds), the node is marked as NotReady, and the aggregated scheduling layer automatically sets that node's weight to 0, stopping new request routing to that node.
2. After node reinstallation completes, it automatically connects to the cluster.
3. After the control plane verifies registration information, it triggers a health check probe (HTTP /health interface); after 3 consecutive successes, the node weight is restored to the default value.
4. The aggregated scheduling layer resumes routing requests to that node, and the operations monitoring panel automatically updates the node status.

---

# Chapter 4: Inference Engine Deployment and Performance Baseline

## 4.1 MindIE Inference Engine (Ascend 910B)

### 4.1.1 Base Image Construction

* Base image: Customized based on the CANN official image (mindspore/mindie:latest-ascend910b).
* Install MindFormers inference framework required by Qwen-32B, with locked versions to prevent dependency drift.
* Pre-load the Tokenizer into the image to avoid first-start network download latency.
* Embed startup scripts in the image, supporting model path, port, and concurrency parameter injection via environment variables.

### 4.1.2 Key Parameter Optimization

| **Parameter** | **Recommended Value / Description** |
|---|---|
| max-seq-len | Set according to the maximum business context length; do not exceed VRAM limit |
| max-iter-times | Output token count |
| max-input-token-len | Output token count |
| world-size | Ascend 910B single-machine 8-card can be set to 8; cross-machine tensor parallelism requires HCCL configuration |
| block-size | 16 (PagedAttention KV Cache block size; recommended 16 or 32) |
| max-batch-size | 0.90 (reserve 10% VRAM margin to prevent OOM) |

## 4.2 vLLM Inference Engine (NVIDIA A10)

### 4.2.1 Base Image Construction

* Base image: Based on vllm-project/vllm-openai official image, with Qwen-32B adaptation patches.
* Enable FlashAttention-2 acceleration kernels (A10 supports BF16/FP16 mixed precision).
* Configure CUDA environment variables to enable NCCL multi-machine communication (used when instances are distributed across machines).

### 4.2.2 Key Parameter Optimization

| **Parameter** | **Recommended Value / Description** |
|---|---|
| dtype | bfloat16 (A10 supports BF16; precision-speed balance is better than fp16) |
| max-model-len | Set according to the maximum business context length; do not exceed VRAM limit |
| tensor-parallel-size | Parallel execution; qwen3.5-9b set to 2 |
| gpu-memory-utilization | 0.90 |
| max-num-seqs | 256 (maximum concurrent sequences; adjust according to GPU VRAM) |
| quantization | awq or gptq (AWQ INT4 recommended; VRAM halved, controllable precision loss) |

## 4.3 Performance Stress Testing Method (evalscope)

Use the evalscope tool to simulate upstream business requests and evaluate single-instance performance baselines. Stress testing should simulate real business context length distribution as much as possible, rather than fixed short texts.

### 4.3.1 Stress Testing Scenario Configuration

| **Stress Test Scenario** | **Prompt Token Length** | **Max Output Token** |
|---|---|---|
| Short text | < 1k | < 1k |
| Medium text | < 10k | 5k |
| Long text | < 32k | 10k |

### 4.3.2 Key Performance Indicator Target Reference

| **Indicator** | **Meaning** | **Ascend 910B Reference** | **NVIDIA A10 Reference** |
|---|---|---|---|
| TTFT (Time To First Token) | Time from request submission to first Token received | < 2.5s (FP16) | < 1.8s (AWQ INT4) |
| TPS (Tokens/s) | Tokens generated per second (single instance) | ~180 t/s (FP16 TP8) | ~120 t/s (INT4 TP4) |
| RPM (Requests/Minute) | Requests processed per minute per instance | ~20~40 RPM | ~30~60 RPM |
| TPM (Tokens/Minute) | Tokens processed per minute per instance | ~8,000~15,000 | ~6,000~12,000 |
| GPU Utilization | NPU/GPU compute utilization under inference load | > 70% (healthy) | > 65% (healthy) |

---

# Chapter 5: Aggregated Model and Dynamic Scheduling Strategy

## 5.1 Aggregated Model Design

The Aggregated Model is the core abstraction of the AGIONE platform: it logically represents a unified model while physically consisting of multiple backend inference instances. Upstream callers do not need to perceive the distribution of backend instances; they interact with the aggregated model just like an ordinary model.

## 5.2 Three-Tier Business Scenario Aggregated Model Configuration

### 5.2.1 Small-Part-Load Aggregated Model (Daytime API Support)

| **Configuration Item** | **Recommended Value / Description** |
|---|---|
| Aggregated Model ID | Externally exposed independent model ID |
| Backend Instance Count | 3 ~ 5 |
| Load Balancing Strategy | Experience + round-robin balancing (adjusted in real time based on Running Tasks count) |
| Timeout Configuration | Single request timeout 3000s (for long input/output requests) |
| QPS Limit | Rate limiting recommended (e.g., 20 QPS) to prevent burst traffic from overwhelming a few instances |
| Applicable Period | Working days, e.g., 08:00 ~ 20:00 daytime business calls |

### 5.2.2 Majority-Load Aggregated Model (Daytime Batch Reports)

| **Configuration Item** | **Recommended Value / Description** |
|---|---|
| Aggregated Model ID | Externally exposed independent model ID |
| Backend Instance Count | 10 ~ 30 |
| Load Balancing Strategy | Experience + round-robin balancing (adjusted in real time based on Running Tasks count) |
| Timeout Configuration | Single request timeout 3000s (long text generation) |
| Concurrency Control | Maximum Running Tasks per instance should not exceed 99% of the stress test baseline; otherwise, requests are queued for balanced distribution |
| Applicable Period | Working days 09:00 ~ 20:00 batch report generation |

### 5.2.3 Full-Load Aggregated Model (Nighttime Full-Batch Processing)

| **Configuration Item** | **Recommended Value / Description** |
|---|---|
| Aggregated Model ID | Externally exposed independent model ID |
| Backend Instance Count | All instances |
| Load Balancing Strategy | Experience + round-robin balancing (adjusted in real time based on Running Tasks count) |
| Timeout Configuration | Single request timeout 3000s (long text generation) |
| Batch Processing Optimization | Enable request batching mode to improve TPS |
| Applicable Period | Daily 20:00 ~ next day 08:00 nighttime batch tasks |

## 5.3 Dynamic Distribution Scheduling Mechanism

The AGIONE dynamic scheduler updates routing weights every 1 minute based on real-time metrics from each backend instance, solving the instance load imbalance problem caused by variable inference task durations.

> **Weight Calculation Formula (Simplified):**
>
> *Weight(i) = BaseCapacity(i) × HealthScore(i) / (RunningTasks(i) + 1)*
>
> * **BaseCapacity:** Instance stress-test TPM baseline normalized value (reflecting hardware performance differences)
> * **HealthScore:** 0.0 ~ 1.0 (Success Rate); drops to 0 when anomalous
> * **RunningTasks:** Current number of requests being processed (collected in real time)

---

# Chapter 6: Horizontal Scaling and Shrinking Best Practices

## 6.1 Scale-Out Operation Process (Without Affecting Online Business)

1. Prepare a new node in the target compute cluster (any type) and execute base image initialization.
2. After the new node starts, it automatically registers with the control plane at weight 0 (not receiving traffic).
3. Create a new inference instance in the AGIONE management console and associate it with the target aggregated model (e.g., only add to the "Full-Load" aggregated model, not affecting the "Small-Part-Load" endpoint).
4. After the inference service passes the health check, add the instance to the aggregated model's backend list; weight linearly increases from 0 to baseline (warm-up time approximately 5 minutes to prevent cold-start impact).
5. After confirming the new instance's RPM and TTFT indicators are normal in the operations monitoring panel, scale-out is complete.

> During scale-out, the aggregated model endpoint URL remains unchanged; upstream callers are unaware. It is recommended to perform scale-out during business trough periods (e.g., nighttime) for sufficient verification.

## 6.2 Scale-In Operation Process (Graceful Shutdown)

1. Mark the target instance as "disabled" in the AGIONE console; the scheduler stops routing new requests to that instance.
2. Wait for the instance's Running Tasks to drop to 0 (maximum wait time = request timeout × 2).
3. After Running Tasks reaches 0, remove the instance from the aggregated model's backend list and destroy the inference container.
4. If the node where the instance resides also needs to be decommissioned, after all model instances on that node have no tasks running, execute an automation script to trigger K8s node drainage (kubectl drain).

---

# Chapter 7: Operations Monitoring and Observability

## 7.1 Monitoring Metrics System

The AGIONE operations monitoring system is divided into three layers: application layer (call metrics), scheduling layer (aggregated model metrics), and infrastructure layer (GPU/NPU resource metrics). The three layers are linked to support rapid root cause identification.

### 7.1.1 Application Layer Metrics (User Perspective)

| **Metric Name** | **Description and Alert Threshold Recommendations** |
|---|---|
| RPM (Requests Per Minute) | Requests processed per minute |
| RPH (Requests Per Hour) | Requests processed per hour |
| RPD (Requests Per Date) | Requests processed per day |
| TPM (Tokens Per Minute) | Tokens processed per minute; reflects overall throughput |
| TPH (Tokens Per Hour) | Tokens processed per hour; reflects overall throughput |
| TPD (Tokens Per Day) | Tokens processed per day; reflects overall throughput |
| TTFT (Time To First Token) | First token latency |
| P50/P95/P99 End-to-End Latency | Full-chain latency distribution |
| Success Rate | Request success rate |
| Error Rate by Type | Classified statistics by error code; distinguishing client errors, platform server-side errors, and model instance errors |

### 7.1.2 Scheduling Layer Metrics (Aggregated Model Perspective)

| **Metric Name** | **Description** |
|---|---|
| Running Tasks (per instance) | Number of requests currently being processed by each backend instance; core input for dynamic scheduling weight |
| Instance Weight Distribution | Visualization of each instance's current weight; used to evaluate load balancing effectiveness |
| Routing Distribution Ratio | Actual request proportion received by each instance; compared with weight to verify scheduling policy effectiveness |
| Circuit Breaker / Degradation Count | Number and frequency of instances triggering circuit breakers at the scheduling layer |

### 7.1.3 Infrastructure Layer Metrics (Instance Resource Perspective)

| **Metric Name** | **Description and Alert Threshold Recommendations** |
|---|---|
| NPU/GPU Compute Utilization | < 20% indicates excessive idleness (waste); > 90% sustained for 5 minutes triggers scale-out alert |
| NPU/GPU VRAM Usage | > 90% triggers alert (OOM risk) |
| NPU/GPU Temperature | > 85°C triggers alert; > 90°C triggers emergency notification |
| CPU Utilization | Inference services typically have low CPU usage; > 80% may indicate data preprocessing bottleneck |
| Memory Usage | > 85% triggers alert |
| Node Health Status | K8s Node Condition (Ready/NotReady); NotReady > 60s triggers self-healing process |

## 7.2 Anomaly Correlation Troubleshooting Process

When users report call anomalies (errors or slow responses), it is recommended to troubleshoot layer by layer following this process.

> **Anomaly Troubleshooting Process (Recommended Order):**
>
> **Step 1** View the aggregated model RPM and Success Rate trend charts to locate the anomalous time window.
>
> **Step 2** View the Running Tasks distribution across backend instances to identify load-imbalanced instances (Running Tasks abnormally high or continuously non-decreasing).
>
> **Step 3** For anomalous load instances, simultaneously view their NPU/GPU utilization, VRAM, and temperature; high utilization + high Running Tasks = performance bottleneck; low utilization + high Running Tasks = request queuing (possible OOM or deadlock).
>
> **Step 4** View inference service logs, searching for keywords such as CUDA/NPU OOM, timeout, and connection refused.
>
> **Step 5** After confirming the root cause: ① Restart the faulty instance (after Running Tasks returns to 0); ② Adjust scheduling strategy to temporarily bypass the instance; ③ Submit a node alert to trigger the self-healing process.

## 7.3 Operations Analysis and Scaling Decision Support

The AGIONE operations analysis panel provides the following capabilities to support scaling decisions.

* **Throughput trend analysis:** Display RPM/RPH/RPD, TPM/TPH/TPD trends by time period (hour/day/week), identify business peak patterns, and plan resources in advance.
* **Resource utilization heatmap:** Display NPU/GPU utilization by instance × time period to identify long-term low-utilization instances (scale-in candidates).
* **TTFT distribution analysis:** P50/P95/P99 latency distribution to evaluate user experience; P95 persistently exceeding standard should prioritize scale-out.
* **Cost-benefit analysis:** Calculate cost per token based on TPM and resource consumption, comparing cost-effectiveness of different hardware types to guide procurement decisions.
* **Capacity forecasting:** Extrapolate future 30-day RPM/TPM based on historical trends, alerting resource insufficiency risks 7 days in advance.

---

# Chapter 8: Security and Compliance

## 8.1 Network Security

* All cross-network-domain communication (HCS ↔ dedicated line ↔ IDC) must enable TLS 1.2+ encryption;
* AGIONE API Gateway enables identity authentication (API Key / OAuth 2.0), with independent keys allocated per caller.
* Inference instance ports are not exposed externally; access is only through the AGIONE aggregated model endpoint proxy.
* VPC security group rules are regularly audited, and expired open ports are cleaned up.

## 8.2 Data Security

* If sensitive user data is included in inference requests, data masking or audit logging is enabled at the API Gateway layer.
* Inference request prompts and output content are prohibited from being recorded in logs (only token count, request ID, and duration are logged).

---

# Appendix

## Appendix A: Core Glossary

| **Term** | **Description** |
|---|---|
| AGIONE | IMMS platform unified model management and scheduling service, providing API gateway, scheduling, monitoring, and billing capabilities |
| MindIE | Huawei Ascend inference engine, a large model inference framework optimized specifically for Ascend NPU |
| vLLM | High-performance large model inference engine for NVIDIA GPU, using PagedAttention technology |
| evalscope | Large model evaluation and performance stress testing tool provided by Huawei Cloud |
| TTFT | Time To First Token, end-to-end latency from request submission to first Token received |
| RPM | Requests Per Minute |
| TPM | Tokens Per Minute |
| Running Tasks | Number of concurrent requests currently being processed by an inference instance |
| Aggregated Model | AGIONE's logical endpoint abstraction, encapsulating multiple backend inference instances and providing unified API access |
| ModelArts Lite Server | Huawei Cloud's lightweight AI inference cloud host service, supporting Ascend 910B NPU |
| HCS | Huawei Cloud Stack, Huawei's private cloud solution |
| CANN | Compute Architecture for Neural Networks, Huawei's Ascend AI computing framework |