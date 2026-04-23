# Managed Chips

## Compatibility List

The following chip list has been verified and tested by the AGIOne official team. There may be compatibility issues or functional limitations when using other chips not listed, and AGIOne makes no express or implied warranty in such cases. If using non-listed chips, it is recommended to contact us before deployment.

| Vendor | Architecture/Series | Model |
| --- | --- | --- |
| NVIDIA | Hopper | H800 |
| NVIDIA | Hopper | H200 |
| NVIDIA | Hopper | H100 |
| NVIDIA | Hopper | H20 |
| NVIDIA | Ampere | A100 |
| NVIDIA | Ampere | A800 |
| NVIDIA | Ampere | A40 |
| NVIDIA | Ampere | A30 |
| NVIDIA | Ampere | A10 |
| NVIDIA | Ampere | RTX A6000 |
| NVIDIA | Ampere | RTX A5000 |
| NVIDIA | Ampere | RTX A4000 |
| NVIDIA | Ampere | RTX A2000 |
| NVIDIA | Ampere | RTX 3090 |
| NVIDIA | Ampere | RTX 3060 |
| NVIDIA | Ada | L40 |
| NVIDIA | Ada | L40S |
| NVIDIA | Ada | L20 |
| NVIDIA | Ada | L20S |
| NVIDIA | Ada | L4 |
| NVIDIA | Ada | L2 |
| NVIDIA | Ada | RTX 6000 |
| NVIDIA | Ada | RTX 5000 |
| NVIDIA | Ada | RTX 4500 |
| NVIDIA | Ada | RTX 4000 |
| NVIDIA | Ada | RTX 2000 |
| NVIDIA | Ada | RTX 4090 |
| NVIDIA | Ada | RTX 4090D |
| Huawei Ascend | Ascend 910 | Ascend 910B |
| Huawei Ascend | Ascend 910 | Ascend 910C |
| Enflame | Enflame | 106 |
| Biren | Biren | S60 |

## Version and Dependency Requirements (Example)

- Use validated driver version combinations
- Container runtime and GPU plugins must match kernel/driver compatibility
- In multi-node clusters, standardize driver versions across nodes

## Known Limitations (Example)

- Some legacy GPUs may be unstable under long-context inference workloads
- Mixed-chip clusters may be constrained by low-level driver compatibility for cross-node scheduling
- Some models may require chip-specific operators or conversion flows

## Evaluation Recommendations

- Run a 24-hour stability stress test before production go-live
- Benchmark key models per chip type as a baseline
- For non-recommended models, run PoC validation before production deployment