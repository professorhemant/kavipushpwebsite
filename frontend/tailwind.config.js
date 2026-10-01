/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon:     { DEFAULT: '#6B0F0F', light: '#8B1A1A', dark: '#4A0A0A' },
        gold:       { DEFAULT: '#D4AF37', light: '#F0CD5A', dark: '#B8962E' },
        cream:      { DEFAULT: '#FFF8E4', dark: '#F5EDD0' },
      },
      fontFamily: {
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        sans:   ['"Inter"', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: []
};
