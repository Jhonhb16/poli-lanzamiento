/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      colors: {
        pearl: '#FFF8F2',
        rosewood: '#7A304B',
        blush: '#F8DDE4',
        ink: '#1C1518',
        champagne: '#D8B36A',
        sage: '#7E9680',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(71, 30, 45, 0.14)',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
