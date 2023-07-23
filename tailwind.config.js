/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addBase, config }) {
      addBase({
        'ul': {
          listStyleType: 'disc',
          padding: config('theme.spacing.1'),
        },
        'li': {
          marginLeft: '10px'
        }
      })
    }
  ],
}

