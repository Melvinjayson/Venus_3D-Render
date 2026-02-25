import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useVenusRenderer, createPostFXChain } from '@venus/shader-engine';
import { run3DR1, R1Options } from '@venus/3dr1';

interface Props extends R1Options {
    motion: boolean;
    onReport?: (report: any) => void;
}

export const GalacticViewport: React.FC<Props> = (props) => {
    const { canvasRef, renderer } = useVenusRenderer({
        antialias: props.quality !== 'low',
        alpha: true,
    });

    const composerRef = useRef<any>(null);

    useEffect(() => {
        if (!renderer) return;

        let frameId: number;
        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let lastTime = performance.now();

        const init = async () => {
            const { scene: newScene, report } = await run3DR1(props, renderer);
            scene = newScene;

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
            camera.position.set(0, 200, 1000);
            camera.lookAt(0, 0, 0);

            const { composer } = createPostFXChain(renderer, scene, camera, {
                bloomStrength: props.quality === 'high' ? 1.5 : (props.quality === 'medium' ? 1.0 : 0.5),
            });
            composerRef.current = composer;

            const animate = (time: number) => {
                const delta = time - lastTime;
                lastTime = time;

                if (props.motion) {
                    scene.rotation.y += 0.0005;
                }

                composer.render();
                frameId = requestAnimationFrame(animate);

                if (props.onReport && Math.random() < 0.01) {
                    props.onReport({
                        fps: Math.round(1000 / delta),
                        triangles: renderer.info.render.triangles,
                        drawCalls: renderer.info.render.calls
                    });
                }
            };

            animate(performance.now());
        };

        init();

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [renderer, props.seed, props.preset, props.quality, props.motion]);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};
