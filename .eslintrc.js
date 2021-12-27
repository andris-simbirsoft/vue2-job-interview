module.exports = {
  root: true,
  env: {
    "node": true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  parserOptions: {
    "parser": "babel-eslint"
  },
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'no-bitwise': ['error', { allow: ['~'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'max-len': ['error', { code: 120 }],
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, consistent: true },
      ObjectPattern: { multiline: true, consistent: true },
    }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'linebreak-style': 'off',
    'quotes': [2, "single", { "avoidEscape": true }]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
