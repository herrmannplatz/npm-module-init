#!/usr/bin/env node
const meow = require('meow')
const yeoman = require('yeoman-environment')

const cli = meow(`
  Usage
  $ npm-module-init <name>

  Examples
  $ npm-module-init my-npm-module
`)

const [ name ] = cli.input

const env = yeoman.createEnv()

env.register(require.resolve('./generators/app'), 'npm-module-init:app')

env.run('npm-module-init:app', { name }, () => {
  console.log(`Created npm module ${name}`)
})
