# create-npm-module

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Opinionated npm module scaffolding using Jest, Standard and Commitizen.

## Getting started

```
$ npm install create-npm-module -g
$ create-npm-module my-npm-module
// or
$ npx create-npm-module my-npm-module
```

## Project Structure

This will generate the following project structure.

```
|-- my-npm-module
  |-- .editorconfig
  |-- .gitignore
  |-- index.js
  |-- index.spec.js
  |-- package.json
  |-- README.md
```

## Usage

Commit your changes.
```
npm run commit
```

Create release and publish to npm registry.
```
npm run semantic-release
```

## Licence

MIT
