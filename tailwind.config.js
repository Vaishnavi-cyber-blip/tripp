/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('/assets/wall6.png')", // Add your image path here
      },
      colors: {
        'custom-purple': '#004aad',
      },
    },
  },
  plugins: [],
}
