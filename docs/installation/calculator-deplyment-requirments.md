# (Calculator) Deployment Configuration Requirements

## Document Purpose

This document describes the deployment prerequisites for Calculator and is used as a baseline for environment assessment and resource planning.

## Resource Requirements (Example)

| Type | Minimum | Recommended |
|------|------|------|
| Application Node | 8 vCPU / 16 GB RAM / 200 GB disk | 16 vCPU / 32 GB RAM / 500 GB SSD |
| Compute Node | 16 vCPU / 64 GB RAM / 1x GPU | 32 vCPU / 128 GB RAM / multi-GPU |
| Data Storage | >= 300 GB available | >= 1 TB available |

## Software Requirements (Example)

- Supported Linux distribution and kernel versions
- Compatible container runtime and orchestration stack
- Stable DNS, NTP, and internal network services

## Pre-Delivery Check Recommendations

- Validate resource capacity and expected growth margin
- Confirm network routes and port opening policies
- Confirm installation account permissions and security approvals
