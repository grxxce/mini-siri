module.exports = {
    plugins: ['vue', 'import', 'node'],
    extends: [
      'plugin:vue/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
    ],
    ignorePatterns: ['node_modules/', ],
  
    parser: 'vue-eslint-parser',
  
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
  };
  