import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.jsx","**/*.js"],
    languageOptions: {
      globals: { 
        ...globals.browser,
        ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
        "react/no-unescaped-entities": "off",
        "react/prop-types": "off",
    },
  },
  prettier,
];