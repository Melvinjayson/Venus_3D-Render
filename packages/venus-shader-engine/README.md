# Venus Shader Engine

## Overview
A modular 3D shader engine designed for high-performance WebGL rendering.

## Core API

### `createVenusRenderer(opts)`
Initializes a WebGL2 renderer with optimized defaults for the Venus platform.

### `createPostFXChain(renderer, scene, camera, opts)`
Sets up an `EffectComposer` with bloom and other cinematic effects.

### `useVenusRenderer(opts)`
A React hook for managing the lifecycle of the renderer within a component.

## Architecture
This package is kept minimal to allow for tree-shaking and fast loads. It acts as the thin abstraction layer over Three.js.
