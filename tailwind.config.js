/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bvg-yellow': '#F0D722',
        'bvg-dark': '#1A1A24',
        'bvg-gray': '#2C2D35',
        'bvg-light': '#F8F9FA',
        'bvg-accent': '#E30613',
      },
      borderRadius: {
        'xl': '12px',
        'lg': '8px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
