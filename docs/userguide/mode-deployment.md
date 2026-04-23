# Model Deployment

## Document Purpose

This document provides a quick guide for deploying models, validating runtime readiness, and handling common deployment checks.

## Prerequisites

- Available compute resources and runtime image
- Model artifact path (registry/object storage/local repository)
- Deployment permission for target project

## Deployment Steps (Example)

1. Go to `Model > Deployment` and click `Create`.
2. Select model source and runtime template.
3. Set replicas, resource limits, and route policy.
4. Submit deployment and wait for status `Running`.

## Validation Checklist (Example)

- Deployment status is healthy
- Inference endpoint is reachable
- Baseline test prompt returns expected response
- Logs show no startup or dependency errors
