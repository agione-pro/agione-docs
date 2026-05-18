# AGIOne Environment Installation and Deployment Guide

The AGIOne installer is used to complete AGIOne single-node delivery installation in offline or restricted-network environments. This document is organized as "quick installation first, detailed configuration next, and operations troubleshooting last". Installation engineers can start with **Quick Install**.

Before installation, complete the quick environment investigation to confirm whether the environment meets deployment prerequisites and to identify remediation items and go-live risks:

- [Quick Environmental Investigation](/product/investigation/quick-env-investigation)

---

## Host Specification

Recommended request profile:

| Item | Recommended Value | Description |
| --- | --- | --- |
| Operating system | Linux | Ubuntu 22.04 |
| CPU | 8 cores | CPU must be at least 8 cores |
| Memory | 16 GiB | A small OS or virtualization reservation is tolerated; about `15.2GiB` or above can pass |
| Free disk | 200 GiB | The partition hosting `/opt/hyperone` tolerates about 20% filesystem reservation; about `160GiB` or above can pass |
| Execution user | `root` | Root installation is recommended to avoid Docker, directory permission, and system service permission issues |

## Quick Install

### 1. Upload bundle

Upload `agione-release-v1.0-20260513.tar.gz` to the target host, for example:

```bash
scp -r agione-release-v1.0-20260513.tar.gz root@<target-host>:/opt/hyperone/
ssh root@<target-host>
cd /opt/hyperone && \
tar -zxvf agione-release-v1.0-20260513.tar.gz && \
cd /opt/hyperone/agione-release-v1.0-20260513
```

### 2. One-click installation

Use `quick` as the recommended path. It automatically completes unpacking, environment checks, and installation:

```bash
chmod +x ./agione
./agione quick
```

The installer automatically performs:

1. runs pre-install checks in the temporary `/tmp/agione-quick-check.*` workspace
2. refreshes the bundle to `/opt/agione-installer-bundle` after checks pass
3. prepares the offline Python runtime
4. checks offline assets
5. renders configuration and Compose files
6. installs or repairs Docker / Compose
7. loads offline images
8. starts AGIOne services
9. imports Nacos configuration
10. prints the installation result and service list

### 3. View installation result

After installation succeeds, `quick` prints the actual access entry and default account information at the end of the terminal output. `quick` uses English output by default, in the following format:

```text
Installation Result:
Console URL: http://<target-host-ip>:18090/

Access Information (Account/Password):
admin .system.admin.123./
operator .system.admin.123./
manager .system.admin.123./
```

You can also run:

```bash
./agione health
./agione ps
```

### 4. Browser access

Default access URL:

```text
http://<target-host-ip>:18090/modelone/
```

If a domain name or custom port is used, follow the `domain` / `public_port` values in the installation configuration.

---

## Home

### What the AGIOne installer does

The AGIOne installer is responsible for:

- unpacking offline delivery artifacts to standard runtime directories
- checking host environment, resources, Docker, Compose, ports, and basic commands
- rendering installation configuration and `compose.rendered.yaml`
- loading offline Docker images and starting AGIOne services
- importing Nacos configuration and waiting for core service registration
- printing installation results, service status, diagnostic reports, and handover packages

### Recommended reading path

