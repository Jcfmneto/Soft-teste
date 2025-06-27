import js from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      ...js.configs.recommended.rules,
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 2],
      "no-trailing-spaces": "error",
      "prefer-const": "error",
      "array-bracket-spacing": ["error", "never"],
      "no-var": "error",
      "import/no-cycle": "error",
    },
  },
];