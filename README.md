[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build](https://github.com/Eleseer/ts-transformer-append-js-extension/actions/workflows/index.yaml/badge.svg)](https://github.com/Eleseer/ts-transformer-append-js-extension/actions/workflows/index.yaml)


Eliminates a need for specifying `.js` extension for relative imports of TypeScript files.

Based on [typescript-transformer-append-js-extension](https://github.com/Zoltu/typescript-transformer-append-js-extension) package by @Zoltu, now using [ts-patch](https://github.com/nonara/ts-patch) for transformer capability.

# Installation
Install using `npm`.
```bash
npm i -D @aliser/ts-transformer-append-js-extension
```

# Usage
1. Install `ts-patch` using [the instruction from here](https://github.com/nonara/ts-patch)
2. Add the transformer to `tsconfig.json`
```json
{
  "compilerOptions": {
    "plugins": [
      { "transform": "../src/index.ts" }
    ]
  },
}
```
3. **Build** your project using `tsc` or **run** it using `ts-node`.