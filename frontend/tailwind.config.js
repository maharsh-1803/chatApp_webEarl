/** @type {import('tailwindcss').Config} */
import plugin from 'daisyui'
// const plugin =require("daisyui")
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [plugin],
}

