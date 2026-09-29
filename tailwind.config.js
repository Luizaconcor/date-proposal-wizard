/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 60px -26px rgba(90, 24, 57, 0.35)',
      },
    },
  },
  plugins: [],
}
