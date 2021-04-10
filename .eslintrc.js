module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "babel-eslint",
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import',
  ],
  rules: {
        "react/no-array-index-key": "off",
        "react-hooks/exhaustive-deps": "off",
        "no-unused-vars": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
  ignorePatterns: ["src/components/*"],
};