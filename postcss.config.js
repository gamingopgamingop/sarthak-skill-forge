const presetEnv = require("postcss-preset-env");


export default {
  plugins: {
    '@tailwindcss/postcss': {},
    presetEnv(),

    autoprefixer: {},
  },
}
