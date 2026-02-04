import postcssPresetEnv from "postcss-preset-env";

export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": postcssPresetEnv({
      stage: 0,
      features: {
        "nesting-rules": true,
      },
        parser: "postcss-safe-parser",

    }),
    autoprefixer: {},
  },
};
