/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#010400',
        coralPink: '#e8998d',
        spaceCadet: '#2d3047',
        isabelline: '#fbf7f4',
        ouCrimson: '#880d1e',
      },
    },
  },
  plugins: [],
}