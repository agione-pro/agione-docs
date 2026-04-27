# Deployment Network Planning Guide

## 1. Overview

This document presents end-to-end network planning guidance for the two typical AGIOne deployment scenarios — **SaaS Deployment** and **On-premises Deployment** — covering detailed resource specifications for each node category, key ports and protocols, network segmentation, and connectivity requirements. Reference network topology diagrams are provided for both deployment models.

### 1.1 Deployment Model Comparison

| Dimension      | SaaS Deployment                                     | On-premises Deployment                                                |
|----------------|-----------------------------------------------------|------------------------------------------------------------------------|
| **Control plane location** | AGIOne public cloud / SaaS data center  | Customer enterprise network (IDC / private cloud)                      |
| **Core service nodes**     | ≥ 3 nodes (HA)                          | ≥ 3 nodes (Kubernetes HA, no GPU required)                            |
| **Model sources**          | Third-party / proprietary SaaS model APIs invoked over the **internet** | Locally onboarded GPU/NPU nodes; optional outbound calls to AGIOne SaaS / third-party APIs |
| **Client ⇄ Control plane** | Internet HTTPS (port 443)               | Enterprise intranet HTTPS (port 443)                                   |
| **Control plane ⇄ Compute nodes** | None (all inference handled externally) | Intranet / dedicated line, with ports 6443, 32761–32765, 8090 (optional) opened |
| **Data residency**         | Subject to the SaaS provider's security policy | Fully on-premises; data never leaves the enterprise perimeter      |
| **Typical use cases**      | SMB customers / pilots / customers without compute / burst capacity | Central / state-owned enterprises, classified workloads, large-scale compute owners, engineering verticals, multi-pool environments |

### 1.2 Network Segmentation Design Principles

- **Separation of control and execution planes**: Management nodes do not perform inference workloads; onboarded compute nodes never expose ports directly to the outside, and all invocations are proxied through the control-plane gateway.
- **Principle of least exposure**: Only the necessary ports are opened (6443 for the K8s API, 32761–32765 for scheduling and monitoring, 8090 for the image registry, 443 for the upstream API); all other inbound traffic is denied by default.
- **High availability first**: Management services run on at least 3 nodes to eliminate single points of failure; shared storage uses dedicated network paths.
- **Heterogeneous compatibility**: Onboarded nodes support the full NVIDIA Hopper / Ada / Ampere lineup, as well as domestic NPUs including Ascend 910B/910C, Enflame, and Biren. Nodes of the same architecture are recommended to be grouped into a single Kubernetes cluster.
- **Network performance assurance**: At least 1 Gbps management network per node; multi-card training and large-model inference workloads are recommended to use 100 Gbps RDMA (RoCE or InfiniBand).

> **⚠️ Key Constraints**
>
> 1. Management nodes do **not** require any accelerators (GPU / TPU / NPU), but every onboarded worker node **must have at least one accelerator**.
> 2. A single Kubernetes cluster is recommended to manage no more than 1,000 worker nodes, and **a single CPU architecture (x86 or ARM) per cluster** is recommended.
> 3. All management nodes share a common shared-storage backend; worker nodes also share storage, which can be horizontally scaled as the model inventory grows.

---

## 2. Network Planning for SaaS Deployment

### 2.1 Scenario and Logical Architecture

SaaS deployment targets customers who **do not own large-scale GPU compute** or who **prefer subscription-based access to large-model capabilities**. AGIOne deploys **at least 3 core management nodes** in the public cloud, forming a high-availability cluster that exposes a unified, OpenAI- / Anthropic-compatible API. Customer applications access the AGIOne SaaS endpoint over the **internet (HTTPS / TLS 1.3)**; the AGIOne SaaS backend then makes **outbound HTTPS (port 443) calls** to one or more third-party model providers (e.g., OpenAI, Anthropic, DeepSeek, Qwen) or AGIOne's own hosted model instances.

### 2.2 Network Topology

![AGIOne SaaS Deployment Network Topology](./images/saas_topology.png)

<p align="center"><i>Figure 2-1   AGIOne SaaS Deployment Network Topology</i></p>

### 2.3 SaaS Management Node Specifications

