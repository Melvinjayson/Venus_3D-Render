import React from 'react';
import { cn } from '../../lib/cn';

interface VizFrameProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    loading?: boolean;
}

export const VizFrame: React.FC<VizFrameProps> = ({
    title,
    description,
    actions,
    children,
    className,
    loading
}) => {
    return (
        <div className={cn(
            "flex flex-col h-full w-full bg-venus-surface/50 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden transition-all duration-300",
            loading && "opacity-80 pointer-events-none",
            className
        )}>
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-white/5 bg-venus-surface/80">
                <div className="space-y-1">
                    <h2 className="text-xl font-display font-bold text-white tracking-tight uppercase flex items-center gap-2">
                        {title}
                        {loading && <span className="w-1.5 h-1.5 bg-galactic-primary rounded-full animate-pulse" />}
                    </h2>
                    {description && (
                        <p className="text-xs text-venus-dim font-mono tracking-wide">
                            {description}
                        </p>
                    )}
                </div>
                {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-auto p-0 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {children}
            </div>
        </div>
    );
};

export const VizSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={cn("p-6", className)}>
        {children}
    </div>
);
