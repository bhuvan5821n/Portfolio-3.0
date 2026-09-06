// PostCSS config for Tailwind CSS
const tailwindcssPostcss = require('@tailwindcss/postcss');

module.exports = {
  plugins: [
    tailwindcssPostcss,
    require('autoprefixer'),
  ]
}