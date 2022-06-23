// @ts-ignore
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    "overrides": [
        {
            "files": [
                "*.ts",
                "*.tsx"
            ],
            "parserOptions": {
                "project": [
                    "tsconfig.json"
                ]
            },
            "rules": {
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/no-unused-vars": "off"
            }
        }
    ]
};
