import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  minify: false,
  splitting: false,
  sourcemap: false,
  clean: false,
  target: "es2022",
  dts: false,
  bundle: true,
  external: [],
  noExternal: ["discord.js", "colors", "dotenv"],
});
