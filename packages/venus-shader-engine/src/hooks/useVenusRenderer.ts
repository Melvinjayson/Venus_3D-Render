import { useEffect, useRef, useState } from 'react';
import { createVenusRenderer, RendererOptions } from '../engine/renderer';
import * as THREE from 'three';

export function useVenusRenderer(options: Omit<RendererOptions, 'canvas'>) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);

    useEffect(() => {
        if (canvasRef.current && !renderer) {
            const newRenderer = createVenusRenderer({
                canvas: canvasRef.current,
                ...options,
            });
            setRenderer(newRenderer);
        }

        return () => {
            if (renderer) {
                renderer.dispose();
            }
        };
    }, [options, renderer]);

    return { canvasRef, renderer };
}
