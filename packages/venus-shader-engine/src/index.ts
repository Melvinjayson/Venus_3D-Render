import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export * from './engine/renderer';
export * from './engine/scene';
export * from './shaders/material-factory';
export * from './utils/feature-detection';
export * from './hooks/useVenusRenderer';

export interface PostFXOptions {
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
}

export function createPostFXChain(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, opts: PostFXOptions = {}) {
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    opts.bloomStrength ?? 1.5,
    opts.bloomRadius ?? 0.4,
    opts.bloomThreshold ?? 0.85
  );
  composer.addPass(bloomPass);

  return { composer, bloomPass };
}
