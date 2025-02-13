/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          'primary': ['#4A6CF7'],
          'primary-hover': ['#3B56D3'], // Darker than #4A6CF7
          'black': ['#2A2A2A'],
          'white': ['#FAFAFA'],
          'grey': ['#B0B0B0'],
      },
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, #4A6CF7 0%, #5296E3 50%, #7A8BD1 100%)',
        'gradient-to-b-1': 'linear-gradient(to bottom, #6A11CB 0%, #2575FC 100%)',
        'gradient-to-b-2': 'linear-gradient(to bottom, #F12711 0%, #F5AF19 100%)',
        'gradient-to-b-3': 'linear-gradient(to bottom, #5433FF 0%, #20BDFF 50%, #A5FECB 100%)',
        'gradient-to-b-4': 'linear-gradient(to bottom, #FF5F6D 0%, #FFC371 100%)',
        'gradient-to-b-5': 'linear-gradient(to bottom, #CD84F1 0%, #FFCCCC 100%)'
      },      
      fontFamily: {
        'generalSans-light': ['GeneralSans-Light', 'sans-serif'],
        'generalSans-light-italic': ['GeneralSans-LightItalic', 'sans-serif'],
        'generalSans': ['GeneralSans-Regular', 'sans-serif'],
        'generalSans-italic': ['GeneralSans-Italic', 'sans-serif'],
        'generalSans-medium': ['GeneralSans-Medium', 'sans-serif'],
        'generalSans-medium-italic': ['GeneralSans-MediumItalic', 'sans-serif'],
        'generalSans-semibold': ['GeneralSans-Semibold', 'sans-serif'],
        'generalSans-semibold-italic': ['GeneralSans-Semibold', 'sans-serif'],
        'generalSans-bold': ['GeneralSans-Bold', 'sans-serif'],
        'generalSans-bold-italic': ['GeneralSans-BoldItalic', 'sans-serif'],
        'generalSans-variable': ['GeneralSans-Variable', 'sans-serif'],
        'generalSans-variable-italic': ['GeneralSans-VariableItalic', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
