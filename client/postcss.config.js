const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.jsx', './src/**/*.js', './public/index.html'],
  css: ['./src/**/*.css'],

  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
  plugins: [
    require('tailwindcss')('./src/utils/styles/tailwind.js'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
