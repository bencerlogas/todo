module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      desktop: '1024px',
      // => @media (min-width: 1024px) { ...}
    },
    extend: {
      colors: {
        green: {
          50: '#38CB89',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
