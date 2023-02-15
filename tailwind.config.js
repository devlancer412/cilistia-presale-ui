/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#0f172a",
        blue: "rgb(59 130 246/var(--tw-bg-opacity))",
      },
      textColor: {
        primary: "#fff",
        blue: "rgb(59 130 246/var(--tw-bg-opacity))",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
