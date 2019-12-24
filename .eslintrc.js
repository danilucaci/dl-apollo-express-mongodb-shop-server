module.exports = {
  parser: "babel-eslint",
  env: {
    node: true,
  },
  extends: [
    "standard",
    "prettier",
    "prettier/standard",
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:node/recommended",
    "plugin:security/recommended",
  ],
  plugins: ["prettier", "jest", "security", "node"],
  rules: {},
};
