import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@venus/shader-engine': path.resolve(__dirname, '../../packages/venus-shader-engine/src'),
        },
    },
    server: {
        port: 3000,
    },
});
