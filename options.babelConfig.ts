// options.babelConfig.ts

export default {
  presets: [
    ["@babel/preset-env", {
      targets: "defaults",
      bugfixes: true,
      modules: false,
      shippedProposals: true,
      useBuiltIns: "usage",
      corejs: 3,
    }],
    "@babel/preset-typescript",
  ],

  plugins: [
    "@babel/plugin-syntax-jsx",
  ],

  env: {
    development: {
      sourceMaps: "inline",
    },
    production: {
      comments: false,
      compact: true,
    },
  },
};
