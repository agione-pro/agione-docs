# 纳管芯片

## AGIOne纳管芯片兼容性列表

以下芯片列表已经过 AGIOne 官方团队验证测试。在使用其他未列出的芯片时，可能存在兼容性问题或功能限制，AGIOne 对此类情况不予任何明示或暗示的保证。若使用非列表芯片，建议在部署前请与我们联系。

| 厂商 | 架构/系列 | 型号 |
| --- | --- | --- |
| nvidia | Hopper | H800 |
| nvidia | Hopper | H200 |
| nvidia | Hopper | H100 |
| nvidia | Hopper | H20 |
| nvidia | Ampere | A100 |
| nvidia | Ampere | A800 |
| nvidia | Ampere | A40 |
| nvidia | Ampere | A30 |
| nvidia | Ampere | A10 |
| nvidia | Ampere | RTX A6000 |
| nvidia | Ampere | RTX A5000 |
| nvidia | Ampere | RTX A4000 |
| nvidia | Ampere | RTX A2000 |
| nvidia | Ampere | RTX 3090 |
| nvidia | Ampere | RTX 3060 |
| nvidia | Ada | L40 |
| nvidia | Ada | L40S |
| nvidia | Ada | L20 |
| nvidia | Ada | L20S |
| nvidia | Ada | L4 |
| nvidia | Ada | L2 |
| nvidia | Ada | RTX 6000 |
| nvidia | Ada | RTX 5000 |
| nvidia | Ada | RTX 4500 |
| nvidia | Ada | RTX 4000 |
| nvidia | Ada | RTX 2000 |
| nvidia | Ada | RTX 4090 |
| nvidia | Ada | RTX 4090D |
| ascend910 | Ascend 910 | Ascend 910B |
| ascend910 | Ascend 910 | Ascend 910C |
| enflame | Enflame | 106 |
| biren | Biren | S60 |

## 依赖要求（示例）

- 建议使用经过验证的驱动版本组合
- 容器运行时与 GPU 插件版本保持匹配
- 多机环境建议统一驱动与运行时版本

## 已知限制（示例）

- 老旧显卡在大上下文场景可能性能波动
- 混合芯片集群调度能力受底层兼容影响
- 个别模型可能需专用算子或转换流程
