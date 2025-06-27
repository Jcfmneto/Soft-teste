import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import pluginImport from "eslint-plugin-import";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node }, 
  plugins:{
    import: pluginImport
  },
  rules: { 
    "semi":["error", "always"], 
    "quotes":["error", "double"],
    "indent":["error",2],
    "no-trailing-spaces":"error",
    "prefer-const":"error",
    "array-bracket-spacing":["error", "never"],
    "no-var":"error",
    "import/no-cycle":"error"
  }},
]);

