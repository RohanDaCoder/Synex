import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["dist/", "node_modules/"],
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node,
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "warn",
      "no-console": ["error", { allow: ["error"] }],
      "no-async-promise-executor": "off",
      "no-shadow": "error",
      "prefer-const": "warn",
      "no-debugger": "error",
      yoda: "error",
      "max-nested-callbacks": ["error", { max: 4 }],
      "no-case-declarations": "error",
      "no-empty": "error",
      "no-eq-null": "error",
      "no-eval": "warn",
      "no-invalid-this": "error",
      "no-redeclare": "error",
      "default-case-last": "warn",
      eqeqeq: ["warn", "always"],
      "no-useless-assignment": "error",
      "no-use-before-define": ["error", { functions: false }],
      "no-template-curly-in-string": "error",
      "no-duplicate-imports": "error",
      "no-duplicate-case": "error",
      "no-dupe-keys": "error",
    },
  },
];
