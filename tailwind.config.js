/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#B91C1C',
        'primary-dark': '#7F1D1D',
        'primary-light': '#FEE2E2',
        surface: '#FFFFFF',
        background: '#F3F4F6',
        ink: '#1F2937',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 12px 36px rgba(31, 41, 55, 0.07)',
        soft: '0 4px 20px rgba(31, 41, 55, 0.06)',
      },
    },
  },
  plugins: [],
}
