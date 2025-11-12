module.exports = {
  plugins: [
    require('@tailwindcss/postcss')({
      content: [
        './src/**/*.{tsx,ts,html}',
        './src/pages/**/*.html',
        './src/index.html'
      ]
    }),
  ]
};
