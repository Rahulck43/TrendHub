/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    // Include other paths if necessary
  ],
  plugins: [
    // Add any other plugins you want to use here
    // require("@tailwindcss/forms"), //  the built-in form styles
    require("tw-elements/dist/plugin.cjs"),
  ],
  darkMode: "class", // Set to "class" if you want to use dark mode with a class-based approach
  theme: {
    // Customize the theme as needed
    extend: {
      // Add your custom styles here
    },
  },
  variants: {
    // Customize the variants as needed
  },
  
};
