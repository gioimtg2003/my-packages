const { defineConfig } = require("eslint/config");
const globals = require('globals');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslint = require('@eslint/js');

module.exports = defineConfig({
    ignores: ['node_modules', '**/node_modules/**', '**/*.js', '**/*.d.ts'],
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, eslintPluginPrettierRecommended],

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
        parserOptions: {
            project: ['tsconfig.json', 'tsconfig.spec.json'],
            projectService: true,
            tsconfigRootDir: __dirname,
        },
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
    }
});
