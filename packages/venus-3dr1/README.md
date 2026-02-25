# Venus 3DR1 Engine

## Overview
Powered by the R1 "Render-First Reasoning" loop, this package provides deterministic procedural generation for 3D environments.

## Features
- **Deterministic PRNG**: Seeded generation ensures the same seed always produces the same environment.
- **R1 Refinement**: Automatically adjusts world density and render settings to fit the performance budget.
- **Procedural Biomes**:
  - `Nebula Drift`: Dense volumetric clouds.
  - `Belt Run`: High-density instanced asteroid fields.
  - `Deep Field`: Large-scale star systems.

## Usage
```typescript
import { run3DR1 } from '@venus/3dr1';

const { world, scene, report } = await run3DR1({
  seed: 'stellar-7',
  preset: 'Nebula Drift',
  quality: 'high',
  renderBudget: 16.6
}, renderer);
```
