/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './entrypoints/**/*.{js,ts,jsx,tsx,html}', 
    './popup.html',  // Include any HTML files in your extension
    './entrypoints/components/**/*.{js,ts,jsx,tsx}' // Include your component directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
