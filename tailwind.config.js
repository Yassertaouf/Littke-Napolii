/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        napoli: { pink: '#db1374', sky: '#82c8e5', limone: '#f6c945' },
      },
    },
  },
  plugins: [],
};
