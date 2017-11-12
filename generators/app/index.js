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
      default: ''
    }])
  }

  _gitInit () {
    return promisify(exec)('git init', { cwd: this.destinationPath() })
  }

  writing () {
    const { name, desc } = this.options

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      { name, desc }
    )
  }

  async installing () {
    await this._gitInit()
    this.npmInstall()
  }
}
