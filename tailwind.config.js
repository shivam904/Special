/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Emotion-driven, cinematic color palette
      colors: {
        // Backgrounds - warm undertones, smoky depths
        bg: {
          deep: '#1a1816',      // Deep smoky brown-black
          charcoal: '#2a2723',  // Muted charcoal with warm undertones
          olive: '#2d2e28',     // Deep olive-gray
          warm: '#322e29',      // Smoky brown
        },
        // Text - soft, not harsh
        text: {
          ivory: '#f5f0e8',     // Soft ivory
          sand: '#d4c8b8',      // Desaturated sand
          muted: '#a89b8a',     // Muted warm gray
          whisper: '#8a7d6d',   // Whispered tone
        },
        // Accents - subtle, aged, dignified
        accent: {
          rose: '#c4a5a0',      // Dusty rose
          amber: '#c4a77d',     // Burnt amber
          copper: '#b8977a',    // Aged copper
          blush: '#d4b3ab',     // Soft blush
        }
      },
      fontFamily: {
        // High-end serif for primary text
        serif: ['Cormorant Garamond', 'Cormorant', 'Playfair Display', 'Georgia', 'serif'],
        // Minimal sans-serif for captions
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Custom sizes for emotional impact
        'hero': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'statement': ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.3', letterSpacing: '0.01em' }],
        'whisper': ['clamp(1rem, 2vw, 1.5rem)', { lineHeight: '1.6', letterSpacing: '0.02em' }],
        'breath': ['clamp(0.875rem, 1.5vw, 1.125rem)', { lineHeight: '1.8', letterSpacing: '0.04em' }],
      },
      letterSpacing: {
        'story': '0.05em',
        'breathe': '0.1em',
        'whisper': '0.15em',
      },
      lineHeight: {
        'story': '1.8',
        'poem': '2',
      },
      spacing: {
        'screen': '100vh',
        'safe': 'env(safe-area-inset-bottom)',
      },
      transitionTimingFunction: {
        'emotional': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'breathe': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'settle': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      transitionDuration: {
        'slow': '1200ms',
        'slower': '1800ms',
        'slowest': '2400ms',
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
