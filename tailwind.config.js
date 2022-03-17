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
        'progress-stripes': {
          '100%': {
            backgroundPosition: '-100px 0px',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-in-out both',
        'progress-stripes': 'animate-stripes 5s linear infinite',
      },
      boxShadow: {
        'inner-progress': '0 2px 5px rgba(0, 0, 0, 0.25) inset',
      },
      backgroundSize: {
        'progress': '35px 20px, 100% 100%, 100% 100%',
      },
      backgroundImage: {
        'progress': '-webkit-linear-gradient(-45deg, \n' +
          '\t                           transparent 33%, rgba(0, 0, 0, .1) 33%, \n' +
          '\t                           rgba(0,0, 0, .1) 66%, transparent 66%),\n' +
          '\t   -webkit-linear-gradient(top, \n' +
          '\t                           rgba(255, 255, 255, .25), \n' +
          '\t                           rgba(0, 0, 0, .25)),\n' +
          '\t   -webkit-linear-gradient(left, #09c, #f44)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
