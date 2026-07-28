const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: ["dist/**", "node_modules/**"],
	},
	{
		languageOptions: {
			globals: {
				BigInt: true,
				require: true,
				module: true,
				exports: true,
				process: true,
				__dirname: true,
				__filename: true,
			},
		},
		rules: {
			"require-atomic-updates": "warn",
			"no-case-declarations": "off",
			"no-empty": "off",
			"no-console": "off",
			"linebreak-style": "off",
			"no-global-assign": "off",
			"prefer-const": "error",
			"no-var": "error",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
			"no-extra-semi": "off",
			"@typescript-eslint/no-extra-semi": "error",
			"@typescript-eslint/no-empty-interface": "warn",
			"@typescript-eslint/no-inferrable-types": "error",
			"@typescript-eslint/explicit-function-return-type": "error",
			"one-var": ["error", "never"],
			"indent": ["error", "tab", { "SwitchCase": 1 }],
			"quotes": ["error", "single"],
			"semi": ["error", "always"],
		},
	}
);
