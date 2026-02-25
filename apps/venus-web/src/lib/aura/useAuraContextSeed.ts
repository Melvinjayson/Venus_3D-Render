import { useState, useCallback } from 'react';
import { fetchAuraContextSeed, AuraContextSeedPayload } from './neuralSyncClient';

export type SyncStatus = 'idle' | 'loading' | 'synced' | 'local' | 'error';

export function useAuraContextSeed() {
    const [status, setStatus] = useState<SyncStatus>('idle');
    const [data, setData] = useState<AuraContextSeedPayload | null>(null);
    const [error, setError] = useState<string | null>(null);

    const sync = useCallback(async () => {
        setStatus('loading');
        setError(null);
        try {
            const payload = await fetchAuraContextSeed();
            setData(payload);
            setStatus('synced');
            return payload;
        } catch (err: any) {
            console.warn('[NeuralSync] Failed to sync with Aura:', err.message);
            setError(err.message);
            setStatus('local');
            return null;
        }
    }, []);

    const setLocal = useCallback(() => {
        setStatus('local');
        setData(null);
    }, []);

    return { status, data, error, sync, setLocal };
}
