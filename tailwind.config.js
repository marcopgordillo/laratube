const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fade-in-down': {
          'from': {
            transform: 'translateY(-0.75rem)',
            opacity: 0,
          },
          'to': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        'progress-bar-striped': {
          '0%': {
            backgroundPositionX: '1rem',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-in-out both',
        'progress-striped': 'progress-bar-striped 1s linear infinite',
      },
      backgroundImage: {
        'striped': 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
