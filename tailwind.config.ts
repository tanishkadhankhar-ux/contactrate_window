import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'var(--color-white)',
        },
        dark: 'var(--color-charcoal)',
        muted: {
          DEFAULT: 'var(--color-medium-grey)',
        },
        primary: {
          DEFAULT: 'var(--color-primary-700)',
          300: '#ECF1FF',
          muted: '#ECF1FF',
          700: '#007AC8',
          750: '#1E72A8',
          800: '#0B5F95',
        },
        secondary: {
          300: '#FEF9EF',
          500: '#F3C060',
        },
        neutral: {
          0: '#FFFFFF',
          50: '#F8F8FA',
          100: '#F3F5FB',
          200: '#EDEDED',
          300: '#ECF1FF',
          500: '#6A6A6A',
          800: '#333333',
          900: '#000000',
        },
        feedback: {
          error: '#EB4015',
          warning: '#FFB136',
          success: '#0C7663',
        },
        green: {
          DEFAULT: '#0C7663',
          muted: '#E8F5F1',
        },
        amber: {
          DEFAULT: '#F3C060',
          muted: '#FEF5E8',
        },
        focus: '#80CAF4',
      },
      fontFamily: {
        display: ['var(--font-schnyder)', 'Georgia', 'Times New Roman', 'serif'],
        sans: [
          'var(--font-work-sans)',
          'Work Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        body: [
          'var(--font-work-sans)',
          'Work Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        display: ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-md': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-lg': ['2.25rem', { lineHeight: '1.15', fontWeight: '600' }],
        'headline-md': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.5' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        caption: ['0.75rem', { lineHeight: '1.5' }],
      },
      maxWidth: {
        content: '640px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
        },
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
        button: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
      },
      spacing: {
        7: '1.75rem',
        '4.5': '18px',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
