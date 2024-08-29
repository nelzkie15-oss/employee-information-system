/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,jsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
],


theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
        gap: {
          '11': '2.75rem',
        }
      }
  },
   plugins: [
    require('flowbite/plugin')
   ]
}

