const Generator = require(`yeoman-generator`)
const { exec } = require('child_process')
const { promisify } = require('util')

module.exports = class extends Generator {
  initializing () {
    this.destinationRoot(this.options.name)
  }

  prompting () {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.options.name
    }, {
      type: 'input',
      name: 'desc',
      message: 'Your project description',
      default: `module ${this.options.name}`
    }, {
      type: 'input',
      name: 'githubUrl',
      message: 'Your github url',
      default: ''
    }])
  }

  _gitInit () {
    return promisify(exec)('git init', { cwd: this.destinationPath() })
  }

  writing () {
    this.log('Copying template files.')
    const { name, desc, githubUrl } = this.options

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      { name, desc, githubUrl }
    )
  }

  async installing () {
    this.log('Setting up git repository.')
    await this._gitInit()
    this.log('Installing dependencies.')
    this.npmInstall()
  }
}
