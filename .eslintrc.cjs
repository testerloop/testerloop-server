module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', 'import', '@typescript-eslint'],
    extends: [
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    root: true,
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    ignorePatterns: ['node_modules/'],
    rules: {
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                pathGroups: [
                    {
                        pattern: '@**',
                        group: 'external',
                        position: 'after',
                    },
                ],
                distinctGroup: false,
            },
        ],
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
    },
};
