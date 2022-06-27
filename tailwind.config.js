/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/**/*.{js, jsx, ts, tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'logo': '#DB8C92'
      },
      fontFamily: {
        logo: ['B612 Mono']
      }
    }
  },
  plugins: [],
}
