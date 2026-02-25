# Neural Sync Discovery (Venus–Aura)
**Date**: 2026-01-09
**Status**: Completed

## A) Aura Backend Analysis
- **Service**: `aura-brain` (Cloud Run) - *Pivoted from legacy aura-web-backend1*
- **Base URL**: `https://aura-brain-1010448525430.us-east4.run.app`
- **Retirement Note**: `aura-web-backend1` retired on 2026-01-09.
- **Framework**: FastAPI (Python)
- **CORS Config**: Currently set to `allow_origins=["*"]` in R&D mode for stability, but with explicit `ALLOWED_ORIGINS` tracked in code.
- **Current Summary Store**: `LATEST_SUMMARY` global variable implemented in `main.py` to capture the last agent response.

## B) Venus Web Analysis
- **Stack**: Vite + React + TypeScript + Three.js
- **Routing**: `react-router-dom`
- **Feature Path**: `apps/venus-web/src/features/galactic/GalacticPage.tsx`
- **Entry Points**: 
    - Seed generation via `@venus/3dr1/generateSeed`.
    - World generation via `@venus/3dr1/generateWorld`.
    - URL state managed by `useSearchParams`.

## C) 3DR1 Determinism Check
- **Hashing Logic**: Current `worldHash` is a XOR-based string hash formatted as Hex.
- **Inputs**: `seed`, `preset`, `WORLD_VERSION`, and now `contextHash`.
- **Reproducibility Contract**: A specific combination of these inputs reliably recreates the same Galactic scene.

## D) Repository Mapping (Inferred)
- **Venus Monorepo**: `C:\Users\HP\OneDrive\Desktop\Reveta Corporation\R&D\Venus 3D Render OS`
- **Aura Backend**: `C:\Users\HP\OneDrive\Desktop\Reveta Corporation\Aura\backend`
- **Aura Frontend**: `C:\Users\HP\OneDrive\Desktop\Reveta Corporation\Aura\aura-web` (not direct focus for this phase)
- **Antigravity Ops**: `C:\Users\HP\OneDrive\Desktop\Reveta Corporation\antigravity-ops`
