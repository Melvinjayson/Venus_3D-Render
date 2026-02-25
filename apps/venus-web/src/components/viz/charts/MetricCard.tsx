import React from 'react';
import { cn } from '../../../lib/cn';

interface MetricCardProps {
    label: string;
    value: string | number;
    trend?: number; // percentage change
    trendLabel?: string;
    icon?: React.ReactNode;
    className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, trendLabel, icon, className }) => {
    const isPositive = trend && trend > 0;
    const isNeutral = trend === 0;

    return (
        <div className={cn(
            "bg-venus-black/40 border border-white/5 p-4 rounded-xl flex flex-col justify-between hover:border-white/10 transition-colors group",
            className
        )}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] uppercase tracking-widest text-venus-dim font-bold">{label}</span>
                {icon && <div className="text-venus-dim group-hover:text-white transition-colors">{icon}</div>}
            </div>

            <div className="space-y-1">
                <div className="text-2xl font-mono font-medium text-venus-text group-hover:text-white transition-colors">
                    {value}
                </div>

                {trend !== undefined && (
                    <div className={cn(
                        "text-[10px] font-bold flex items-center gap-1",
                        isPositive ? "text-color-status-success" : (isNeutral ? "text-venus-dim" : "text-color-status-error")
                    )}>
                        <span className={isPositive ? "text-emerald-400" : (isNeutral ? "text-gray-400" : "text-rose-400")}>
                            {isPositive ? '↑' : (isNeutral ? '−' : '↓')} {Math.abs(trend)}%
                        </span>
                        {trendLabel && <span className="text-venus-dim opacity-50 ml-1">{trendLabel}</span>}
                    </div>
                )}
            </div>
        </div>
    );
};
