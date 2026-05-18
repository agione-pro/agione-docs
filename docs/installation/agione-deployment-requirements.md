# AGIOne Deployment Configuration Requirements

> This document specifies the deployment prerequisites for AGIOne in both Production and PoC environments, covering hardware specifications, software dependencies, network configuration, and account/permission requirements. Final confirmation shall be made against the delivery bundle compatibility matrix, driver versions, and on-site assessment results before actual delivery.

---

## 1. Document Overview

| Item | Description |
| ---- | ----------- |
| Scope | AGIOne full-stack deployment solution design, pre-sales support, PoC assessment, and production delivery |
| Constraint Level | This document serves as a planning reference. Official delivery shall be governed by the Release Note and compatibility matrix distributed with `agione-bundle-set-<version>.tar.gz` |

---

## 2. Deployment Topology Overview

| Deployment Topology | Status | Typical Use Case |
| ------------------- | ------ | ---------------- |
| All-in-One (Single Node) | Supported | Demos, testing, PoC, small-scale deployment |
| Host-Mode Multi-Node (On-Premise) | Supported | Minimum 4 machines: 2 application nodes + 1 middleware node + 1 database standby node |
| Kubernetes / Cloud-Native | Supported | Existing K8s cluster or AGIOne-delivered kube-cluster |
| On-Premise (Private) | Supported | Enterprise intranet, IDC, private cloud, dedicated cloud |
| Offline or Low-Bandwidth | Supported | No public internet or restricted public internet environments |

> **Note:** Single-node deployment is not suitable for carrying high-availability production workloads. A multi-management-node high-availability architecture is recommended for production environments.

---

## 3. Hardware Configuration Requirements

### 3.1 Management Nodes

Hosts AGIOne core services, databases, middleware, and K8s management plugins.

| Worker Node Scale | K8s Resource Requirement | AGIOne Service Resource Requirement | Minimum Node Count |
| ----------------- | ----------------------- | ----------------------------------- | ------------------ |
| 1–5 nodes | 1C 4GiB | 7C 12GiB | 3 |
| 6–10 nodes | 2C 8GiB | 7C 12GiB | 3 |
| 11–100 nodes | 4C 16GiB | 12C 24GiB | 3 |
| 101–250 nodes | 8C 32GiB | 12C 24GiB | 3 |
| 251–500 nodes | 16C 64GiB | 24C 48GiB | 3 |
| 500+ nodes | 32C 128GiB | 32C 64GiB | 3 |

> - Management nodes **do not require** XPU (GPU/NPU/TPU) configuration.
> - For production environments, a **≥3 node high-availability deployment** is recommended. A single-node alternative (≥16C / ≥32GiB) is only suitable for testing/PoC.
> - Shared storage (Block Storage) is **recommended**; system disk should be ≥1024 GiB.
> - The total number of worker nodes is recommended to be kept **under 1000**.

### 3.2 XPU / NPU Compute Nodes (Worker Nodes)

Hosts inference instances, IDE, and K8s worker node services (kubelet, proxy, etc.).

| Node Type | CPU (Reserved) | Memory (Reserved) | System Disk | Data Disk | Node Count |
| --------- | -------------- | ----------------- | ----------- | --------- | ---------- |
| XPU Resource Node | ≥16 cores | ≥32 GiB | ≥100 GiB | ≥2048 GiB | ≥1 |
| Ascend NPU Node | ≥8 cores (reserved) | ≥16 GiB (reserved) | ≥200 GiB | — | ≥1 |

> - Each compute node **requires at least 1 XPU** (GPU, NPU, TPU, etc.).
> - Within the same Kubernetes cluster, it is recommended to manage nodes with **identical CPU architectures** to avoid scheduling instability caused by mixed heterogeneous architectures.
> - Ascend NPU node exposed ports: `6443`, `8090`, `32761`–`32765/TCP`.

### 3.3 Shared Storage

| Type | System Disk | Node Count Requirement |
| ---- | ----------- | ---------------------- |
| Shared Storage (NAS/IPFS, etc.) | ≥2048 GiB | ≥2 (recommended) |

> Shared storage is used for model weights, images, logs, MinIO, database, and middleware persistent storage. Management nodes and worker nodes may share the same deployment or be deployed separately.

---

## 4. Software Configuration Requirements

### 4.1 Operating System Support

