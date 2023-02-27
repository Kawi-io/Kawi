/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'white': { DEFAULT: '#F1F3F4', 50: '#FFFFFF', 100: '#FFFFFF', 200: '#FFFFFF', 300: '#FFFFFF', 400: '#FFFFFF', 500: '#F1F3F4', 600: '#D2D8DB', 700: '#B2BDC3', 800: '#93A2AA', 900: '#738791' },
      'black': { DEFAULT: '#000000', 50: '#5C5C5C', 100: '#525252', 200: '#3D3D3D', 300: '#292929', 400: '#141414', 500: '#000000', 600: '#000000', 700: '#000000', 800: '#000000', 900: '#000000' },
      'purple': { DEFAULT: '#512B58', 50: '#B47CBF', 100: '#AD6EB8', 200: '#9D53AA', 300: '#83468F', 400: '#6A3873', 500: '#512B58', 600: '#2E1932', 700: '#0C060D', 800: '#000000', 900: '#000000' },
      'teal': { DEFAULT: '#2A7886', 50: '#EAF6F8', 100: '#DAF0F3', 200: '#BBE3EA', 300: '#9CD6E0', 400: '#7DC9D6', 500: '#5EBCCD', 600: '#3FAFC3', 700: '#3494A5', 800: '#2A7886', 900: '#1D525B' },
      'gray': { DEFAULT: '#6B7280', 50: '#CDD0D5', 100: '#C2C5CC', 200: '#ACB0BA', 300: '#969BA7', 400: '#7F8694', 500: '#6B7280', 600: '#515761', 700: '#383C43', 800: '#1E2024', 900: '#050506' },
    },
    fontFamily: {
      title: '"Noto sans"'
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
