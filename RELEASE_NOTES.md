# Integrated Galactic Visualization into Venus + 3DR1 Render-First Reasoning

This implementation extends the reference aesthetic by introducing seeded world generation (nebulae + asteroid belts) governed by an active render-budget refinement loop.

## 1) What changed

### New Packages
- **`packages/venus-3dr1/`** — 3DR1 procedural generation + render-budget refinement
  - `src/worldgen/` — Seeded PRNG + presets (Nebula Drift, Belt Run, Deep Field).
  - `src/scene/` — builds instanced asteroid belts, dense starfields (50k+ particles), volumetric nebula slices.
  - `src/eval/` — 3DR1 loop measuring frame time, geometry load, and draw counts.
  - `src/eval/refine.ts` — **Hysteresis (3 frames)** + **Cooldown (5s)** logic to prevent performance oscillation.

- **`packages/venus-shader-engine/`** — Upgraded rendering pipeline
  - `createPostFXChain()` — Cinematic postFX stack (Bloom).
  - `feature-detection.ts` — **Tiered Capability Detection** (Tier A/B/C) for progressive enhancement.

### Venus Web
- **`apps/venus-web/src/features/galactic/`**
  - `GalacticPage.tsx` — Dark-mode UI with seeded navigation, world randomization, and live performance metrics.
  - **Perf Mode Toggle** — "Demo Safety Switch" for forcing lower-overhead rendering.
  - **Reproducibility Contract** — URL state sync for `{seed, preset, quality, perf, worldVersion}` + world hashing.
  - **Accessibility** — Respects `prefers-reduced-motion` and implements Tier-based fallback UI.

## 2) How to run locally

```powershell
npm install
npm run build --workspaces
npm run dev
# then open /preview/galactic
```

## 3) How to deploy preview

```powershell
npm run deploy:galactic
```

- **Reference Aesthetic:** [https://galactic-visualizat-4.aura.build/](https://galactic-visualizat-4.aura.build/)
- **New Venus Preview:** [https://venus-galactic-preview.aura.build/](https://venus-galactic-preview.aura.build/)

## 4) Verification checklist

- [x] **Procedural nebula renders** (noise-driven volumetric slices).
- [x] **Procedural asteroid belt renders** (GPU instancing + seeded distribution).
- [x] **Procedural starfield renders** (dense particle field).
- [x] **Seed reproducibility works** (same seed → same world hash).
- [x] **Quality tiers adjust DPR/density/postFX**.
- [x] **Budget refinement triggers** with hysteresis (prevents flickering/jitter).
- [x] **Reduced-motion disables dynamics**.
- [x] **Tiered Fallback works** (Tier A/B/C logic verified).
- [x] **Types + workspace build pass**.

## 5) Venus–Aura Neural Sync (v1)

**Phase 1: Read-Only Context Integration**

This release establishes a deterministic bridge between the Aura Brain's cognitive context and Venus Galactic's procedural generation.

### What's New
- **Neural Sync API** (`GET /venus/context/seed`) on the stable Aura Cloud Run service
  - Returns deterministic `{seed, preset, palette, density, motion}` derived from Aura's active context hash
  - Summary text suitable for UI display (240 char limit)
  - All parameters are SHA-256 deterministic from the context snapshot
  
- **Venus Client Integration**
  - `useAuraContextSeed()` hook with automatic fetch-on-load + manual "Sync from Aura" button
  - `neuralSyncClient.ts` with 3s timeout + graceful fallback to local mode
  - `mapAuraToWorldData()` translates Aura payload into 3DR1 parameters
  
- **Aura Context Sidebar**
  - Collapsible panel showing:
    - Active Summary (Aura's current cognitive state)
    - Context Hash (deterministic fingerprint of Aura's state)
    - World Hash (reproducibility contract: seed + preset + v + contextHash)
    - Hardware Tier (A/B/C)
    - R1 Performance State (Stable/Refining)
    
- **Visual Indicators**
  - "Aura Synced" (purple) vs "Live Render" (blue) status badges
  - Graceful error handling with "Local Mode" fallback
  
- **URL State Expansion**
  - Now captures: `{seed, preset, quality, perf, v, ch}` where `ch = contextHash`
  - Shareable links preserve both procedural state AND neural context

### Determinism Guarantees
- Same Aura context → Same contextHash → Same seed/preset/palette/density/motion
- `worldHash = hash(seed + preset + v + contextHash)` ensures full reproducibility
- Unit tests verify deterministic behavior across repeated calls

### Docs
- `docs/neural_sync_discovery.md` — Repository analysis + baseline findings
- `docs/neural_sync_contract.md` — Full API schema + determinism rules
- `apps/test_venus_sync.py` — Unit tests (all passing ✅)

### What's NOT in Phase 1
- ❌ Real-time streaming (SSE) — Phase 2
- ❌ Frame-by-frame animation control — Aura only sets initial conditions
- ❌ Authentication — Public read endpoint with optional `X-VENUS-CLIENT` header

## 6) Next upgrades
- **Snapshot tool**: export high-res PNG for seeded worlds.
- **Warp transitions**: radial blur/FTL transition on seed changes.
- **Audio**: Ambient reactive layers modulated by scene density.
