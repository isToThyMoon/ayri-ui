module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/button-has-type': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/ban-types': 'off',
    eqeqeq: 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-param-reassign': 'off',
  },
};
