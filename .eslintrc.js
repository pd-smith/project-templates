module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "plugins": [
        "prettier",
    ],
    "extends": [
        "eslint:recommended",
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "rules": {
        "prettier/prettier": "error",
        "no-eval": "error",
        "quote-props": ["error", "as-needed"]
    }
}
