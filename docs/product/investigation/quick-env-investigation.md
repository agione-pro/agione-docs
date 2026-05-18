# Environment Quick Assessment

This document is used before AGIOne local deployment or cloud-native deployment to determine whether the environment meets installation prerequisites, identify delivery risks, and produce a remediation and go-live checklist.

> 📥 **Download fillable template:** <a href="/downloads/AGIOne_Environment_Quick_Assessment.xlsx" download>Environment Quick Assessment (.xlsx)</a>

## 1. Document Information

| Field | Value |
| --- | --- |
| Project | AGIOne Platform |
| Assessment Date | `<YYYY-MM-DD>` |
| Customer or Site | `<customer/site>` |
| Deployment Type | Local deployment; Cloud-native deployment |
| Environment Type | Development; Testing; Production |
| Assessor | `<name>` |
| Owner | `<name>` |
| Overall Verdict | Pass; Conditional Pass; Blocked |

## 2. Assessment Goals

- Confirm whether the target environment can install and run AGIOne.
- Identify risks before installation, especially resource, network, package, permission, storage, and operation risks.
- Produce a clear remediation list with owners and deadlines.
- Produce a go-live checklist for final installation approval.

## 3. Deployment Scope

| Scope | Local Deployment | Cloud-Native Deployment |
| --- | --- | --- |
| Runtime Model | Docker / Docker Compose on physical servers or VMs | Kubernetes, container registry, Ingress, storage, and platform components |
| Common Pattern | All-in-one single node; host-mode multi-node | Existing Kubernetes cluster; AGIOne-managed kube-cluster delivery |
| Minimum Node Count | Single-node: 1; host-mode multi-node: 4 | Based on cluster design and workload size |
| Main Verification | Host resources, SSH, Docker, offline bundle, ports, runtime directories | Kubernetes readiness, registry, StorageClass, Ingress, node resources, namespace permissions |

## 4. Quick Verdict Rules

| Verdict | Criteria | Action |
| --- | --- | --- |
| Pass | All critical prerequisites are satisfied and no blocking risks remain. | Proceed with installation approval. |
| Conditional Pass | Installation can proceed after controlled remediation or with accepted non-blocking risks. | Track open items in the remediation list and confirm risk acceptance. |
| Blocked | Any critical prerequisite is missing, such as insufficient nodes, unreachable SSH, missing bundle assets, unavailable storage, or conflicting network CIDR. | Stop installation until the blocking issue is fixed. |

## 5. Local Deployment Prerequisites

### 5.1 Host Resources

| Item | Minimum or Recommended Requirement | Assessment Result | Verdict |
| --- | --- | --- | --- |
| CPU | Recommended 8 cores per AGIOne application node. | `<value>` | `<Pass/Fail>` |
| Memory | Recommended 16 GiB per AGIOne application node; the installer may tolerate minor reserved memory loss. | `<value>` | `<Pass/Fail>` |
| Disk | Recommended 200 GiB available for `/opt/hyperone`; the installer may tolerate filesystem reservation loss. | `<value>` | `<Pass/Fail>` |
| OS | Linux server with stable package/runtime compatibility. | `<value>` | `<Pass/Fail>` |
| User Permission | Root or equivalent privilege to write `/opt`, install Docker, and manage services. | `<value>` | `<Pass/Fail>` |

### 5.2 Single-Node Local Deployment

| Check Item | Requirement | Result |
| --- | --- | --- |
| Target Host | One reachable Linux host. | `<value>` |
| Runtime Directory | `/opt/hyperone` is writable and has enough capacity. | `<value>` |
| Installer Directory | `/opt/agione-installer-bundle` can be created or overwritten with approval. | `<value>` |
| Offline Python | Bundle provides offline Python or host provides supported Python. | `<value>` |
| Docker Runtime | Docker / Compose exists or can be installed from offline assets. | `<value>` |

### 5.3 Host-Mode Multi-Node Local Deployment

| Check Item | Requirement | Result |
| --- | --- | --- |
| Node Count | At least 4 machines: 2 application nodes, 1 middleware node, and 1 standby database node. | `<value>` |
| Extra Application Nodes | Additional nodes can be treated as extra application nodes. | `<value>` |
| SSH Access | Controller can connect to all nodes through SSH, preferably with passwordless root access. | `<value>` |
| Node IP Stability | Node IPs are fixed during installation and operation. | `<value>` |
| Time Sync | System time is synchronized across all nodes. | `<value>` |
| Runtime Directories | `/opt/hyperone`, `/opt/agione-installer-bundle`, and `/opt/agione-python` are writable on every node. | `<value>` |
| Existing Data | Existing `/opt/hyperone` data has been reviewed, backed up, or approved for cleanup. | `<value>` |
| Database Replication | Primary and standby database nodes are assigned, and standby rebuild data-loss risk is accepted when required. | `<value>` |

