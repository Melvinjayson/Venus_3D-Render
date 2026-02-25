import * as THREE from 'three';

export interface PerformanceReport {
    fps: number;
    frameTime: number;
    triangles: number;
    drawCalls: number;
    instanceCount: number;
}

export function measurePerformance(renderer: THREE.WebGLRenderer, scene: THREE.Scene): PerformanceReport {
    const info = renderer.info;
    let totalInstances = 0;
    scene.traverse((obj) => {
        if ((obj as any).isInstancedMesh) {
            totalInstances += (obj as any).count;
        }
    });

    return {
        fps: 0,
        frameTime: 0,
        triangles: info.render.triangles,
        drawCalls: info.render.calls,
        instanceCount: totalInstances
    };
}
