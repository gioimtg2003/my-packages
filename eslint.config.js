const { defineConfig } = require("eslint/config");
const globals = require('globals');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = defineConfig({
    ignores: ['node_modules', '**/node_modules/**', '**/*.js', '**/*.d.ts'],
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, eslintPluginPrettierRecommended, ...tseslint.configs.recommendedTypeChecked],

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },
        parser: require('@typescript-eslint/parser'),
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
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', {
            vars: 'all',
            args: 'after-used',
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
        }],
    }
});
