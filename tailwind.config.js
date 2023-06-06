const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: {
          regular: '#2B3945',
          dark: '#202C37',
          darkest: '#111517'
        },
        darkGrey: '#858585',
        lightGrey: '#FAFAFA'
      },
      fontFamily: {
        'sans': ['Nunito Sans','Proxima Nova', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