| Operating System | Support Status | Notes |
| ---------------- | -------------- | ----- |
| Ubuntu 22.04 | **Recommended** | Preferred for production |
| Ubuntu 20.04 | Optional | Within the recommended scope |
| CentOS / Rocky 7.x / 8.x | Conditionally Supported | Requires on-site verification |
| Kylin / UOS | Requires Assessment | Must be confirmed against the delivery bundle |
| Single-Node Minimum Spec | 8 cores / 16 GiB / 200 GiB available disk | For All-in-One / PoC only |

### 4.2 Base Software Dependencies

| Component | Recommended Version | Notes |
| --------- | ------------------- | ----- |
| Docker | Docker 24.x+ | Must match the operating system, kernel, image package, and offline installation method |
| Docker Compose | — | Automatically installed or repaired by the AGIOne installer |
| Kubernetes | 1.24–1.29 | Must be verified against the delivery bundle, GPU/NPU plugins, CNI, CSI, and Ingress Controller |
| Helm | Helm 3.10+ | Applicable only to Helm/Chart delivery topology |
| Python | Provided by the bundle's built-in offline runtime | No need to pre-install python3 on target machines |

### 4.3 Middleware Components

| Component | Default Port | Notes |
| --------- | ------------ | ----- |
| MariaDB | 3306 | Database persistent storage; backup and recovery must be confirmed prior to deployment |
| Redis | 6379 | Cache and session management; password consistency must be confirmed prior to deployment |
| Nacos | 8848 / 8849 | Configuration center, service registration and discovery |
| Kafka | 9092 | Message queue |
| MinIO | 9000 / 9001 | Object storage (logs, model artifacts, etc.) |
| OpenResty / Nginx | 80 / 443 | Ingress proxy, job access proxy |

---

## 5. Network Configuration Requirements

### 5.1 Network Segmentation

| Network Type | Requirement | Description |
| ------------ | ----------- | ----------- |
| Internal Network | **Mandatory** | Management nodes and XPU compute nodes connected via internal LAN |
| External Internet | **Recommended** | Access to external internet (for model downloads, license verification, etc.) |
| RDMA Network | **Optional** | Not strictly required for single-card inference; for multi-node multi-card inference or training, 100Gbps+ RDMA is recommended |

### 5.2 Critical Ports

| Port / Protocol | Purpose | Associated Node |
| --------------- | ------- | --------------- |
| `18090/TCP` | Console Web entry (default) | Management Node |
| `443/HTTPS` | External HTTPS entry (optional) | Management Node |
| `80/TCP` | Nginx ingress | Management Node |
| `8089/TCP` | Job access proxy entry | Management Node |
| `3306/TCP` | MariaDB | Management Node |
| `6379/TCP` | Redis | Management Node |
| `8848/8849/TCP` | Nacos | Management Node |
| `9000/9001/TCP` | MinIO API / Console | Management Node |
| `9092/TCP` | Kafka | Management Node |
| `6443/TCP` | Kubernetes API Server | Ascend NPU Node |
| `8090/TCP` | Service Port | Ascend NPU Node |
| `32761`–`32765/TCP` | Compute Node Communication Ports | Ascend NPU Node |

> **Note:** The document contains multiple port expressions (`443`, `18090`, `80`, `8089`) that distinguish external HTTPS entry, portal/API entry, Nginx entry, and job access proxy entry. A unified port planning table should be finalized before formal deployment.

### 5.3 Network Requirements Checklist

| Requirement Item | Description |
| ---------------- | ----------- |
| Inter-Node Intranet Connectivity | Management nodes and compute nodes must be connected via a local LAN |
| SSH Reachability | Deployment operations require SSH access to target hosts |
| Time Synchronization | Multi-node deployments require NTP or equivalent time synchronization; clock skew should be controlled within 1 second |
| DNS Resolution | Ingress / DNS / TLS relies on DNS resolution; external access and certificate verification must be confirmed before going live |
| Container Registry Reachability | Cloud-native deployments require all nodes to access the container registry; verify registry, authentication secrets, and image pull in advance |
| Firewall Rules | Confirm that the above ports are open in the firewall or security group |

---

## 6. Account and Permission Requirements

### 6.1 Operating System Accounts

| Requirement | Description |
| ----------- | ----------- |
| Execution User | `root` or equivalent privileges recommended to avoid Docker, directory, and system service permission issues |
| SSH Permissions | Deployment operations require root or sudo privileges on target hosts |
| Directory Write Permissions | Write access to the `/opt/hyperone` partition is required (recommended available space of 200 GiB or more) |

### 6.2 AGIOne System Account Hierarchy

