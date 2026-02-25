# 3DR1 Budgeting Strategy

## Overview
The 3DR1 (Render-First Reasoning) layer ensures that the procedural generation and rendering remain within hardware constraints while maximizing visual fidelity.

## Phase 1: Evaluation (Render-First)
Before presenting a scene, the orchestrator performs a "Reasoning Pass":
1.  **Generate** a world based on the provided seed and parameters.
2.  **Render** a single frame or a sequence of snapshots.
3.  **Evaluate** the GPU metadata (triangle count, draw calls, and frame time).

## Phase 2: Refinement Loop
If the Evaluation results exceed the predefined budget (e.g., 16.6ms for 60fps), the loop enters the Refinement phase:
- **Constraint A: Triangle Count > 1,000,000.** Action: Reduce asteroid instance count or LOD.
- **Constraint B: Frame Time > 16.6ms.** Action: Cap DPR (Device Pixel Ratio) to 1.0 or reduce nebula slice count.
- **Constraint C: Low Memory.** Action: Disable high-res post-processing chains (Bloom).

## Tiers
| Tier | Triangle Limit | PostFX | DPR Cap |
| :--- | :--- | :--- | :--- |
| Low | 100,000 | Minimal | 1.0 |
| Medium | 500,000 | Standard | 1.5 |
| High | 2,000,000 | Cinematic | Native |

## Runtime Performance
If the runtime FPS drops below 30 for sustained periods, the engine will dynamically downgrade the tier until stability is achieved.
