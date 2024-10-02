module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsdoc/recommended-typescript"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@stylistic/jsx", "jsdoc"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/ban-types": "off",
    "@stylistic/jsx/jsx-self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "no-console": "warn",
    "jsdoc/check-tag-names": ["error" | "warn", { "typed": true }],
  },
}
