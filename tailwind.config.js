/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C81E25',
        'primary-dark': '#8F171C',
        'primary-light': '#FDE8E8',
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
