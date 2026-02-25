import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GalacticViewport } from './GalacticViewport';
import { generateSeed } from '@venus/3dr1';
import { useAuraContextSeed } from '../../lib/aura/useAuraContextSeed';
import { checkWebGLSupport, prefersReducedMotion, getCapabilityTier } from '@venus/shader-engine';

const WORLD_VERSION = '1.0';

export const GalacticPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // State from URL or Defaults
    const [seed, setSeed] = useState(searchParams.get('seed') || generateSeed());
    const [preset, setPreset] = useState<any>(searchParams.get('preset') || 'Nebula Drift');
    const [quality, setQuality] = useState<any>(searchParams.get('quality') || 'medium');
    const [perfMode, setPerfMode] = useState(searchParams.get('perf') === 'true');
    const [motion, setMotion] = useState(!prefersReducedMotion());

    const [report, setReport] = useState<any>(null);
    const [tier, setTier] = useState<any>('Tier C');
    const [supported, setSupported] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);

    const aura = useAuraContextSeed();

    useEffect(() => {
        setSupported(checkWebGLSupport());
        setTier(getCapabilityTier());
        // Initial sync attempt
        aura.sync();
    }, []);

    // Reproducibility Hash
    const worldHash = `${seed}-${preset}-${WORLD_VERSION}-${aura.data?.contextHash || 'local'}`.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0).toString(16).toUpperCase();

    // Sync state to URL
    useEffect(() => {
        setSearchParams({
            seed,
            preset,
            quality,
            perf: String(perfMode),
            v: WORLD_VERSION,
            ch: aura.data?.contextHash || ''
        }, { replace: true });
    }, [seed, preset, quality, perfMode, aura.data?.contextHash, setSearchParams]);

    // Handle Aura Sync Update
    useEffect(() => {
        if (aura.status === 'synced' && aura.data) {
            setSeed(aura.data.seed);
            setPreset(aura.data.preset as any);
        }
    }, [aura.status, aura.data]);

    const randomize = useCallback(() => {
        setSeed(generateSeed());
    }, []);

    if (!supported) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white p-10 text-center font-sans">
                <div>
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">Venus // Access Denied</h1>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">Procedural 3DR1 rendering requires WebGL2. Please upgrade your browser or use a desktop device.</p>
                    <div className="w-full h-64 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/5">
                        <span className="text-[10px] uppercase tracking-[0.3em] opacity-20">Fallback Visual Unavailable</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-black font-sans selection:bg-white selection:text-black">
            <GalacticViewport
                seed={seed}
                preset={preset}
                quality={perfMode ? 'low' : quality}
                motion={motion}
                renderBudget={16.6}
                onReport={setReport}
            />

            {/* UI Overlays */}
            <div className="absolute top-12 left-12 z-10 text-white pointer-events-none select-none">
                <div className="flex items-center gap-4 mb-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="w-12 h-[1px] bg-gradient-to-r from-white to-transparent opacity-50" />
                    <h1 className="text-[10px] font-display font-bold tracking-[0.4em] uppercase text-venus-dim">Venus Platform // v{WORLD_VERSION}</h1>
                </div>
                <h2 className="text-7xl font-display font-black tracking-tighter uppercase leading-[0.85] opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    Galactic<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Engine</span>
                </h2>
                <div className="mt-6 flex gap-3 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <div className="px-4 py-1.5 bg-venus-highlight/30 backdrop-blur-md rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border border-white/5 text-venus-text shadow-lg shadow-black/20">
                        {tier} Detected
                    </div>
                    <div className={`px-4 py-1.5 backdrop-blur-md rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border transition-all duration-500 shadow-lg ${aura.status === 'synced'
                        ? 'bg-galactic-primary/10 border-galactic-primary/20 text-galactic-primary shadow-galactic-primary/10'
                        : 'bg-galactic-secondary/10 border-galactic-secondary/20 text-galactic-secondary shadow-galactic-secondary/10'
                        }`}>
                        {aura.status === 'synced' ? '● Aura Synced' : '○ Live Render'}
                    </div>
                    {perfMode && (
                        <div className="px-4 py-1.5 bg-red-500/10 backdrop-blur-md rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border border-red-500/20 text-red-400">
                            Perf Mode
                        </div>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="absolute top-12 right-12 z-10 flex flex-col gap-4 w-80 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="bg-venus-black/60 backdrop-blur-xl border border-white/5 p-6 rounded-2xl shadow-2xl ring-1 ring-white/5">
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                        <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-venus-dim">3DR1 Orchestrator</span>
                        {report && <span className={`text-[10px] font-mono ${report.fps > 55 ? 'text-emerald-400' : 'text-amber-400'}`}>{report.fps} FPS</span>}
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-[9px] uppercase tracking-[0.1em] text-venus-dim font-bold">Nav Seed</label>
                                <span className="text-[9px] font-mono text-venus-dim/50">#{worldHash.substring(0, 8)}</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    value={seed}
                                    onChange={(e) => setSeed(e.target.value)}
                                    className="bg-venus-highlight/20 border border-white/5 rounded-lg px-3 py-2 text-xs font-mono text-venus-text w-full focus:outline-none focus:border-galactic-secondary/50 focus:bg-venus-highlight/40 transition-all placeholder-white/20"
                                    placeholder="Enter seed..."
                                />
                                <button onClick={randomize} className="bg-white text-venus-black rounded-lg p-2.5 hover:bg-zinc-200 transition-colors shadow-lg active:scale-95 duration-200">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16" /></svg>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[9px] uppercase tracking-[0.1em] mb-3 text-venus-dim font-bold">Environment Preset</label>
                            <div className="flex flex-col gap-1.5">
                                {['Nebula Drift', 'Belt Run', 'Deep Field'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setPreset(p as any)}
                                        className={`group relative overflow-hidden text-left px-4 py-2.5 rounded-lg text-[10px] font-display font-bold uppercase tracking-widest transition-all border duration-300 ${preset === p
                                            ? 'bg-white text-venus-black border-white shadow-lg shadow-white/10'
                                            : 'bg-venus-highlight/10 text-venus-dim border-transparent hover:bg-venus-highlight/20 hover:text-venus-text'
                                            }`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] transition-transform duration-700 ${preset === p ? 'group-hover:translate-x-[100%]' : ''}`} />
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] uppercase tracking-[0.1em] text-venus-dim font-bold">Quality Tier</span>
                                <div className="flex bg-venus-highlight/10 p-1 rounded-lg border border-white/5">
                                    {['low', 'medium', 'high'].map(q => (
                                        <button
                                            key={q}
                                            disabled={perfMode}
                                            onClick={() => setQuality(q as any)}
                                            className={`px-3 py-1.5 rounded-md text-[9px] font-mono font-bold uppercase transition-all ${perfMode
                                                ? 'opacity-20 cursor-not-allowed'
                                                : (quality === q ? 'bg-venus-highlight/50 text-white shadow-sm' : 'text-venus-dim hover:text-venus-text')
                                                }`}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-[9px] uppercase tracking-[0.1em] text-venus-dim font-bold">Performance Mode</span>
                                <button
                                    onClick={() => setPerfMode(!perfMode)}
                                    className={`w-10 h-5 rounded-full transition-all duration-300 relative border ${perfMode ? 'bg-red-500/20 border-red-500/50' : 'bg-venus-highlight/20 border-white/5'}`}
                                >
                                    <div className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full transition-all duration-300 shadow-sm ${perfMode ? 'translate-x-5 bg-red-400' : 'translate-x-0 bg-venus-dim'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aura Sync Toggle */}
                <button
                    onClick={() => aura.sync()}
                    disabled={aura.status === 'loading'}
                    className={`group w-full bg-venus-black/60 backdrop-blur-xl border border-white/5 p-4 rounded-xl text-[10px] font-display font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg relative overflow-hidden ${aura.status === 'synced'
                        ? 'text-galactic-primary border-galactic-primary/30 hover:bg-galactic-primary/5'
                        : 'text-venus-text hover:text-white hover:border-white/20 hover:bg-white/5'
                        }`}
                >
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] transition-transform duration-1000 ${aura.status === 'loading' ? 'animate-[shimmer_2s_infinite]' : 'group-hover:translate-x-[100%]'}`} />
                    <svg className={aura.status === 'loading' ? 'animate-spin' : ''} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 12c0-4.4 3.6-8 8-8 3.3 0 6.2 2 7.4 4.9M22 12c0 4.4-3.6 8-8 8-3.3 0-6.2-2-7.4-4.9" /></svg>
                    {aura.status === 'loading' ? 'Syncing...' : 'Sync Context'}
                </button>

                {/* Share Link */}
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Scene link copied to clipboard!');
                    }}
                    className="bg-white/5 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
                    Copy Scene Link
                </button>
            </div>

            {/* Aura Context Sidebar */}
            <div className={`absolute left-0 top-0 h-full backdrop-blur-3xl border-r border-white/10 transition-all duration-500 z-50 ${showSidebar ? 'w-96' : 'w-0 overflow-hidden border-none'}`}>
                {showSidebar && (
                    <div className="p-12 text-white space-y-12 h-full flex flex-col">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Neural Context</h3>
                            <button onClick={() => setShowSidebar(false)} className="text-white/20 hover:text-white">Close</button>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[8px] uppercase tracking-[0.2em] opacity-20 block">Active Summary</label>
                            <p className="text-lg font-light leading-relaxed italic opacity-80">
                                "{aura.data?.summary || 'No active context captured. Operating in Local Mode.'}"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 pt-8 border-t border-white/5">
                            <div>
                                <label className="text-[8px] uppercase tracking-[0.2em] opacity-20 block mb-2">Context Hash</label>
                                <code className="text-[10px] font-mono opacity-50 break-all">{aura.data?.contextHash || 'N/A'}</code>
                            </div>
                            <div>
                                <label className="text-[8px] uppercase tracking-[0.2em] opacity-20 block mb-2">World Hash</label>
                                <code className="text-[10px] font-mono opacity-50 break-all">{worldHash}</code>
                            </div>
                        </div>

                        <div className="mt-auto space-y-4 pt-8 border-t border-white/5">
                            <div className="flex justify-between items-center">
                                <span className="text-[8px] uppercase tracking-[0.2em] opacity-20">Hardware</span>
                                <span className="text-[10px] font-bold">{tier}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[8px] uppercase tracking-[0.2em] opacity-20">R1 State</span>
                                <span className={`text-[10px] font-bold ${report?.fps > 55 ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {report?.fps > 55 ? 'Stable' : 'Refining Asset Pack'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar Toggle Handle */}
            {!showSidebar && (
                <button
                    onClick={() => setShowSidebar(true)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 border-y border-r border-white/10 p-2 rounded-r-xl z-20 transition-all text-white/20 hover:text-white"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            )}

            {/* Bottom info */}
            <div className="absolute bottom-12 left-12 z-10 flex items-end gap-12 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
                <div className="flex flex-col gap-3">
                    <span className="text-[9px] font-display uppercase tracking-[0.2em] text-venus-dim">Render Metrics</span>
                    <div className="flex gap-8">
                        <div className="flex flex-col">
                            <span className="text-venus-text font-mono text-xl tracking-tight leading-none">{report?.triangles.toLocaleString() || '0'}</span>
                            <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-venus-dim/50 mt-1">Triangles</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-venus-text font-mono text-xl tracking-tight leading-none">{report?.instanceCount.toLocaleString() || '0'}</span>
                            <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-venus-dim/50 mt-1">Instances</span>
                        </div>
                    </div>
                </div>
                <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-venus-dim/40 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse-slow" />
                    System Core // {seed.toUpperCase().substring(0, 8)} // Stable
                </div>
            </div>
        </div>
    );
};
