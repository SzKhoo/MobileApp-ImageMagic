const expoConfig = require("eslint-config-expo/flat");

module.exports = [
  ...expoConfig,
  {
    ignores: ["dist/*", "node_modules/*", ".expo/*", "ui-samples/*", ".claude/*"],
  },
  {
    files: ["scripts/**/*.{js,mjs}", "*.config.js"],
    languageOptions: {
      globals: {
        Buffer: "readonly",
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        module: "writable",
        require: "readonly",
      },
    },
  },
];
