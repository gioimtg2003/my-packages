module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'chore',
        'style',
        'refactor',
        'ci',
        'test',
        'revert',
        'perf',
        'config',
        'build',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'vietinbank',
        'core'
      ],
    ],
    // 'scope-empty': [2, 'never'],
  },
};
