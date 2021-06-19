// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  plugins: [require("tailwind-scrollbar")],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
      },
      fontFamily: {
        faded: ["'Rubik'", "sans-serif"],
        memory: ["'Montserrat'", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
};
