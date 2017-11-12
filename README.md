# npm-module-init

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Opinionated npm module scaffolding using jest, standard, commitizen and semantic-release.

## Getting started

```
$ npm install npm-module-init -g
$ npm-module-init my-npm-module
// or
$ npx npm-module-init my-npm-module
```

## Project Structure

This will generate the following project structure.

```
|-- my-npm-module
  |-- .editorconfig
  |-- .gitignore
  |-- .travis.yml
  |-- index.js
  |-- index.spec.js
  |-- LICENCE.md
  |-- package.json
  |-- README.md
```

## Usage

Commit your changes.
```
npm run commit
```

Run tests.
```
npm t
```

## Publish a release

Creating a release version and publishing it to the npm registry is handled by `semantic-release`. This is then triggered when travis build was successful. So ensure that travis is able to publish to npm.
