#!/bin/bash

# Script to import the Venus-OS-3D-Shader-Engine once permissions are granted
# Canonical Repo: https://github.com/Melvinjayson/Venus-OS-3D-Shader-Engine

ENGINE_REPO="https://github.com/Melvinjayson/Venus-OS-3D-Shader-Engine.git"
TARGET_DIR="packages/venus-shader-engine/vendor"

echo "Cloning Venus Shader Engine..."
git clone $ENGINE_REPO $TARGET_DIR

echo "Import complete. Please run 'npm install' to refresh workspace links."