| Node Category                                                          | Count | CPU | Memory | System Disk | Data Disk | Network Requirements                                         |
|---------------------------------------------------------------|:---:|:---:|:---:|:---:|:---:|----------------------------------------------|
| **AGIOne Core Management Node**<br>(API Gateway + Core Services<br>+ DB + Middleware + Plugins) | ≥ 3 | ≥ 16 cores | ≥ 16 GB | ≥ 100 GB | ≥ 400 GB | Public ingress: 443/TCP<br>Inter-node intranet: gigabit LAN<br>Outbound: third-party API access |
| **Shared Storage**<br>(Block storage / recommended)                                        | ≥ 1 | — | — | ≥ 1024 GB | — | Dedicated storage network / multi-replica                                   |

### 2.4 Key Ports and Traffic Flows

| Direction | Source           | Destination | Protocol / Port | Description |
|:---:|-------------|---|---|---|
| Inbound  | Client (internet)            | SaaS load balancer / WAF | TCP 443 (HTTPS)              | OpenAI- / Anthropic-compatible protocol; TLS 1.3 enforced |
| Internal | Load balancer (optional)    | Management nodes 1/2/3   | TCP 80/443 / service ports   | L7 reverse proxy to management nodes |
| Internal | Management node ⇄ management node | —                | TCP / UDP internal ports     | Cluster heartbeat, leader election, cache sync, message queue |
| Internal | Management node              | Shared storage           | Storage protocol (iSCSI / NFS / object storage) | Persistence of model metadata, logs, and configuration |
| Outbound | Management node              | Third-party model APIs   | TCP 443 (HTTPS)              | OpenAI / Anthropic / DeepSeek / Qwen, etc. |
| Outbound | Management node              | Image registry / upgrade source | TCP 443 (HTTPS)        | Component upgrades, security patches |

### 2.5 Security and Compliance Considerations

- The ingress is protected by **WAF and DDoS mitigation**; consumers receive dedicated API keys (or OAuth 2.0 credentials), with per-tenant **RPM / TPM rate limiting** supported.
- Outbound calls to third-party APIs are tightly governed via a **NAT gateway and outbound allow-list**, restricting destination domains and ports to prevent data exfiltration to unauthorized endpoints.
- End-to-end **audit logs** (timestamp, tenant ID, model name, token count) are persisted to disk and centrally indexed; logs must **never** retain prompt or response payloads in plaintext.
- The administrative channel for the management console is physically or logically isolated from the business channel; operational actions enforce **MFA and bastion-host auditing**.

---

## 3. Network Planning for On-premises Deployment

### 3.1 Scenario and Logical Architecture

On-premises deployment targets **central and state-owned enterprises, classified-information industries**, and **customers operating large-scale on-premises compute**. The AGIOne control plane is deployed **entirely within the customer's enterprise network**, with **at least 3 nodes** running the core services and middleware to form a Kubernetes HA cluster (management nodes require no accelerators). Onboarded GPU / NPU worker nodes are organized into **heterogeneous compute pools** (NVIDIA Hopper / Ada / Ampere, Ascend 910B/910C, Enflame, Biren, etc.) and communicate with the control plane via well-defined APIs over the following critical ports: **6443, 32761, 32762, 32763, 32764, and 32765**. If a near-edge image registry is deployed within the cluster, **port 8090 must additionally be opened**. Optionally, the control plane may make outbound HTTPS calls to AGIOne SaaS or third-party APIs to augment model capabilities or enable elastic offloading.

### 3.2 Network Topology

![AGIOne On-premises Deployment Network Topology](./images/private_topology.png)

<p align="center"><i>Figure 3-1   AGIOne On-premises Deployment Network Topology (control plane, heterogeneous compute pools, and key ports)</i></p>

### 3.3 Management Node Specifications (Tiered by Onboarded Cluster Size)

Management node resources comprise two components: **Kubernetes baseline overhead** and **AGIOne service overhead**. **At least 3 nodes** are recommended in all cases to ensure high availability.

| Onboarded Node Count | K8s Baseline<br>(per node) | AGIOne Overhead<br>(per node) | Recommended Per-Node Total | Minimum Nodes |
|---|:---:|:---:|:---:|:---:|
| 1 – 5 nodes      | 1 core / 4 GB     | 7 cores / 12 GB   | ≥ 8 cores / 16 GB    | 3 |
| 6 – 10 nodes     | 2 cores / 8 GB     | 7 cores / 12 GB   | ≥ 9 cores / 20 GB    | 3 |
| 11 – 100 nodes   | 4 cores / 16 GB    | 12 cores / 24 GB  | ≥ 16 cores / 40 GB   | 3 |
| 101 – 250 nodes  | 8 cores / 32 GB    | 12 cores / 24 GB  | ≥ 20 cores / 56 GB   | 3 |
| 251 – 500 nodes  | 16 cores / 64 GB   | 24 cores / 48 GB  | ≥ 40 cores / 112 GB  | 3 |
| 500+ nodes       | 32 cores / 128 GB  | 32 cores / 64 GB  | ≥ 64 cores / 192 GB  | 3 |

