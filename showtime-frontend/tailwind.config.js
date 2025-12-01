/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { 
        primary: "#DC3545",      // Signature Red
        accent: "#C82333",       // Darker Red Hover
        bgDark: "#121212",       // Dark Background
        textLight: "#F5F5F5",    // Light Text
        footerBg: "#1E1E1E",     // Muted Black-Grey
        footerText: "#A8A8A8",   // Faded Text Grey
      },
      backgroundColor: (theme) => ({
        ...theme('colors'),
        accent: "#C82333", 
      }),
    },
  },
  plugins: [],
};