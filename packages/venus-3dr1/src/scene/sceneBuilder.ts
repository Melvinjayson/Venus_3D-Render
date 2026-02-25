import * as THREE from 'three';
import { WorldData } from '../worldgen/biomes';

export function buildScene(world: WorldData): THREE.Scene {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // 1. Starfield
    const starGeo = new THREE.BufferGeometry();
    const starPos = [];
    for (let i = 0; i < world.starCount; i++) {
        starPos.push(
            (Math.random() - 0.5) * 5000,
            (Math.random() - 0.5) * 5000,
            (Math.random() - 0.5) * 5000
        );
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 2. Asteroid Belt (Instanced)
    const asteroidGeo = new THREE.IcosahedronGeometry(1, 1);
    const asteroidMat = new THREE.MeshStandardMaterial({ color: 0x666666 });
    const asteroids = new THREE.InstancedMesh(asteroidGeo, asteroidMat, world.asteroidCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < world.asteroidCount; i++) {
        const angle = (i / world.asteroidCount) * Math.PI * 2;
        const dist = 500 + Math.random() * 200;
        dummy.position.set(Math.cos(angle) * dist, (Math.random() - 0.5) * 50, Math.sin(angle) * dist);
        dummy.scale.setScalar(Math.random() * 5 + 1);
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        dummy.updateMatrix();
        asteroids.setMatrixAt(i, dummy.matrix);
    }
    scene.add(asteroids);

    // 3. Nebula (Volumetric-ish Slices)
    const nebulaGroup = new THREE.Group();
    const nebulaGeometry = new THREE.PlaneGeometry(1000, 1000);
    const nebulaColor = new THREE.Color(world.colors[0]);

    for (let i = 0; i < 20; i++) {
        const nebulaMaterial = new THREE.MeshBasicMaterial({
            color: nebulaColor,
            transparent: true,
            opacity: (world.nebulaDensity * 0.1) / (i + 1),
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        const nebulaMesh = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
        nebulaMesh.position.z = -500 + i * 50;
        nebulaMesh.rotation.z = Math.random() * Math.PI;
        nebulaGroup.add(nebulaMesh);
    }
    scene.add(nebulaGroup);

    // Add lighting
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(5, 5, 5);
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0x222222));

    return scene;
}
