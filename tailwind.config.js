/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f5ede0',
          300: '#ede0cc',
          400: '#e0cdb0',
          500: '#d0b894',
        },
        charcoal: {
          50: '#f6f5f3',
          100: '#e8e6e1',
          200: '#cdc9c0',
          300: '#a8a296',
          400: '#7c766a',
          500: '#5a544a',
          600: '#423d36',
          700: '#2e2a25',
          800: '#1c1a17',
          900: '#121110',
        },
        champagne: {
          50: '#fbf7f0',
          100: '#f5ebd9',
          200: '#ebd7b8',
          300: '#dcbd91',
          400: '#cda36e',
          500: '#bf8d52',
          600: '#a87644',
          700: '#875c38',
          800: '#634630',
          900: '#42311f',
        },
        taupe: {
          50: '#f8f6f3',
          100: '#ede8e1',
          200: '#dccfbd',
          300: '#c4b098',
          400: '#a8917a',
          500: '#8a7460',
          600: '#6e5b4b',
          700: '#54463b',
          800: '#3a3029',
          900: '#251f1b',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'wide-lg': '0.15em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};
