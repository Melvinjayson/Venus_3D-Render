/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                venus: {
                    black: 'rgb(var(--color-venus-black) / <alpha-value>)',
                    dark: 'rgb(var(--color-venus-dark) / <alpha-value>)',
                    surface: 'rgb(var(--color-venus-surface) / <alpha-value>)',
                    highlight: '#2a2a35',
                    text: '#e2e2e5',
                    dim: '#8a8a95',
                },
                galactic: {
                    primary: 'rgb(var(--color-galactic-primary) / <alpha-value>)',
                    secondary: 'rgb(var(--color-galactic-secondary) / <alpha-value>)',
                    accent: 'rgb(var(--color-galactic-accent) / <alpha-value>)',
                }
            },
            fontFamily: {
                sans: ['var(--font-body)', 'sans-serif'],
                display: ['var(--font-display)', 'sans-serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
