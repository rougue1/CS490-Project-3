module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/no-unused-prop-types": "off",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-filename-extension": "off",
    "no-restricted-globals": "off",
    "control-has-associated-label": "off",
    "no-noninteractive-element-interactions": "off",
    "click-events-have-key-events": "off",
    "no-static-element-interactions": "off",
    "anchor-is-valid": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/anchor-is-valid": "off",
  },
};
