module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ['standard', 'plugin:prettier/recommended'],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        camelcase:0
    },
    "globals": {
        "process": true,
        "__dirname": true
    }
  }