import { PRNG } from './seed';

export interface WorldData {
    seed: string;
    preset: string;
    nebulaDensity: number;
    asteroidCount: number;
    starCount: number;
    colors: string[];
}

export function generateWorld(seed: string, preset: string): WorldData {
    const rng = new PRNG(seed);

    const baseColors = [
        ['#ff6030', '#1b3984', '#ffffff'],
        ['#00ffff', '#ff00ff', '#ffffff'],
        ['#ffcc00', '#330066', '#ffffff']
    ];

    const colorIndex = Math.floor(rng.next() * baseColors.length);

    switch (preset) {
        case 'Nebula Drift':
            return {
                seed,
                preset,
                nebulaDensity: rng.nextRange(0.5, 1.0),
                asteroidCount: rng.nextRange(10, 50),
                starCount: 50000,
                colors: baseColors[colorIndex]
            };
        case 'Belt Run':
            return {
                seed,
                preset,
                nebulaDensity: rng.nextRange(0.1, 0.3),
                asteroidCount: rng.nextRange(500, 2000),
                starCount: 20000,
                colors: baseColors[colorIndex]
            };
        default: // Deep Field
            return {
                seed,
                preset,
                nebulaDensity: rng.nextRange(0.0, 0.2),
                asteroidCount: rng.nextRange(0, 10),
                starCount: 200000,
                colors: baseColors[colorIndex]
            };
    }
}
