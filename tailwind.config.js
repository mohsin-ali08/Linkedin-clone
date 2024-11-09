/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'reaction-like': '#1877f2', // Facebook blue
        'reaction-love': '#e0245e', // Red for love
        'reaction-haha': '#f7b924', // Yellow for haha
        'reaction-wow': '#6a4eaf', // Purple for wow
        'reaction-grin': '#28a745', // Green for grin
      },
    },
  },
  plugins: [],
}
