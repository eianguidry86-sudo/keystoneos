import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        // Stitch Obsidian Meridian tokens
        "surface-container-low": "#151b2d",
        "on-secondary": "#003731",
        "on-error-container": "#ffdad6",
        "surface-tint": "#c0c1ff",
        "surface-variant": "#2e3447",
        "on-secondary-fixed-variant": "#005048",
        "surface-dim": "#0c1324",
        "inverse-primary": "#494bd6",
        "inverse-surface": "#dce1fb",
        "secondary": "#4fdbc8",
        "on-tertiary-fixed-variant": "#5516be",
        "primary-fixed": "#e1e0ff",
        "error-container": "#93000a",
        "error": "#ffb4ab",
        "tertiary-fixed": "#e9ddff",
        "on-tertiary": "#3c0091",
        "surface-container-high": "#23293c",
        "on-primary-fixed-variant": "#2f2ebe",
        "primary-container": "#8083ff",
        "outline": "#908fa0",
        "on-tertiary-fixed": "#23005c",
        "on-primary-container": "#0d0096",
        "on-tertiary-container": "#340080",
        "tertiary-container": "#a078ff",
        "on-error": "#690005",
        "secondary-fixed": "#71f8e4",
        "secondary-fixed-dim": "#4fdbc8",
        "on-primary": "#1000a9",
        "inverse-on-surface": "#2a3043",
        "surface": "#0c1324",
        "on-background": "#dce1fb",
        "outline-variant": "#464554",
        "secondary-container": "#04b4a2",
        "surface-bright": "#33394c",
        "tertiary": "#d0bcff",
        "primary-fixed-dim": "#c0c1ff",
        "primary": "#c0c1ff",
        "on-surface-variant": "#c7c4d7",
        "on-secondary-container": "#003f38",
        "on-surface": "#dce1fb",
        "on-primary-fixed": "#07006c",
        "background": "#0c1324",
        "tertiary-fixed-dim": "#d0bcff",
        "surface-container-lowest": "#070d1f",
        "surface-container-highest": "#2e3447",
        "surface-container": "#191f31",
        "on-secondary-fixed": "#00201c"
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        "DEFAULT": "0.25rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "lg": "24px",
        "gutter": "20px",
        "container-max": "1440px",
        "md": "16px",
        "base": "4px",
        "sm": "8px",
        "xl": "48px",
        "xs": "4px"
      },
      fontFamily: {
        "headline-lg-mobile": ["Geist"],
        "label-sm": ["JetBrains Mono"],
        "body-lg": ["Geist"],
        "label-md": ["JetBrains Mono"],
        "headline-md": ["Geist"],
        "display-lg": ["Geist"],
        "headline-lg": ["Geist"],
        "body-md": ["Geist"]
      },
      fontSize: {
        "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "600"}],
        "label-sm": ["10px", {"lineHeight": "1", "fontWeight": "500"}],
        "body-lg": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "label-md": ["12px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500"}],
        "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
        "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "700"}],
        "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600"}],
        "body-md": ["14px", {"lineHeight": "1.5", "fontWeight": "400"}]
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        domino: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease forwards',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        domino: 'domino 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