> **💡 Management Node Storage and Networking**
>
> - System disk ≥ 100 GB; data disk ≥ 400 GB (AGIOne core services + DB + middleware + plugins).
> - At least 1024 GB of **shared block storage** is recommended for platform metadata, model registry information, and log archives.
> - Internal networking: connected via local LAN to all CPU / management nodes; **dedicated lines are recommended** for connectivity to specialized compute pools such as Ascend.

### 3.4 Onboarded Worker Node Specifications

Each worker node (i.e., each onboarded compute node) must carry **at least one accelerator**. CPU and RAM only need to cover the overhead of Kubernetes and the monitoring agents, since the bulk of compute is consumed by inference and fine-tuning workloads. The table below specifies the **minimum reservation per worker node**; accelerator models and quantities are sized separately based on the target workload (see the *AGIOne Onboarded Accelerator Compatibility List*).

| Item | Recommended Spec | Notes |
|---|---|---|
| **CPU (reserved)**       | ≥ 8 cores    | Reserved for K8s kubelet / kube-proxy / monitoring agents / inference frameworks |
| **Memory (reserved)**    | ≥ 16 GB      | Same as above; excludes the VRAM required for model weights |
| **System disk**          | ≥ 200 GB     | OS + container runtime + accelerator drivers + AGIOne Agent |
| **Data disk / shared storage** | NAS / shared file system ≥ 2048 GB recommended | Model weights, KV cache, logs; shared across nodes for hot loading and elastic scaling |
| **Accelerator (required)** | ≥ 1 card   | Supports NVIDIA Hopper / Ada / Ampere (H200 / H20 / H100 / H800 / L20 / L40 / A100 / A10, etc.);<br>Domestic: Ascend 910B / 910C, Enflame 106, Biren S60 |
| **RDMA network (recommended)** | 100 Gbps RoCE or InfiniBand | Required for multi-card / multi-node tensor parallelism and PD-disaggregation scenarios; MLNX_OFED 23.07 or later recommended |
| **Management network**   | ≥ 1 Gbps     | Local LAN connectivity to management nodes; internet egress (recommended) for patches, images, and optional SaaS callbacks |
| **Operating system**     | CentOS 7 / Ubuntu 20.04 / 22.04 / EulerOS | Pre-installed accelerator drivers (NVIDIA ≥ 535; CANN matched to Ascend) and RDMA drivers required;<br>OS auto-updates should be disabled to maintain a stable baseline environment |

### 3.5 Key Ports and Traffic Flows (Critical)

The AGIOne control plane communicates with onboarded nodes through **standardized open APIs**. The table below lists the ports and protocols that **must be permitted**; all other inbound connections are denied by default in line with the principle of least privilege.

|    Port     | Protocol | Service                             | Source → Destination | Description                                      |
|:---------:|:---:|--------------------------------|---|-----------------------------------------|
|  **443**  | TCP | AGIOne Web / API ingress            | Client → Control plane / Ingress | OpenAI- / Anthropic-compatible API ingress; TLS 1.3 enforced |
| **6443**  | TCP | Kubernetes API Server / job-build API | Control plane ↔ Onboarded node             | K8s control-plane traffic; scheduling dispatch and status queries from the control plane |
| **32762** | TCP | AGIOne service traffic forwarding                  | Control plane ↔ Onboarded node             | Traffic forwarding                                    |
| **32761** | TCP | AGIOne monitoring / metrics collection               | Control plane ↔ Onboarded node             | GPU / NPU utilization, VRAM, temperature, running tasks, etc.       |
| **8090**  | TCP | Near-edge image service (**optional**)                 | Onboarded node → Image registry         | Required only when a local in-cluster image service is deployed; otherwise can remain closed                |
|  **443**  | TCP | Outbound HTTPS (**optional**)               | Control plane / Onboarded node → Internet    | Optional callback to AGIOne SaaS or third-party model APIs; configure outbound allow-list as needed  |
| **RDMA**  | —   | RoCE / InfiniBand              | Between onboarded nodes                | Multi-node tensor parallelism, KV cache distribution; 100 Gbps+; never crosses the compute-pool boundary      |

