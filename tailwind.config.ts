import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
  theme: {
    extend: {
      colors: {
        // Warm, personal palette: charcoal, cream and bronze. No corporate navy.
        ink: { DEFAULT: '#16120E', 800: '#1E1914', 700: '#2B241D', 600: '#3B3229' },
        paper: { DEFAULT: '#F6F1E9', 200: '#EEE6D9', 300: '#E2D6C3' },
        bronze: { DEFAULT: '#C08A4A', light: '#E0B87F', deep: '#875A22' },
        stone: { DEFAULT: '#5E564C', light: '#8C8377' },
      },
      fontFamily: {
        serif: ['"Fraunces Variable"', '"Tiro Devanagari Marathi"', 'Georgia', 'serif'],
        sans: ['"Manrope Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        marathi: ['"Tiro Devanagari Marathi"', 'serif'],
      },
      fontSize: {
        // Capped by viewport height too, so the hero fits short laptop screens
        mega: ['min(clamp(3.2rem, 0.6rem + 11.5vw, 11.5rem), 18svh)', { lineHeight: '0.88', letterSpacing: '-0.045em' }],
        display: ['clamp(2.3rem, 1.3rem + 5.2vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        statement: ['clamp(1.6rem, 1rem + 3vw, 3.9rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        h1: ['clamp(2rem, 1.4rem + 3vw, 4rem)', { lineHeight: '1.06', letterSpacing: '-0.015em' }],
        h2: ['clamp(1.75rem, 1.2rem + 2.4vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        h3: ['clamp(1.35rem, 1.1rem + 0.9vw, 1.85rem)', { lineHeight: '1.2' }],
        lead: ['clamp(1.05rem, 0.98rem + 0.35vw, 1.3rem)', { lineHeight: '1.65' }],
      },
      maxWidth: { site: '80rem' },
      letterSpacing: { eyebrow: '0.22em' },
    },
  },
  plugins: [],
};
export default config;
