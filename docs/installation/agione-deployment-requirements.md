# (AGIOne) Deployment Configuration Requirements

## Document Purpose

This document defines the deployment prerequisites for AGIOne, including hardware, software, network, and access requirements for PoC and production environments.

## Resource Requirements (Example)

| Type | Minimum | Recommended |
|------|------|------|
| Control Node | 8 vCPU / 16 GB RAM / 200 GB disk | 16 vCPU / 32 GB RAM / 500 GB SSD |
| GPU Node | 16 vCPU / 64 GB RAM / 1x 24 GB+ GPU | 32 vCPU / 128 GB RAM / 2-4x 40 GB+ GPU |
| Shared Storage | >= 500 GB available | >= 2 TB available |

## Software Requirements (Example)

- OS: Ubuntu 20.04/22.04 or equivalent enterprise Linux
- Runtime: Docker 24.x+ or Kubernetes 1.24+
- GPU stack: NVIDIA Driver and CUDA versions must be compatible

## Network and Access Requirements (Example)

- Inter-node connectivity is required for control and data traffic
- Required service ports must be opened by policy
- Installation account with sufficient privileges must be provided
- Image registry and certificate access must be prepared in advance
