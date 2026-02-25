import React, { useState, useEffect } from 'react';
import { VizFrame } from '../../components/viz/VizFrame';
import { MetricCard } from '../../components/viz/charts/MetricCard';
import { useAuraContextSeed } from '../../lib/aura/useAuraContextSeed';
import { cn } from '../../lib/cn';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
    const [refreshing, setRefreshing] = useState(false);
    const aura = useAuraContextSeed();

    // Auto-check connectivity on mount
    useEffect(() => {
        aura.sync();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await aura.sync();
        setTimeout(() => setRefreshing(false), 800);
    };

    return (
        <div className="h-screen w-screen bg-venus-black text-venus-text flex flex-col p-4 md:p-8 overflow-hidden font-sans">
            <VizFrame
                title="Venus Command Center"
                description="Real-time system hardening status & cross-platform connectivity."
                loading={refreshing || aura.status === 'loading'}
                actions={
                    <div className="flex gap-2">
                        <Link
                            to="/preview/galactic"
                            className="px-4 py-2 bg-galactic-primary/10 border border-galactic-primary/30 rounded-lg text-xs font-bold uppercase tracking-wider text-galactic-primary hover:bg-galactic-primary/20 transition-all flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 bg-galactic-primary rounded-full animate-pulse" />
                            Launch Galactic OS
                        </Link>
                        <button
                            onClick={handleRefresh}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                        >
                            Run Diagnostics
                        </button>
                    </div>
                }
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-full overflow-y-auto">
                    {/* Column 1: Core Metrics */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-display uppercase tracking-widest text-venus-dim">System Vitality</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <MetricCard
                                label="Aura Connection"
                                value={aura.status === 'synced' ? 'Online' : (aura.status === 'loading' ? 'Checking...' : 'Offline')}
                                trend={aura.status === 'synced' ? 100 : 0}
                                trendLabel="Uptime Reliability"
                                className={cn(
                                    aura.status === 'synced' ? "border-galactic-secondary/30 bg-galactic-secondary/5" : "border-red-500/30 bg-red-500/5"
                                )}
                            />
                            <MetricCard
                                label="Active Nodes"
                                value={12}
                                trend={5.2}
                                trendLabel="vs last hour"
                            />
                            <MetricCard
                                label="Render Load"
                                value="84%"
                                trend={-1.8}
                                trendLabel="Available capacity"
                            />
                        </div>
                    </div>

                    {/* Column 2: Connectivity & Routing Check */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-display uppercase tracking-widest text-venus-dim">Cross-Platform Nexus</h3>
                        <div className="bg-venus-surface/30 rounded-xl border border-white/5 p-4 space-y-4">
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <span className="text-sm font-bold text-white">Route: /dashboard</span>
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Active</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <span className="text-sm font-bold text-white">Route: /preview/galactic</span>
                                <Link to="/preview/galactic" className="text-[10px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded transition-colors">Verify</Link>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-white">Aura Extension Bridge</span>
                                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded">Pending Detection</span>
                            </div>

                            <div className="mt-4 p-3 bg-black/40 rounded-lg">
                                <div className="text-[10px] font-mono text-venus-dim mb-1">Last Sync Payload:</div>
                                <pre className="text-[9px] font-mono text-galactic-secondary overflow-x-auto">
                                    {aura.data ? JSON.stringify(aura.data, null, 2) : '// No Data Synced'}
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Graph Viz Placeholder */}
                    <div className="space-y-4 lg:col-span-1">
                        <h3 className="text-xs font-display uppercase tracking-widest text-venus-dim">R1 Node Topology</h3>
                        <div className="h-64 lg:h-full min-h-[200px] bg-venus-surface/30 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                            <div className="w-32 h-32 rounded-full border border-galactic-primary/20 animate-pulse-slow absolute" />
                            <div className="w-48 h-48 rounded-full border border-galactic-secondary/10 animate-[spin_10s_linear_infinite] absolute" />
                            <span className="text-venus-dim font-mono text-sm uppercase tracking-widest relative z-10">
                                [ Graph Topo ]
                            </span>
                        </div>
                    </div>
                </div>
            </VizFrame>
        </div>
    );
};
