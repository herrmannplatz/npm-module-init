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
      message: 'Your module name',
      default: this.options.name
    }, {
      type: 'input',
      name: 'desc',
      message: 'Your module description',
      default: `module ${this.options.name}`
    }, {
      type: 'input',
      name: 'githubUrl',
      message: 'Your github url',
      default: `https://github.com/[USERNAME]/${this.options.name}.git`
    }]).then((answers) => {
      this.answers = answers
    })
  }

  _gitInit () {
    return promisify(exec)('git init', { cwd: this.destinationPath() })
  }

  writing () {
    this.log('Copying template files.')
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.answers,
      undefined,
      { globOptions: { dot: true } }
    )
  }

  async installing () {
    this.log('Setting up git repository.')
    await this._gitInit()
    this.log('Installing dependencies.')
    this.npmInstall()
  }
}
