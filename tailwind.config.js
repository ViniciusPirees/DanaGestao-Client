/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: {'min': "640px", 'max': '1279px'},
      laptop: {'min': "1280px", 'max': '1400px'},
      phone: {'min': "360px", 'max': '640px'},
      desktop: "1400px",
      // => @media (min-width: 1280px) { ... }
    },
    colors: {
      dana: "#1C85C7",
      fundo: "#1f1f1f",
      input: "#3B3B3B",
      confirm: "#21862a",
      cancela: "#cc0000",
    },
    extend: {},
  },
  plugins: [],
};
