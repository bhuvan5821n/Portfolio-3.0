/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f4f5f2',
        'paper-2': '#e7e7df',
        ink: '#151719',
        graphite: '#242724',
        muted: '#555b57',
        'muted-dark': '#c4c8c2',
        yellow: '#e5aa24',
        'yellow-dark': '#b67b08',
        line: 'rgb(21 23 25 / 0.16)',
        'line-dark': 'rgb(244 245 242 / 0.17)',
        'shadow-paper': '0 22px 42px rgb(72 67 49 / 0.16), 0 3px 8px rgb(72 67 49 / 0.12)',
        'shadow-object': '0 24px 26px rgb(37 36 30 / 0.19)',
      },
      spacing: {
        gutter: 'clamp(1rem, 4vw, 3.5rem)',
      },
      borderRadius: {
        small: '6px',
      },
      fontFamily: {
        bricolage: ['var(--font-bricolage)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(3.1rem, 8vw, 7.4rem)', { lineHeight: '1.02', letterSpacing: '-0.045em' }],
        'h2': ['clamp(2.15rem, 5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.045em' }],
        'h3': ['clamp(1.35rem, 2vw, 2rem)', { lineHeight: '1.02', letterSpacing: '-0.045em' }],
        'body': ['clamp(1rem, 0.96rem + 0.2vw, 1.125rem)', { lineHeight: '1.58' }],
      },
    },
  },
  plugins: [],
}