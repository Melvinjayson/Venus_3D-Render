import { WorldData } from '../worldgen/biomes';

export interface AuraContextSeed {
    seed: string;
    preset: string;
    palette: string[];
    density: number;
    motion: 'calm' | 'active' | 'off';
    contextHash: string;
}

export function mapAuraToWorldData(aura: AuraContextSeed, baseWorld: WorldData): WorldData {
    const refined = { ...baseWorld };

    refined.starCount = Math.floor(20000 * aura.density);
    refined.asteroidCount = Math.floor(500 * aura.density);
    refined.nebulaDensity = aura.density;

    // Note: Palette can influence materials via uniforms in the renderer
    // For now, we update the primary world metadata
    (refined as any).auraPalette = aura.palette;
    (refined as any).auraContextHash = aura.contextHash;
    (refined as any).motionScale = aura.motion === 'active' ? 1.5 : (aura.motion === 'off' ? 0 : 0.8);

    return refined;
}
