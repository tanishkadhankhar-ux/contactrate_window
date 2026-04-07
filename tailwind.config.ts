import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['1.75rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        'display-lg': ['2rem', { lineHeight: '2.5rem', fontWeight: '600' }],
      },
      colors: {
        primary: {
          300: '#ECF1FF',
          700: '#007AC8',
        },
        neutral: {
          50: '#F8FAFC',
          200: '#EDEDED',
          500: '#6A6A6A',
          600: '#475569',
          700: '#334155',
          800: '#333333',
          900: '#000000',
        },
      },
    },
  },
  plugins: [],
}

export default config
