module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-anonymous-default-export': 'warn'
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        'no-unused-vars': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
        'react-hooks/exhaustive-deps': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
        'import/no-anonymous-default-export': process.env.NODE_ENV === 'production' ? 'off' : 'warn'
      }
    }
  ]
};
