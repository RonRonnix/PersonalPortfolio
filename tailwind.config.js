/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins','system-ui','sans-serif']
      },
      colors: {
        brand: {
          50: '#f2f8f5',
          100: '#dcebe2',
            200: '#b9d6c5',
            300: '#94bea8',
            400: '#6fa78b',
            500: '#5d8773',
            600: '#4a6a5a',
            700: '#3a5145',
            800: '#2d3d36',
            900: '#1e2723'
        }
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee 25s linear infinite reverse'
      }
    }
  },
  plugins: []
}