### 5.4 Local Network and Ports

| Port or Network | Purpose | Requirement | Result |
| --- | --- | --- | --- |
| `22` | SSH operations | Controller can reach all nodes. | `<value>` |
| `18090` | AGIOne Web entry | Client can access the Nginx gateway node. | `<value>` |
| `80` / `8089` | Nginx and job proxy | Not occupied by unmanaged processes. | `<value>` |
| `3306` | MariaDB | Application and standby database nodes can reach the primary database node. | `<value>` |
| `6379` | Redis | Application nodes can reach middleware node. | `<value>` |
| `8848` / `8849` | Nacos | Application nodes can reach Nacos. | `<value>` |
| `9000` / `9001` | MinIO | Application nodes and operators can reach object storage as needed. | `<value>` |
| `9092` | Kafka | Application nodes can reach Kafka. | `<value>` |
| Docker Network | Docker bridge address pools | Address pools must not overlap with customer networks. | `<value>` |

## 6. Cloud-Native Deployment Prerequisites

### 6.1 Kubernetes Cluster

| Check Item | Requirement | Result |
| --- | --- | --- |
| Cluster Access | `kubectl` access is available with the target kubeconfig. | `<value>` |
| Namespace Permission | The operator can create and manage namespaces, workloads, services, secrets, config maps, and ingress resources. | `<value>` |
| Node Readiness | All planned nodes are `Ready`, schedulable, and stable. | `<value>` |
| Kubernetes Version | Version is confirmed against the AGIOne delivery package compatibility matrix. | `<value>` |
| Resource Quota | Namespace quota and limit ranges can satisfy AGIOne workloads. | `<value>` |
| CNI | Pod-to-Pod and Service networking are healthy; cluster CIDR does not conflict with customer networks. | `<value>` |

### 6.2 Registry, Images, and Offline Delivery

| Check Item | Requirement | Result |
| --- | --- | --- |
| Container Registry | Registry is reachable from all cluster nodes. | `<value>` |
| Registry Authentication | Credentials are available and can be stored as Kubernetes secrets. | `<value>` |
| Image Import | Offline images can be imported or pushed before deployment. | `<value>` |
| Image Pull Test | A sample workload can pull images successfully. | `<value>` |
| Package Integrity | Bundle checksum verification is completed before installation. | `<value>` |

### 6.3 Storage

| Check Item | Requirement | Result |
| --- | --- | --- |
| StorageClass | A default or specified StorageClass is available. | `<value>` |
| ReadWriteOnce | Database and middleware persistent volumes can be provisioned. | `<value>` |
| ReadWriteMany | Shared storage is available if required by the selected deployment design. | `<value>` |
| Capacity | Capacity is sized for database, MinIO/object storage, logs, and model artifacts. | `<value>` |
| Backup | Backup and restore policies are defined and tested for stateful components. | `<value>` |

### 6.4 Ingress, DNS, and Certificates

| Check Item | Requirement | Result |
| --- | --- | --- |
| Ingress Controller | Ingress controller or load balancer is available. | `<value>` |
| Domain Name | Product access domains are planned and resolvable. | `<value>` |
| TLS Certificate | Certificates are prepared if HTTPS is required. | `<value>` |
| External Access | Client networks can reach the AGIOne entry point. | `<value>` |
| Internal Service Access | Internal services can resolve and reach each other. | `<value>` |

### 6.5 Observability and Operations

| Check Item | Requirement | Result |
| --- | --- | --- |
| Logging | Application, middleware, Kubernetes, and ingress logs are retained. | `<value>` |
| Monitoring | Node, container, workload, database, and storage metrics are observable. | `<value>` |
| Alerting | Critical alerts are configured for resource pressure, service health, and storage capacity. | `<value>` |
| Upgrade Window | Maintenance windows and rollback plans are defined. | `<value>` |
| Operation Account | Operation accounts, audit requirements, and access boundaries are confirmed. | `<value>` |

## 7. Shared Checks

| Check Item | Requirement | Result |
| --- | --- | --- |
| Network Policy | Required networks, firewall rules, security groups, and routing are confirmed. | `<value>` |
| Time Sync | NTP or equivalent time synchronization is enabled. | `<value>` |
| DNS | Internal and external domain resolution is stable. | `<value>` |
| Proxy | HTTP/HTTPS proxy requirements are confirmed, or no proxy is required. | `<value>` |
| Offline Mode | Internet access policy is clear; offline assets are complete if the environment is isolated. | `<value>` |
| Security Baseline | Antivirus, host hardening, audit, and password policies will not block installation or runtime. | `<value>` |
| Backup and DR | Backup scope, retention, recovery objective, and responsible team are confirmed. | `<value>` |

## 8. Risk Register

