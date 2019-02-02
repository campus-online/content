module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  plugins: ['import'],
  env: {node: true},
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
  },
}
