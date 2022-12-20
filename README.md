[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)



Eliminates a need for specifying `.js` extension for relative imports of TypeScript files.

Based on [typescript-transformer-append-js-extension](https://github.com/Zoltu/typescript-transformer-append-js-extension) package by @Zoltu, now using [ts-patch](https://github.com/nonara/ts-patch) for transformer capability.

# Usage
1. Install `ts-path` using [the instruction from here](https://github.com/nonara/ts-patch)
1. Add the transformer to `tsconfig.json`
	```json
	// tsconfig.json
	{
		"compilerOptions": {
			...
			"plugins": [
				{ "transform": "../src/index.ts" }
			]
		},
	}
	```
1. **Build** your project using `tsc` or **run** it using `ts-node`.