/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0b0d14',
          card: '#13161f',
          elevated: '#1a1e2d',
        },
        accent: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
          muted: 'rgba(99,102,241,0.15)',
          glow: 'rgba(99,102,241,0.3)',
        },
        border: {
          subtle: 'rgba(255,255,255,0.07)',
          accent: 'rgba(99,102,241,0.6)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.25) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07)',
        'accent-glow': '0 0 24px rgba(99,102,241,0.35)',
        'popular-glow': '0 0 40px rgba(99,102,241,0.2)',
        terminal: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'marquee': 'marquee 28s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-25%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)',   opacity: '0.8' },
          '50%':      { transform: 'scale(1.5)', opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