- **First installation**: read [Quick Install](#quick-install)
- **Graphical interaction required**: read [Advanced Installation](#advanced-installation)
- **Installation failure or delivery acceptance**: read [Operations Documentation](#operations-documentation)
- **Force install, skip checks, or data recovery**: read [FAQ](#faq)

### Standard directories

| Type | Path |
| --- | --- |
| Release source directory | `agione-release-v1.0-YYYYMMDD` |
| Installer runtime directory | `/opt/agione-installer-bundle` |
| AGIOne runtime data directory | `/opt/hyperone` |
| Offline Python runtime | `/opt/agione-python` |
| Installation reports and diagnostics | `/opt/agione-installer-bundle/reports` or the `reports` directory in the current bundle |

---

## Getting Started

### Pre-install checks

Before the first delivery, run:

```bash
./agione doctor
```

`doctor` generates diagnostic reports and support bundles, suitable for quick issue localization before installation or after failures. In first-installation scenarios, it uses a temporary `/tmp` check workspace and does not create `/opt/agione-installer-bundle`.

### Bundle verification

To confirm delivery artifact integrity:

```bash
./agione verify-bundle
```

Run installation only after verification passes.

---

## Advanced Installation

### TUI interactive installation

If you need to confirm parameters, resource policy, node information, and the installation plan page by page, use:

```bash
chmod +x ./agione
./agione install
```

The TUI flow includes:

1. Welcome
2. System Check
3. Offline Package Check
4. Module Selection
5. Basic Info
6. Node Input
7. Middleware Config
8. Resource Policy
9. Config Review
10. Start Install
11. Execute
12. Result

It is suitable for formal delivery, customer on-site demonstrations, or scenarios that require manual configuration confirmation.

### Configuration review

Before installation, generate a desensitized configuration review report:

```bash
./agione review-config
```

The report usually includes:

- installation mode
- access address
- database, Redis, Nacos, Kafka, and MinIO configuration summaries
- resource policy
- key paths
- risk prompts

### Resource policy

The installer supports two resource policies:

| Policy | Description |
| --- | --- |
| Docker default resource policy | Recommended by default; does not write `cpus` / `mem_limit` / `mem_reservation` into `compose.rendered.yaml` |
| Manual resource quota | Installation engineers fill CPU, memory limit, and memory reservation for each service |

For general delivery, use the default policy to avoid over-restricting service resources across different customer host specifications.

---

## Operations Documentation

### Common commands

```bash
./agione help
./agione ps
./agione health
./agione restart <service>
./agione stop <service>
./agione down
./agione doctor
./agione handover
```

### View service status

```bash
./agione ps
```

Or enter the installation directory and view Compose status:

```bash
cd /opt/agione-installer-bundle/outputs/agione-app
docker compose -f compose.rendered.yaml ps
```

If the system uses legacy Compose:

```bash
docker-compose -f compose.rendered.yaml ps
```

### Restart services

Restart all services:

```bash
./agione restart
```

Restart specified services:

```bash
./agione restart core_upms md_gateway nginx
```

### Health check

```bash
./agione health
```

The health check report is used for delivery acceptance and failure troubleshooting. Archive it after installation is complete.

### Diagnostic package

After an installation failure, run first:

```bash
./agione doctor
```

The diagnostic package usually includes:

- system check results
- configuration snapshots
- Compose file
- service status
- log summary
- failure classification and suggested commands

### Handover package

After successful installation, export a handover package:

```bash
./agione handover
```

The handover package can be used for customer acceptance, internal archiving, and later operations handover.

---

## FAQ

### Q1: How do I choose between `quick` and `install`?

- To install as quickly as possible: use `./agione quick`
- To confirm configuration step by step: use `./agione install`
- To only run checks without installation: use `./agione doctor`

### Q2: What if the target host does not have `python3`?

No manual installation is required. The bundle includes an offline Python runtime, and the installer prepares `/opt/agione-python` first.

### Q3: Why is detected memory not exactly 16 GiB after requesting 16G?

Cloud hosts, virtualization platforms, and operating systems reserve part of the memory, so the detected value is commonly `15.xGiB`. The installer allows a small reservation loss, and about `15.2GiB` or above can pass.

### Q4: Why is detected disk capacity slightly smaller after requesting 200G?

Disk vendor units, filesystem metadata, and system reserved space can make actual available space smaller than the nominal value. The installer allows about 20% tolerance, and about `160GiB` or above can pass.

### Q5: Can system check failures be skipped?

Skipping is not recommended. System check failures usually mean later risks such as OOM, initialization timeout, service registration failure, or slow database startup.

If it is confirmed to be a temporary integration or demo environment, follow the installer UI prompt to execute the hidden override action. `quick` mode also supports:

```bash
./agione quick --skip-system-check
```

This parameter only skips pre-install checks. During execution, the installer still checks and attempts to use offline assets to install or repair Docker / Compose. Skipping checks may expose resource, port, or runtime issues only after runtime data has been unpacked. It is not recommended for formal delivery.

### Q6: When should force clean installation be used?

Use it only when you confirm that old data on the target host can be cleaned and you want to rebuild the environment from the baseline package.

```bash
./agione unpackage --force-clean-install
```

Force installation first backs up existing AGIOne service data, then deletes old runtime data and extracts the new baseline.

### Q7: Where is the force installation backup stored?

Default path:

```text
/opt/hyperone/backups/force-restore/<timestamp>/all-service-data/
```

Force installation does not automatically restore old data. To restore, stop services first and then restore according to the directory.

### Q8: What should I do if Nacos configuration is missing or services fail to start?

Run first:

```bash
./agione doctor
./agione health
./agione ps
```

Then view failed service logs:

```bash
docker logs <container-name> --tail 300
```

Common causes include missing Nacos configuration import, inconsistent Redis password, database not ready, images not loaded, or insufficient host resources.

### Q9: What information should be handed over after installation?

At minimum, hand over:

- access address
- admin account or initial account information
- `/opt/agione-installer-bundle` path
- `/opt/hyperone` path
- `health` report
- `handover` package
- if force installation is used, record the backup path

---

## Appendix: Recommended Installation Flow

```bash
# 1. Enter the bundle directory
cd /opt/hyperone/agione-release-v1.0-20260513

# 2. Grant execute permission to the entry script
chmod +x ./agione

# 3. Optional: verify the bundle
./agione verify-bundle

# 4. One-click installation
./agione quick

# 5. Acceptance
./agione health
./agione ps

# 6. Export handover package
./agione handover
```
