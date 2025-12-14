import { getBabelOutputPlugin } from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

const config = {
  input: "src/index.tsx",
  output: {
    name: "ReachRouter",
    globals: {
      react: "React",
      "react-dom": "ReactDOM"
    }
  },
  external: ["react", "react-dom"],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json"
    }),
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true
    }),
    getBabelOutputPlugin({
      presets: ["@babel/preset-react"]
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(terser());
}

export default config;
