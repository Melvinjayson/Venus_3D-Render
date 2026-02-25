# Neural Sync API Contract (v1)

## Overview
The Neural Sync API allows Venus Galactic to synchronize its procedural generation state with the Aura Brain's cognitive context.

## Endpoint
`GET /venus/context/seed?v=1`

### Query Parameters
- `v` (string, required): API version (e.g., "1").
- `route` (string, optional): Target route, defaults to `galactic`.
- `client` (string, optional): Client identifier (e.g., `venus-web`).

### Sample Response
```json
{
  "version": "v1",
  "contextHash": "aura_8f23...a12b",
  "seed": "v-8f2301a2b3",
  "preset": "Nebula Drift",
  "palette": ["#8f2301", "#a2b3c4", "#e5f6a1"],
  "density": 0.65,
  "motion": "calm",
  "summary": "Aura stable. Ready for Galactic navigation.",
  "generatedAt": "2026-01-09T21:30:00Z"
}
```

## Determinism Rules
1. **Context Hash**: `sha256(summary)`.
2. **Seed**: `v-` + first 10 hex characters of `contextHash`.
3. **Preset**: `hash mod 3` mapping to `Nebula Drift`, `Belt Run`, or `Deep Field`.
4. **Palette**: Three hex strings derived from hash offsets 10-16, 16-22, and 22-28.
5. **Density**: Linear mapping of hash byte [28:30] to range [0.4, 0.9].
6. **Motion**: Binary selection from hash byte [30] mapping to `calm` or `active`.

## Client Implementation
- Expected timeout: 2000ms.
- Fallback: Local random seed generation.
- Header Requirement: `X-VENUS-CLIENT` (Preview identification).
