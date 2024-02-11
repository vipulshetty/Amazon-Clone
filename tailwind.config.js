module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazonDarkBlue: '#131921',
        amazonLightBlue: '#232f3f',
        amazonOrange: '#febd69'
      }
    },
    
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
