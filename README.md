# npm-module-init

[![npm version](https://badge.fury.io/js/npm-module-init.svg)](https://badge.fury.io/js/npm-module-init) [![Build Status](https://travis-ci.org/herrmannplatz/npm-module-init.svg?branch=master)](https://travis-ci.org/herrmannplatz/npm-module-init)

Opinionated npm module scaffolding using jest, standard, commitizen and semantic-release.

## Getting started

```

// use as a global dependency
$ npm install npm-module-init -g
$ npm-module-init my-npm-module

// or use without installing
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
  |-- index.test.js
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
