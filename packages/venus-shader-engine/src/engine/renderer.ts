import * as THREE from 'three';

export interface RendererOptions {
    canvas: HTMLCanvasElement;
    antialias?: boolean;
    alpha?: boolean;
}

export function createVenusRenderer(opts: RendererOptions) {
    const renderer = new THREE.WebGLRenderer({
        canvas: opts.canvas,
        antialias: opts.antialias ?? true,
        alpha: opts.alpha ?? true,
        powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
}