> **🔒 Firewall Policy Highlights**
>
> 1. **Control plane ↔ Onboarded nodes**: ports 6443 / 32761 / 32762 / 32763 / 32764 / 32765 **must be opened**.
> 2. **Near-edge image service**: open port 8090 only when a near-edge image service is in use, and only **unidirectionally** from onboarded nodes to the image registry.
> 3. **Outbound HTTPS**: denied by default; opened on a per-domain **allow-list** basis for SaaS / third-party APIs.
> 4. **RDMA**: confined to within the compute pool (the same VLAN or switching fabric); **cross-zone routing is prohibited**.

### 3.6 Recommendations for Onboarding Heterogeneous Compute Pools

In line with the *AGIOne Onboarded Accelerator Compatibility List* and field-tested practice at IMMS / CISDI, we recommend **partitioning compute pools by hardware architecture and network environment**, with each pool maintained as a dedicated Kubernetes cluster or namespace and scheduling driven by node labels (e.g., `hardware-type=ascend-910b64g` or `nvidia-h20`).

| Compute Pool | Representative Accelerators | Network Connectivity | Use Cases |
|---|---|---|---|
| **Pool A: NVIDIA Hopper** | H200 / H20 / H100 / H800 | Local LAN + RDMA (RoCE / IB) 100G+ | Flagship large-model inference and training; DeepSeek-V3, Qwen2.5-72B, 128K long-context workloads |
| **Pool B: NVIDIA Ada / Ampere** | L20 / L40(S) / L4 / A100 / A800 / A10 / RTX 4090, etc. | Local LAN (RDMA optional) | Mid-scale, high-concurrency inference (7B–32B) — code assistants, knowledge Q&A |
| **Pool C: Domestic NPUs** | Ascend 910B / 910C, Enflame 106, Biren S60 | Dedicated line / Local LAN + RDMA | Domestic-tech-stack compliance scenarios, batch inference; deeply optimized for the MindIE engine |

---

## 4. Implementation Recommendations and Change Management

### 4.1 Pre-implementation Checklist

- Complete the *AGIOne Onboarded Node Environment Survey*, confirming consistency of **CPU architecture, accelerator model, driver version, and RDMA configuration**.
- **Management nodes**: verify that hardware meets the spec corresponding to the target tier (CPU / RAM / system disk / data disk / shared storage).
- **Networking**: complete firewall policy review and approval for ports 6443, 32761–32765, 8090 (if applicable), and 443.
- **RDMA**: ensure that the MLNX_OFED driver version is matched with the NIC firmware and switch configuration; validate via `ibstat` / `rdma link`.
- **DNS / NTP**: all nodes integrate with the enterprise DNS and a time synchronization source, with clock drift ≤ 1 second.
- **Image registry**: if a near-edge image service is used, deploy it in advance and configure its address in the worker nodes' `containerd` / `docker` settings.

### 4.2 Capacity Planning and Scaling Path

- **Management nodes**: when the onboarded node count crosses into the next tier (e.g., 100 → 101), **vertically scale** to the corresponding spec first, then perform a canary cutover, maintaining at least 3 healthy nodes throughout.
- **Worker nodes**: scaling follows the **"register first (weight = 0) → health check → linear weight ramp-up"** workflow, transparent to consumers.
- **Storage**: in scenarios where model weights grow continuously, scale the worker-node shared storage to 4 TB+ or adopt horizontally scalable systems such as NAS or Ceph.
- **Networking**: when a single pool exceeds 16 worker nodes, an upgrade to a 200 Gbps RDMA backbone is recommended; cross-pool traffic should always traverse the control-plane gateway and never go peer-to-peer.

### 4.3 Monitoring and Observability Integration

- **Hardware layer**: utilization, VRAM, temperature, and power draw are collected via DCGM (NVIDIA) and npu-exporter (Ascend) at 15–30 second granularity.
- **Scheduling layer**: aggregated-model running tasks, weight distribution, routing ratios, and circuit-breaker events are tracked at 1-minute granularity.
- **Application layer**: RPM / TPM / TTFT / P95 / P99, success rate, and token metering, broken down by tenant and by model.

---
