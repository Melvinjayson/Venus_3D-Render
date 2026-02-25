import { generateWorld } from './worldgen/biomes';
import { buildScene } from './scene/sceneBuilder';
import { refineParameters } from './eval/refine';
import { measurePerformance } from './eval/metrics';

export interface R1Options {
    seed: string;
    preset: 'Nebula Drift' | 'Belt Run' | 'Deep Field';
    quality: 'low' | 'medium' | 'high';
    renderBudget: number; // ms per frame
}

export async function run3DR1(opts: R1Options, rendererCtx: any) {
    let world = generateWorld(opts.seed, opts.preset);
    let scene = buildScene(world);

    // Initial Eval
    const report = measurePerformance(rendererCtx, scene);

    if (report.frameTime > opts.renderBudget) {
        world = refineParameters(world, report, opts.renderBudget);
        scene = buildScene(world);
    }

    return { world, scene, report };
}

export * from './worldgen/seed';
export * from './worldgen/biomes';
export * from './scene/sceneBuilder';
export * from './eval/metrics';
export * from './integration/mapAuraTo3DR1';
