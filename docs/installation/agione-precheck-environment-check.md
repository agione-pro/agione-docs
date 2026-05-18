# AGIOne Pre-install Environment Check Guide

This document describes how to run a precheck / doctor workflow before executing `./agione quick` or `./agione install`. It focuses on driver, CUDA, disk, and port risks that should be identified before formal installation.

The purpose of the precheck is to find blocking issues as early as possible, instead of discovering insufficient resources, occupied ports, incompatible drivers, or unwritable runtime directories after the installation workflow has already started.

---

## Applicable Scenarios

| Scenario | Recommended | Description |
| --- | --- | --- |
| All-in-One single-node installation | Yes | Check CPU, memory, disk, ports, Docker, Compose, and basic commands before installation |
| Compute node with GPU / XPU | Yes | Additionally check drivers, CUDA / CANN, container runtime, and device visibility |
| Offline or restricted-network delivery | Yes | Confirm the bundle, offline images, offline Python runtime, and runtime directories |
| Reinstallation on an existing host | Yes | Confirm old data, old containers, occupied ports, and old directories before installation |

---

## Execution Methods

### Recommended: use installer doctor

The AGIOne installer can use `doctor` as the pre-install environment check:

```bash
cd /opt/hyperone/agione-release-v1.0-20260513
chmod +x ./agione
./agione doctor
```

`doctor` generates diagnostic reports and support bundles. It is suitable for archiving before formal installation and for troubleshooting after installation failures.

For first-time installation, `doctor` uses a temporary `/tmp` check workspace and does not create or overwrite `/opt/agione-installer-bundle`.

### If the bundle provides an independent precheck script

If the delivery bundle provides `precheck.sh` or a similar script, run it separately before installation:

```bash
chmod +x ./precheck.sh
./precheck.sh
```

The precheck script should cover at least the driver / CUDA, disk, port, and basic runtime environment checks listed in this document. The script output should use three result levels: `PASS`, `WARN`, and `FAIL`.

| Result | Meaning | Suggested Action |
| --- | --- | --- |
| `PASS` | Meets installation requirements | Continue to installation |
| `WARN` | Risk exists but may not block installation | Delivery owner must confirm whether to accept the risk |
| `FAIL` | Key prerequisite is not met | Stop installation, remediate, and run precheck again |

---

## Check Item Overview

| Category | Can Be Checked in Advance | Blocking Level | Description |
| --- | --- | --- | --- |
| Operating system and permissions | Yes | High | Confirm Linux distribution, root or equivalent permission, and basic commands |
| CPU / memory | Yes | High | All-in-One recommends 8 cores / 16 GiB |
| Disk space | Yes | High | The partition hosting `/opt/hyperone` recommends 200 GiB; about 160 GiB or above can pass the basic check |
| Port occupation | Yes | High | Local port occupation can be checked automatically; cross-node access must be verified with network policies |
| NVIDIA driver | Yes | Medium / High | Management nodes do not require GPU; compute nodes or local inference scenarios must be checked |
| CUDA | Yes | Medium / High | Must be confirmed with GPU driver, images, inference engine, and delivery bundle compatibility matrix |
| Docker / Compose | Yes | High | If installed, check version and status; if not installed, confirm it can be installed from offline assets |
| Offline assets | Yes | High | Run `./agione verify-bundle` as well |

---

## Driver and CUDA Checks

### Check principles

The AGIOne management node does not require GPU by default. If the target host also acts as a compute node, model inference node, or GPU resource management node, driver, CUDA, and container runtime checks must be completed before installation.

Driver / CUDA compatibility should not be judged by a single version number. Confirm the following together:

- GPU model
- NVIDIA Driver version
- CUDA Runtime / Toolkit version
- Inference engine version
- AGIOne delivery bundle and image versions
- Whether GPU container runtime is required

### Recommended commands

```bash
# Check whether GPU and driver are visible
nvidia-smi

# Check CUDA Toolkit. Missing nvcc is not always blocking; follow delivery bundle requirements.
nvcc --version

# Check kernel modules
lsmod | grep -i nvidia

# Check whether the container runtime recognizes NVIDIA, if the command exists
nvidia-container-cli info
```

### Acceptance criteria

| Check Item | Pass Criteria | Failure or Risk Signal |
| --- | --- | --- |
| `nvidia-smi` | Outputs GPU, Driver Version, and CUDA Version normally | Command missing, command error, or GPU not visible |
| Driver version | Compatible with GPU model, image, and delivery bundle | Driver too old, kernel mismatch, or module not loaded after reboot |
| CUDA version | Compatible with inference engine and image | CUDA version unclear or inconsistent with image requirements |
| GPU container runtime | GPU can be accessed inside containers | GPU devices are not visible after container startup |

### Notes

- The CUDA Version shown by `nvidia-smi` represents the CUDA capability supported by the driver. It is not always the same as the CUDA Toolkit installed on the system.
- If AGIOne only deploys the management plane, missing driver / CUDA should not block installation, but should be marked as "Not applicable" in the precheck report.
- If deployment includes local inference or compute resource management, unconfirmed driver / CUDA status should be treated as high risk.

---

## Disk Checks

### Check target

Focus on available space, write permission, and inode status for the partition hosting `/opt/hyperone`.

