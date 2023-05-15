module.exports = {
    plugins: ['vue', 'import', 'node','jsconfig.json','postcss.config.json'],
    extends: [
      // ...
      'plugin:vue/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
    ],
    ignorePatterns: ['node_modules/', ],
  
    // ...
    parser: '@babel/eslint-parser',
  
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
  };
  