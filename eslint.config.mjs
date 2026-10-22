// Configuration ESLint sans eslint-config-next : son plugin Next dépend de fast-glob → micromatch → braces,
// visé par l'alerte GHSA-vfj7-8cjw-p6xm, sans version corrigée à ce jour. Les règles TypeScript et React hooks
// (dont le compilateur React) sont conservées.
import js from "@eslint/js"
import tseslint from "typescript-eslint"
import reactHooks from "eslint-plugin-react-hooks"
import globals from "globals"

export default tseslint.config(
  { ignores: [".next/**", "out/**", "build/**", "next-env.d.ts", ".data/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat["recommended-latest"] ?? reactHooks.configs.flat.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
)
