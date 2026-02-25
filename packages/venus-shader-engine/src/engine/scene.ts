import * as THREE from 'three';

export function createGalacticScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Initial placeholder galaxy
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
        vertices.push(
            THREE.MathUtils.randFloatSpread(2000),
            THREE.MathUtils.randFloatSpread(2000),
            THREE.MathUtils.randFloatSpread(2000)
        );
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0x888888, size: 2 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    return scene;
}
