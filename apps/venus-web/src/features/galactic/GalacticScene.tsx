import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createVenusRenderer, createGalacticScene, useVenusRenderer } from '@venus/shader-engine';

export const GalacticScene: React.FC<{ quality: string; motion: boolean }> = ({ quality, motion }) => {
    const { canvasRef, renderer } = useVenusRenderer({
        antialias: quality !== 'low',
        alpha: true,
    });

    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    useEffect(() => {
        if (!renderer) return;

        const scene = createGalacticScene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        camera.position.z = 1000;
        cameraRef.current = camera;

        let frameId: number;
        const animate = () => {
            if (motion) {
                scene.rotation.y += 0.001;
            }
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [renderer, motion]);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-black" />;
};