| ID | Risk | Impact | Severity | Owner | Mitigation | Status |
| --- | --- | --- | --- | --- | --- | --- |
| R-001 | Insufficient CPU, memory, or disk. | Installation failure or unstable runtime. | High | `<owner>` | Add resources or reduce deployment scope after approval. | `<status>` |
| R-002 | SSH or node connectivity failure. | Host-mode multi-node installation cannot continue. | High | `<owner>` | Fix routing, firewall, credentials, or SSH key distribution. | `<status>` |
| R-003 | Port conflict. | Services fail to start or traffic is routed incorrectly. | High | `<owner>` | Release occupied ports or adjust approved ports. | `<status>` |
| R-004 | Missing or corrupted offline assets. | Installation cannot complete or images cannot load. | High | `<owner>` | Rebuild or reacquire the bundle and verify checksums. | `<status>` |
| R-005 | Existing runtime data not reviewed. | Reinstall may overwrite or mix old data. | High | `<owner>` | Backup, clean, or explicitly approve overwrite. | `<status>` |
| R-006 | Kubernetes storage is not ready. | Stateful workloads cannot start or persist data. | High | `<owner>` | Provide tested StorageClass and backup policy. | `<status>` |
| R-007 | Registry or image pull failure. | Cloud-native workload rollout fails. | High | `<owner>` | Validate registry access and image pull secrets. | `<status>` |
| R-008 | Incomplete DNS, TLS, or external access planning. | Users cannot access AGIOne after deployment. | Medium | `<owner>` | Confirm domain, certificate, load balancer, and routing. | `<status>` |

## 9. Remediation List

| ID | Finding | Required Fix | Owner | Due Date | Verification Method | Status |
| --- | --- | --- | --- | --- | --- | --- |
| A-001 | `<finding>` | `<fix>` | `<owner>` | `<date>` | `<command/evidence>` | `<status>` |
| A-002 | `<finding>` | `<fix>` | `<owner>` | `<date>` | `<command/evidence>` | `<status>` |
| A-003 | `<finding>` | `<fix>` | `<owner>` | `<date>` | `<command/evidence>` | `<status>` |

## 10. Installation Approval Checklist

| Checklist Item | Required Evidence | Confirmed |
| --- | --- | --- |
| Deployment scope is confirmed. | Approved deployment scope and module list. | `<Yes/No>` |
| Server or cluster resource check is passed. | Resource report, `df -h`, `free -h`, CPU count, or Kubernetes node report. | `<Yes/No>` |
| Network and port check is passed. | Connectivity and port check records. | `<Yes/No>` |
| Runtime directories or namespaces are ready. | Directory permission result or Kubernetes namespace check. | `<Yes/No>` |
| Offline or online package strategy is confirmed. | Bundle manifest, checksum report, registry import evidence. | `<Yes/No>` |
| Existing data handling is approved. | Backup record, cleanup approval, or overwrite approval. | `<Yes/No>` |
| Backup and rollback plan is ready. | Backup plan, rollback steps, responsible team. | `<Yes/No>` |
| Operation and monitoring plan is ready. | Monitoring, logging, alerting, and support handover records. | `<Yes/No>` |
| All high risks are closed or accepted. | Risk register sign-off. | `<Yes/No>` |

## 11. Post-Installation Verification Checklist

| Check Item | Local Deployment Evidence | Cloud-Native Deployment Evidence | Confirmed |
| --- | --- | --- | --- |
| Installer result | Installation report shows success. | Helm/operator/job result shows success, if applicable. | `<Yes/No>` |
| Service status | `./agione ps` and `./agione health` pass. | Pods are running and readiness probes pass. | `<Yes/No>` |
| Web access | `http://<gateway-ip>:18090/modelone/` is reachable. | Product domain or Ingress endpoint is reachable. | `<Yes/No>` |
| Middleware health | MariaDB, Redis, Nacos, Kafka, and MinIO are healthy. | Stateful workloads and services are healthy. | `<Yes/No>` |
| Database replication | Primary/standby replication is healthy when enabled. | Database HA policy is verified when applicable. | `<Yes/No>` |
| Application initialization | Initialization targets are completed. | Initialization jobs or migration jobs are completed. | `<Yes/No>` |
| Handover package | `./agione handover` output is archived. | Deployment manifests, kubeconfig scope, and operation docs are archived. | `<Yes/No>` |

## 12. Final Sign-Off

| Role | Name | Decision | Date | Signature |
| --- | --- | --- | --- | --- |
| Customer Owner | `<name>` | `<Pass/Conditional Pass/Blocked>` | `<date>` | `<signature>` |
| Delivery Owner | `<name>` | `<Pass/Conditional Pass/Blocked>` | `<date>` | `<signature>` |
| Operations Owner | `<name>` | `<Pass/Conditional Pass/Blocked>` | `<date>` | `<signature>` |