| Role | Identity | Description |
| ---- | -------- | ----------- |
| `operator` | Operations Administrator | Unique operations role across the platform |
| `normal` | Standard User | Regular business operations |

### 6.3 Kubernetes Permissions (Cloud-Native Deployment)

| Requirement | Description |
| ----------- | ----------- |
| Valid kubeconfig | Operational credentials for the target cluster |
| Namespace Access | Sufficient read/write permissions to namespaces |
| Nodes Ready | All target nodes must be in Ready state |
| StorageClass | RWO persistent volumes (database, middleware) and RWX shared storage (models, logs) must be ready |
| Ingress Controller | Ingress controller available; domain names and certificates ready |

---

## 7. Storage Configuration Requirements

| Storage Type | Purpose | Recommended Spec |
| ------------ | ------- | ---------------- |
| Block Storage (Management Node) | Database, MinIO persistence | ≥400 GiB |
| Shared Storage (NAS/IPFS) | Model weights, images, logs | ≥2048 GiB |
| Local Disk (All-in-One) | `/opt/hyperone` runtime directory | ≥200 GiB (detection tolerance approximately 160 GiB or more) |

> - For production environments, a **20%–30% resource buffer** is recommended.
> - Cloud-native deployments require prior verification of PVC creation, mounting, and backup/recovery procedures.
> - Database primary/standby configuration, backup strategy, and rollback plan must be confirmed before deployment.

---

## 8. Quick Reference: PoC Environment Configuration

Applicable to small-scale scenarios such as demos, testing, and PoC (All-in-One single-node deployment).

| Item | Recommended Value | Notes |
| ---- | ----------------- | ----- |
| Operating System | Ubuntu 22.04 LTS | Linux |
| CPU | 8 cores | Detection allows for minor reservation-related deduction; approximately 7.6 cores or more will pass |
| Memory | 16 GiB | Detection allows for minor system reservation-related deduction; approximately 15.2 GiB or more will pass |
| Available Disk | 200 GiB | For the `/opt/hyperone` partition; detection allows approximately 20% filesystem reservation deduction; approximately 160 GiB or more will pass |
| Execution User | `root` | Root installation recommended |
| Installation Method | `./agione quick` | One-command execution for unpacking, checking, configuration, image loading, and service startup |
| Access Endpoint | `http://<host>:18090/modelone/` | As output by the installation result |

### PoC Quick Verification Checklist

```bash
# 1. Upload and extract the bundle
scp agione-bundle-set-<version>.tar.gz root@<target>:/opt/hyperone/
cd /opt/hyperone && tar -zxvf agione-bundle-set-<version>.tar.gz

# 2. One-step installation
chmod +x ./agione
./agione quick

# 3. Post-installation health check
./agione health
./agione ps

# 4. Browser access
# http://<target-ip>:18090/modelone/

# 5. Export the handover package (recommended)
./agione handover
```

---

## 9. Reference: Production High-Availability Configuration

Applicable to production-grade high-availability deployments.

| Item | Recommended Configuration |
| ---- | ------------------------- |
| Management Nodes | ≥3 nodes for high availability |
| Database | MariaDB primary/standby + periodic backup |
| Redis | Primary/standby or cluster mode |
| Shared Storage | High-availability storage such as NAS / NFS / Ceph |
| Load Balancing | Ingress Controller + domain name + TLS certificate |
| Monitoring & Alerting | Log retention, monitoring, alerting, escalation windows, and rollback plans ready |
| Resource Buffer | 20%–30% resource buffer recommended for production |

---

## 10. Known Limitations and Items Pending Confirmation

| Category | Item Pending Confirmation | Current Status |
| -------- | ------------------------- | -------------- |
| CUDA Version Matrix | Compatibility between GPU drivers, CUDA versions, and inference engines | No fixed version declared; must be confirmed against the delivery bundle |
| GPU Driver Version | Correspondence between GPU models and driver versions | Only chip models confirmed; driver versions not yet specified |
| Ascend Software Stack | CANN, MindIE, driver, and model adaptation versions | Only Ascend910B/910C support confirmed |
| Model VRAM and Card Count | Minimum specs per model (FP16/BF16/INT8/INT4), tensor parallelism strategy | Current list only identifies model names |
| API Protocol Scope | Field compatibility for OpenAI / Anthropic and other protocols | Pending confirmation based on official product version |
| Unified Port Planning | Formal network port planning table | Multiple port expressions exist in the document and need to be unified |
