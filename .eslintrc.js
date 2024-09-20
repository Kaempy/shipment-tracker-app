// https://docs.expo.dev/guides/using-eslint/
// module.exports = {
//   extends: ['expo', 'prettier'],
//   plugins: ['prettier'],
//   rules: {
//     'prettier/prettier': 'error',
//   },
// };
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'expo',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react/no-danger': 'off',
    'no-use-before-define': 'off',
    'global-require': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react-native/no-inline-styles': 'off',
    'react/no-unstable-nested-components': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/function-component-definition': 'off',
    'react/jsx-fragments': 'off',
    'arrow-body-style': 'off',
    'react/style-prop-object': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react-native/no-raw-text': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
