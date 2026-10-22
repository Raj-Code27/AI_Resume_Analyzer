/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: {
          DEFAULT: 'var(--surface)',
          muted: 'var(--surface-muted)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          muted: 'var(--foreground-muted)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          warm: 'var(--accent-warm)',
        },
        border: 'var(--border)',
        ring: 'var(--ring)',
        // Semantic status colors
        success: {
          DEFAULT: 'var(--success)',
          soft: 'var(--success-soft)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          soft: 'var(--warning-soft)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          soft: 'var(--danger-soft)',
        },
        // Direct Lavender and Silks base palette tokens
        lavender: {
          dustyRose: '#d2bfc2',
          silverMist: '#e2e2e5',
          gray: '#b2aec3',
          mutedViolet: '#908ca8',
          slateViolet: '#5d5a74',
        },
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(38, 37, 58, 0.05), 0 1px 2px 0 rgba(38, 37, 58, 0.03)',
        card: '0 4px 12px 0 rgba(38, 37, 58, 0.05), 0 1px 3px 0 rgba(38, 37, 58, 0.03)',
        floating: '0 12px 30px -4px rgba(38, 37, 58, 0.08), 0 4px 10px -2px rgba(38, 37, 58, 0.03)',
      },
    },
  },
  plugins: [],
}
