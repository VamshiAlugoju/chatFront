const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", ...defaultTheme.fontFamily.sans],
      },
      gridTemplateRows: {
        main: "40px auto",
      },
      gridTemplateColumns: {
        main: "70px 250px auto",
        profile: "70px 250px auto 25%",
      },
      minHeight: {
        400: "400px",
      },
      maxHeight: {
        450: "450px",
        sm: "24rem",
      },
      maxWidth: {
        "3/4": "75%",
      },
      height: {
        550: "550px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
