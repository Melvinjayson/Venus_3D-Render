# Venus 3D Render OS

This is the core repository for the Venus 3D Rendering OS and its visualization features.

## Project Structure

- `apps/venus-web`: The main web application (Vite + React).
- `packages/venus-shader-engine`: The core 3D rendering engine (TypeScript + Three.js).
- `docs/`: Technical documentation and discovery findings.
- `scripts/`: Utility scripts for environment setup and asset importing.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Local Development
```bash
npm run dev
```

### 3. Deploy Galactic Preview
```bash
npm run deploy:galactic
```

## Features
- **Galactic Visualization**: A real-time 3D galaxy simulation.
- **Dynamic Quality Tiers**: Auto-detects hardware capabilities.
- **Accessibility**: Support for `prefers-reduced-motion` and WebGL fallbacks.
