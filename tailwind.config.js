module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          50: "#38CB89",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
