const presetEnv = require("postcss-preset-env");


export default {
  plugins: {
    '@tailwindcss/postcss': {},
    presetEnv : {
      stage: 0,
      features: {
        'nesting-rules': true,
      },
    },

    autoprefixer: {},
  },
}
