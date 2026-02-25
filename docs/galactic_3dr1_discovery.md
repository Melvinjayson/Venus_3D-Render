# Galactic 3DR1 Discovery

## 1. Reference Analysis (`https://galactic-visualizat-4.aura.build/`)
- **Technology:** Three.js (0.160.0), React, Vite.
- **Scene Composition:**
  - **Galaxy:** Particle-based system with hundreds of thousands of stars.
  - **Shaders:** Custom GLSL for star rendering (size attenuation, color based on distance from core).
  - **Postprocessing:** Intense bloom/glow effect to simulate galactic luminosity.
  - **Camera:** Orbital control with smooth easing.
- **Performance:** High GPU usage due to fragment shader complexity and bloom passes.
- **Assets:** Minimal external assets; largely procedural.

## 2. Venus Web Stack
- **Framework:** Vite + React + TypeScript.
- **Monorepo:** `npm` workspaces.
- **Hosting:** Firebase Hosting.
- **Routing:** React Router.

## 3. 3DR1 Implementation Strategy
- **R1 Loop:** Will monitor FPS and frame time. If FPS < 30 (low) or < 60 (high), the engine will iteratively reduce:
  1. Particle count (density).
  2. DPR (Device Pixel Ratio).
  3. Post-effect passes (Bloom quality).
- **Procedural Layers:**
  - **Nebula:** Noise-based volume field using plane slices or billboards.
  - **Asteroids:** Instanced meshes with seeded jitter and rotation.
  - **Stars:** Dense point clouds with seeded distribution.
