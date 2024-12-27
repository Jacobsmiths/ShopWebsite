/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navBG': '#490B3D',
        'hotPink':'#FF69B4',
      },
      gridTemplateColumns: {
        'auto-fit-min': 'repeat(auto-fit, minmax(100px, 1fr))',
      },
      gridAutoRows: {
        '100px': '100px',
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}