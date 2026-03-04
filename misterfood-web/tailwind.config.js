/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'jm-red': '#8B1E0F',   // Rojo vino clásico
        'jm-dark': '#1C1917',  // Carbón profundo
        'jm-bg': '#FAFAFA',    // Blanco ultra limpio
        'jm-gold': '#B48A44',  // Dorado sutil
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Fuente elegante para títulos
        sans: ['"Inter"', 'sans-serif'],        // Fuente limpia para textos
      }
    },
  },
  plugins: [],
}