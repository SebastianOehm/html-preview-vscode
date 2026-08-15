const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
	{
		ignores: ['out/**', 'media/**', 'node_modules/**', '.vscode-test/**', '*.vsix']
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			curly: 'warn',
			eqeqeq: 'warn',
			semi: 'warn',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			// Pre-existing patterns from before this codebase was linted. Left as
			// warnings rather than fixed outright, since properly typing them or
			// restructuring the Logger namespace/require-style imports is real
			// design work, not a mechanical lint-tooling swap.
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-namespace': 'warn',
			'@typescript-eslint/no-require-imports': 'warn'
		}
	},
	{
		files: ['eslint.config.js', 'webpack.config.js'],
		languageOptions: {
			globals: {
				require: 'readonly',
				module: 'writable',
				__dirname: 'readonly'
			}
		}
	}
);
