const fs = require("fs");
const { execSync } = require("child_process");
const prettyBytes = require("pretty-bytes");
const gzipSize = require("gzip-size");

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: "inherit",
    env: Object.assign({}, process.env, extraEnv)
  });

// Clean previous builds
exec("rimraf es lib umd dist");

console.log("\nBuilding ES modules ...");
exec("tsc --project tsconfig.json --outDir es --module ESNext --declaration --emitDeclarationOnly false", {
  NODE_ENV: "production"
});

console.log("Building CommonJS modules ...");
exec("tsc --project tsconfig.json --outDir lib --module CommonJS --declaration --emitDeclarationOnly false", {
  NODE_ENV: "production"
});

console.log("\nBuilding UMD ...");
exec("rollup -c -f umd -o umd/reach-router.js", {
  BABEL_ENV: "umd",
  NODE_ENV: "development"
});

console.log("\nBuilding UMD min.js ...");
exec("rollup -c -f umd -o umd/reach-router.min.js", {
  BABEL_ENV: "umd",
  NODE_ENV: "production"
});

// Copy TypeScript definitions
exec("cpy 'src/**/*.d.ts' dist --parents");

const size = gzipSize.sync(fs.readFileSync("umd/reach-router.min.js"));
console.log("\ngzipped, the UMD build is %s", prettyBytes(size));
