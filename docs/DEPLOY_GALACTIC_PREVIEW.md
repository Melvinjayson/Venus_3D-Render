# Deploy Galactic Preview

This document outlines the steps to deploy the Galactic Visualization preview to Firebase Hosting.

## Prerequisites
- Firebase CLI installed (`npm install -g firebase-tools`)
- Authenticated with Firebase (`firebase login`)

## Deployment Commands

### 1. Build the project
```bash
npm run build
```

### 2. Deploy to Preview Channel
```bash
cd apps/venus-web
firebase hosting:channel:deploy galactic-preview
```

## Local Development
To run the galactic visualization locally:
```bash
npm run dev
```
Then navigate to `http://localhost:3000/preview/galactic`.
