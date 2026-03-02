/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochromatic Base
        'off-black': '#0a0a0a',
        'dark-grey': '#1a1a1a',
        'mid-grey': '#333333',
        'off-white': '#f5f5f5',

        // Brand Colors (Responsive Precision)
        'obsidian': '#0F0F0F',
        'rochelais-gold': '#E8A800', // Brand Gold

        // The Anomaly Accent
        'neon-blue': '#00f0ff', // Electric Cyan

        // Surface Levels (Visual Harmonization)
        'surface-base': '#111111',
        'surface-raised': '#161616',
        'divider': 'rgba(245,245,245,0.07)',
      },
      fontFamily: {
        // Structure (Headlines)
        'primary': ['"Inter Tight"', 'sans-serif'],
        'header': ['"Oswald"', 'sans-serif'],
        // Precision (Data)
        'secondary': ['"Space Mono"', 'monospace'],
        'georgian': ['"Noto Sans Georgian"', 'sans-serif'],
      },
      fontSize: {
        'brand-ka': ['20px', { lineHeight: '1' }],
        'brand-ka-md': ['23px', { lineHeight: '1' }],
        'brand-en': ['18px', { lineHeight: '1' }],
        'brand-en-md': ['20px', { lineHeight: '1' }],
        'nav-ka': ['13px', { lineHeight: '1' }],
        'nav-ka-md': ['14px', { lineHeight: '1' }],
        'nav-en': ['14px', { lineHeight: '1' }],
        'nav-en-md': ['16px', { lineHeight: '1' }],
      },
      letterSpacing: {
        'brand-ka': '0.20em',
        'brand-en': '0.18em',
        'nav-ka': '0.08em',
        'nav-en': '0.12em',
        'slogan-author': '0.22em',
        'section-heading-ka': '0.15em',
        'section-heading': '0.25em',
      },
      spacing: {
        'header': '64px',
      },
      transitionTimingFunction: {
        // "Snap" physics - instant acceleration, sharp stop
        'snap': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      transitionDuration: {
        'fast': '100ms',
        'medium': '300ms',
      },
      cursor: {
        'none': 'none',
      },
    },
  },
  plugins: [],
}
