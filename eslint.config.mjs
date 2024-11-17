export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    rules: {
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-multi-spaces": "error",
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "space-before-blocks": "error",
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "prefer-arrow-callback": "error",
      "no-duplicate-imports": "error",
      "no-restricted-imports": "off",
      "no-async-promise-executor": "error",
      "no-await-in-loop": "warn",
      "consistent-return": "error",
      "no-shadow": "warn",
      "no-console": ["warn", { "allow": ["warn", "error"] }]
    },
  }
];
  