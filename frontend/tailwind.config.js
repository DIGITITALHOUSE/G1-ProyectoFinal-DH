/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      extend: {
          colors: {
              primary: "#AA0C69", // #AA0C69
              secondary: "#3C79CF", // #3C79CF
              tertiary: "#060640",// #060640
              grayPrimary: "#777777",
              graySecondary: "#555555",
              grayTertiary: "#343434",
          },

          keyframes: {
              borderAnimation: {
                  "0%": { transform: "translateX(-100%)" },
                  "100%": { transform: "translateX(100%)" },
              },
          },
          animation: {
              borderAnimation: "borderAnimation 1s ease-in-out infinite",
          },
      },
  },
  plugins: [],
};
