/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/**/*.{js, jsx, ts, tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'logo': '#DB8C92', 
        "neutral": "#F4F4ED",
        "alabaster": "#EFEFE6", 
        "dark": "#577399"
      },
      fontFamily: {
        logo: ['Red Hat Mono'], 
        handwritten: ["Fuzzy Bubbles"]
      }
    }
  },
  plugins: [],
}
