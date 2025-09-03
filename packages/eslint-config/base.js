import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import prettierPlugin from "eslint-plugin-prettier";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier, // This should come after other configs to override conflicting rules
  {
    plugins: {
      turbo: turboPlugin,
      prettier: prettierPlugin,
      onlyWarn,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "prettier/prettier": "error", // Show prettier issues as errors for better visibility
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "build/**", ".turbo/**"],
  },
];
