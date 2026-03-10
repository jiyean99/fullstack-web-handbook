import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import storybook from "eslint-plugin-storybook";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...storybook.configs["flat/recommended"],
]);

export default eslintConfig;