For All-in-One single-node installation, the partition hosting `/opt/hyperone` recommends 200 GiB free space. The installer tolerates about 20% filesystem reservation loss, and about 160 GiB or above can pass the basic check.

### Recommended commands

```bash
# Check capacity of the partition hosting /opt/hyperone
df -h /opt/hyperone 2>/dev/null || df -h /opt

# Check inode availability
df -ih /opt/hyperone 2>/dev/null || df -ih /opt

# Check whether the directory can be created and written
mkdir -p /opt/hyperone
touch /opt/hyperone/.agione-precheck-write-test
rm -f /opt/hyperone/.agione-precheck-write-test
```

### Acceptance criteria

| Check Item | Pass Criteria | Suggested Action |
| --- | --- | --- |
| Available space | Recommended 200 GiB, minimum about 160 GiB or above | Expand disk or change runtime directory if below threshold |
| Write permission | `root` or equivalent user can write to `/opt/hyperone` | Fix directory permission or use an account with sufficient permission |
| inode | inode usage is not close to 100% | Clean small files or adjust filesystem |
| Historical data | Confirm whether to keep, back up, or clean it | Complete data confirmation before reinstallation |

---

## Port Checks

### Check target

Port precheck contains two parts:

- Local port occupation check: confirm AGIOne ports are not occupied by unmanaged processes.
- Network connectivity check: confirm clients, management nodes, compute nodes, or middleware nodes can access required ports.

The precheck script can automatically complete local port occupation checks. Cross-host network connectivity still needs to be verified with firewall, security group, routing, and customer network policies.

### All-in-One key ports

| Port | Purpose | Precheck Focus |
| --- | --- | --- |
| `22/TCP` | SSH operations | Operations side can log in to the target host |
| `18090/TCP` | AGIOne Web entry | Not occupied; clients can access it |
| `80/TCP` | Nginx / OpenResty entry | Not occupied by unmanaged processes |
| `8089/TCP` | Job access proxy | Not occupied by unmanaged processes |
| `3306/TCP` | MariaDB | Not occupied by old database or other services |
| `6379/TCP` | Redis | Not occupied by old Redis or other services |
| `8848/8849/TCP` | Nacos | Not occupied by old Nacos or other services |
| `9000/9001/TCP` | MinIO API / Console | Not occupied by old MinIO or other services |
| `9092/TCP` | Kafka | Not occupied by old Kafka or other services |
| `443/TCP` | HTTPS entry, optional | Plan in advance if HTTPS is enabled |

### Recommended commands

```bash
# Check local listening ports
ss -lntup | grep -E ':(22|80|443|3306|6379|8089|8848|8849|9000|9001|9092|18090)\b'

# Or use lsof
lsof -iTCP -sTCP:LISTEN -P -n | grep -E ':(22|80|443|3306|6379|8089|8848|8849|9000|9001|9092|18090)\b'

# Verify entry port connectivity from client or other nodes
nc -vz <target-host-ip> 18090
nc -vz <target-host-ip> 22
```

### Acceptance criteria

| Check Item | Pass Criteria | Failure or Risk Signal |
| --- | --- | --- |
| Local port occupation | Ports are not occupied by non-AGIOne processes | Old services occupy ports and cause container startup failure |
| Firewall / security group | Access side can connect to target ports | Browser cannot access the page or services cannot reach each other |
| Port planning | Default or custom ports have been approved | Ports are changed temporarily during deployment, causing inconsistent access address and configuration |

---

## Recommended precheck Output

The precheck / doctor report should contain at least the following information:

| Module | Output |
| --- | --- |
| Host information | hostname, IP, operating system, kernel, CPU architecture |
| Resource information | CPU cores, memory, disk, inode, runtime directory permission |
| Driver and CUDA | GPU model, Driver, CUDA, container runtime, check conclusion |
| Ports | Occupying process, listening address, conflicting port list |
| Docker / Compose | Version, service status, whether offline installation is available |
| Offline assets | bundle manifest, checksum, image package, offline Python |
| Conclusion | PASS / WARN / FAIL, blocking items, remediation suggestions |

---

## Installation Admission Recommendations

Enter formal installation only after the following conditions are met:

1. `./agione doctor` or the precheck script has completed, and the report has been archived.
2. Basic items such as CPU, memory, disk, ports, and permissions are all `PASS`.
3. If GPU / XPU is involved, driver, CUDA / CANN, and container runtime have been confirmed.
4. All `FAIL` items have been remediated and passed recheck.
5. All `WARN` items have been accepted by the delivery owner and customer owner.
6. Offline delivery has passed `./agione verify-bundle`.

---

## Relationship with the Installation Workflow

Recommended execution sequence:

```bash
# 1. Upload and extract the release bundle
cd /opt/hyperone/agione-release-v1.0-20260513

# 2. Run the pre-install environment check
chmod +x ./agione
./agione doctor

# 3. Verify delivery artifact integrity
./agione verify-bundle

# 4. Formal installation
./agione quick

# 5. Post-install acceptance
./agione health
./agione ps
```

`precheck` or `doctor` is used to identify risks early. It does not replace the system checks in the installation workflow. During formal installation, `quick` still runs pre-install checks again and continues with unpacking, configuration, image loading, and service startup only after the checks pass.
