/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #1a1c2a 0%, #121420 100%)',
        'premium-dots': "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        'dots-sm': '24px 24px',
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'),],
}
