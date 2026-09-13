import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm:       '640px',
      md:       '768px',
      lg:       '1024px',
      xl:       '1280px',
      '2xl':    '1536px',
      desktop:  '1440px',
    },
    extend: {
      colors: {
        purple: {
          DEFAULT: '#8e2dff',
          light:   '#a855f7',
          dim:     'rgba(142, 45, 255, 0.15)',
          glow:    'rgba(142, 45, 255, 0.35)',
        },
        bg: {
          base:     '#080810',
          surface:  '#0f0f1a',
          elevated: '#161625',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          med:     'rgba(255, 255, 255, 0.14)',
        },
        text: {
          primary:   '#f0eeff',
          secondary: 'rgba(240, 238, 255, 0.65)',
          muted:     'rgba(240, 238, 255, 0.38)',
        },
        accent: {
          cyan:  '#00d4ff',
          green: '#22c55e',
          amber: '#f59e0b',
          red:   '#ef4444',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        'sirp-sm': '6px',
        'sirp-md': '10px',
        'sirp-lg': '16px',
        'sirp-xl': '24px',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
