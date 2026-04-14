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
        },
        // Farm Dashboard Organic Palette
        organic: {
          green: {
            DEFAULT: '#2D5A27',
            50: '#F0F7F0',
            100: '#E0EFE0',
            200: '#C3DFC3',
            300: '#96C496',
            400: '#63A863',
            500: '#2D5A27',
            600: '#254820',
            700: '#1D3819',
            800: '#152812',
            900: '#0D180C',
          },
          brown: {
            DEFAULT: '#5C4033',
            50: '#FDF5F2',
            100: '#FBE8E0',
            200: '#F7D4C1',
            300: '#F2B59B',
            400: '#EE9275',
            500: '#5C4033',
            600: '#4A3328',
            700: '#38261E',
            800: '#261914',
            900: '#140D0A',
          },
          cream: {
            DEFAULT: '#FDFBF7',
            50: '#FFFFFF',
            100: '#FDFBF7',
            200: '#FBF6EF',
            300: '#F8F0E5',
            400: '#F4E9D8',
            500: '#F0E2CB',
            600: '#ECDABE',
            700: '#E8D2B1',
            800: '#E4CAA4',
            900: '#E0C297',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Open Sans', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Montserrat', 'serif'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
