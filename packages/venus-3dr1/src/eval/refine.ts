import { WorldData } from '../worldgen/biomes';
import { PerformanceReport } from './metrics';

const HYSTERESIS_THRESHOLD = 3;
const COOLDOWN_MS = 5000;

let slowFrameCount = 0;
let lastRefineTime = 0;

export function refineParameters(world: WorldData, report: PerformanceReport, budget: number): WorldData {
    const now = Date.now();

    // Guard 1: Cooldown check
    if (now - lastRefineTime < COOLDOWN_MS) {
        return world;
    }

    // Guard 2: Hysteresis check
    if (report.frameTime > budget || report.triangles > 1500000) {
        slowFrameCount++;
    } else {
        slowFrameCount = 0;
        return world;
    }

    if (slowFrameCount < HYSTERESIS_THRESHOLD) {
        return world;
    }

    // If we passed guards, perform refinement
    const refined = { ...world };

    // Aggressive reduction strategy
    refined.starCount = Math.floor(world.starCount * 0.7);
    refined.asteroidCount = Math.floor(world.asteroidCount * 0.7);
    refined.nebulaDensity = world.nebulaDensity * 0.8;

    lastRefineTime = now;
    slowFrameCount = 0;

    console.log('[3DR1] Render-First Reasoning Loop: Refinement Triggered', {
        reason: report.frameTime > budget ? 'Frame Time Over Budget' : 'Geometry Over Limit',
        budget,
        metrics: report,
        before: { stars: world.starCount, asteroids: world.asteroidCount, nebula: world.nebulaDensity },
        after: { stars: refined.starCount, asteroids: refined.asteroidCount, nebula: refined.nebulaDensity }
    });

    return refined;
}
