# Venus Web (Galactic Edition)

This application is the frontend interface for the Venus 3D Render OS.

## 🌌 Standard Visualization Architecture

We have implemented a standardized architecture for all visualizations to ensure performance, consistency, and stability.

### Core Primitives
- **`VizFrame`**: The standard container for all dashboard pages. Handles Loading, Error, and Header states.
- **`MetricCard`**: Standardized KPI display with trend support.
- **Design Tokens**: All colors and fonts are defined in `src/styles/design-tokens.css` and mapped via `tailwind.config.js`.

### Directory Structure
```
src/
├── components/
│   └── viz/              # Sharable visualization components
│       ├── charts/       # Reusable charts (MetricCard, etc.)
│       └── VizFrame.tsx  # Standard Page Wrapper
├── lib/
│   └── viz/              # Visualization logic & types
│       └── schemas.ts    # Zod schemas for data validation
├── features/
│   └── dashboard/        # Reference Implementation
│       └── DashboardPage.tsx
└── styles/
    └── design-tokens.css # Single Source of Truth for Design
```

## 🚀 Getting Started

### Development
```bash
pnpm dev
```
Runs the app on `http://localhost:3001` (or next available port).

### New Routes
- `/dashboard`: The **Venus Command Center**, showcasing the new architecture.
- `/preview/galactic`: The 3D Render Engine demo.

## 🛠️ Deployment
This app is Vite-based and Deployment Safe.
- **Build**: `pnpm build` (Runs `tsc` + `vite build`)
- **Assets**: All assets are compiled to `dist/`.
- **Environment**: Ensure `VITE_API_URL` is set if connecting to a real backend.
