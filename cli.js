#!/usr/bin/env node
const meow = require('meow')
const yeoman = require('yeoman-environment')

const cli = meow(`
  Usage
  $ create-npm-module <name>

  Examples
  $ create-npm-module my-npm-module
`)

const [ name ] = cli.input

const env = yeoman.createEnv()

env.register(require.resolve('./generators/app'), 'create-npm-module:app')

env.run('create-npm-module:app', { name }, () => {
  console.log(`Created npm module ${name}`)
})
