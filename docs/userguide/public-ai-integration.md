# Public Integration

## Document Purpose

This document describes how to connect public AI/compute resources to the platform for unified scheduling and governance.

## Prerequisites

- External resource endpoint and API credentials
- Network route from platform to external endpoint
- Tenant/project permissions to create integrations

## Integration Steps (Example)

1. Go to `Compute > Integration` and create a new integration.
2. Select provider type and enter endpoint/credential information.
3. Configure access policy, quota, and region tags.
4. Run connection test and save configuration.

## Validation Checklist (Example)

- Connection test returns success
- Resource appears in integration inventory
- Quota policy is applied to target project
- At least one test workload can be scheduled successfully
