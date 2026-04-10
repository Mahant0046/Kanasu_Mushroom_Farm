/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f5e8',
          100: '#e8e8d0',
          200: '#d4d3a8',
          300: '#b5b474',
          400: '#9a9549',
          500: '#7d7a26',
          600: '#63631f',
          700: '#4e4c1a',
          800: '#3f3e17',
          900: '#353415',
        },
        earth: {
          50: '#faf7f2',
          100: '#f5efe3',
          200: '#e9dfc7',
          300: '#d9c5a1',
          400: '#c4a676',
          500: '#a88652',
          600: '#8c6c43',
          700: '#735637',
          800: '#5e472f',
          900: '#4e3d28',
        },
        forest: {
          50: '#f0f7f2',
          100: '#e0efe6',
          200: '#c3decf',
          300: '#96c4b0',
          400: '#63a58e',
          500: '#3e8a70',
          600: '#326e5a',
          700: '#2a5749',
          800: '#26463d',
          900: '#223c35',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
