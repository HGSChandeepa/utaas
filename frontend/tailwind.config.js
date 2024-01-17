/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        
        '16': 'repeat(16, minmax(0, 1fr))',
      }

    },
  },
  plugins: [],
};
