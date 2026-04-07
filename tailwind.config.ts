import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['1.75rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        'display-md': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '600' }],
        'display-lg': ['2rem', { lineHeight: '2.5rem', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.35rem', fontWeight: '400' }],
      },
      colors: {
        primary: {
          300: '#ECF1FF',
          700: '#007AC8',
          750: '#1E72A8',
          800: '#0B5F95',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F3F5FB',
          200: '#EDEDED',
          500: '#6A6A6A',
          600: '#475569',
          700: '#334155',
          800: '#333333',
          900: '#000000',
        },
      },
      maxWidth: {
        content: '640px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        lg: '12px',
      },
      spacing: {
        7: '1.75rem',
      },
    },
  },
  plugins: [],
}

export default config
