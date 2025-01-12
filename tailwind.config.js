/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        'cardbackground': '#0e041c90',
        'lsrgstyle2': '#393E46',
        'lsrgstyle3': '#FFD369',
        'lsrgstyle4': '#EEEEEE',
        'contentbackground': '#17131C90',
        'contentbackgroundhover': '#3A304790',
        'darkbg': '#393E46',
        'darkcard': '#222831',
        'primarytext': '#EEEEEE',
        'secondarytext': '#bbbbbb'
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(45deg, rgba(255, 255, 28, 0.5) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 212, 255, 0.5) 100%)',
      },
      fontFamily: {
        custom: ['Inter', 'sans-serif'], // Add your custom font here
      },
      maxHeight: {
        '128': '32rem',
        '144': '36rem'
      }
    },
  },
  plugins: [],
}
