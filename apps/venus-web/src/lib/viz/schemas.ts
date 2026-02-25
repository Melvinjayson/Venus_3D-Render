import { z } from 'zod';

// Base types for Visualization Data
export const BaseMetricSchema = z.object({
    id: z.string(),
    label: z.string(),
    value: z.number(),
    unit: z.string().optional(),
    timestamp: z.string().datetime(),
});

export const TimeSeriesPointSchema = z.object({
    timestamp: z.string().datetime(),
    value: z.number(),
    category: z.string().optional(),
});

export const VizConfigSchema = z.object({
    refreshRate: z.number().min(1000).default(5000),
    theme: z.enum(['dark', 'light']).default('dark'),
    features: z.object({
        enableMotion: z.boolean().default(true),
        showGrid: z.boolean().default(true),
    }),
});

export type BaseMetric = z.infer<typeof BaseMetricSchema>;
export type TimeSeriesPoint = z.infer<typeof TimeSeriesPointSchema>;
