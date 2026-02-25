export function checkWebGLSupport(): boolean {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

export type CapabilityTier = 'Tier A' | 'Tier B' | 'Tier C';

export function getCapabilityTier(): CapabilityTier {
    if (!checkWebGLSupport()) return 'Tier C';

    const canvas = document.createElement('canvas');
    const isWebGL2 = !!canvas.getContext('webgl2');

    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;

    if (isWebGL2 && memory >= 8 && cores >= 8) return 'Tier A';
    if (isWebGL2) return 'Tier B';
    return 'Tier C';
}

export function prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
