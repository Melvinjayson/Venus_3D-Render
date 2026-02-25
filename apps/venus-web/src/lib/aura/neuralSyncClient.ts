const AURA_API_BASE = import.meta.env.VITE_AURA_API_BASE || 'https://aura-brain-1010448525430.us-east4.run.app';

export interface AuraContextSeedPayload {
    version: string;
    contextHash: string;
    seed: string;
    preset: string;
    palette: string[];
    density: number;
    motion: 'calm' | 'active' | 'off';
    summary: string;
    generatedAt: string;
}

export async function fetchAuraContextSeed(timeoutMs = 3000): Promise<AuraContextSeedPayload> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(`${AURA_API_BASE}/venus/context/seed?v=1`, {
            signal: controller.signal,
            headers: {
                'X-VENUS-CLIENT': 'venus-web-preview'
            }
        });

        clearTimeout(id);

        if (!response.ok) {
            throw new Error(`Aura API error: ${response.statusText}`);
        }

        return await response.json();
    } catch (err) {
        clearTimeout(id);
        throw err;
    }
}
