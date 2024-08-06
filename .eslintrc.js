module.exports = {
  parser: "@babel/eslint-parser",
  babelOptions: {
    configFile: "./babel.config.json",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    
  },
};