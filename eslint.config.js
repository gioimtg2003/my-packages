import { defineConfig, } from "eslint/config";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { configs } from "@eslint/js";
import globals from 'globals';

export default defineConfig({
    ignores: ['node_modules', '**/node_modules/**', '**/*.js', '**/*.d.ts'],
    extends: [
        'eslint-plugin-prettier/recommended',
        '@eslint/js/recommended',
    ],
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: ['tsconfig.json', 'tsconfig.spec.json'],
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
    }
});
