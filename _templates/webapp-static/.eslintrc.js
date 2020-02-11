module.exports = {
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "env": {
      "browser": true,
      "jest": true,
      "es6": true
    },
    "plugins": [
      "import",
      "prettier",
      "react"
    ],
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "prettier"
    ],
    "parserOptions": {
      "ecmaVersion": 2020,
      "sourceType": "module",
      "allowImportExportEverywhere": true
    },
    "rules": {
      "prettier/prettier": "error",
      "no-console": "warn",
      "no-eval": "error",
      "import/first": "error"
    }
  }