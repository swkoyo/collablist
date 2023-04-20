module.exports = {
    extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks', 'airbnb-typescript'],
    plugins: ['react'],
    rules: {
        'react-hooks/rules-of-hooks': 'off',
        'react/no-array-index-key': 'off',
        'react/require-default-props': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-param-reassign': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/no-named-as-default': 0,
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                required: {
                    some: ['nesting', 'id']
                }
            }
        ],
        'jsx-a11y/label-has-for': [
            'error',
            {
                required: {
                    some: ['nesting', 'id']
                }
            }
        ]
    }
};