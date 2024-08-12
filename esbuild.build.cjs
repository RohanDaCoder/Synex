const esbuild = require("esbuild");
console.clear();

esbuild
  .build({
    entryPoints: ["./src/**/*.ts"],
    outdir: "./dist",
    platform: "node",
    target: "esnext",
    format: "esm",
    tsconfig: "./tsconfig.json",
    sourcemap: true,
    bundle: true,
    minify: true,
  })
  .catch(() => process.exit(1));
