module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/scripts/components/**/*.js',
      './src/scripts/view/**/*.js',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-black': '#181818',
        'light-black-1': '#3E3E3E',
      },
      zIndex: {
        '-1': '-1',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(-13rem)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        slide: 'slide 400ms ease-in-out',
      }
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
}
