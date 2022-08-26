module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier", "react"],
  rules: {
    "react/no-array-index-key": 1,
    "react/no-unescaped-entities": 1,
  },
};
