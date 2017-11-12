const Generator = require(`yeoman-generator`)
const { execSync } = require('child_process')

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

  configuring () {
    this.log('Setting up git repository.')
    execSync('git init', { cwd: this.destinationPath() })

    if (this.answers.githubUrl) {
      this.log('Setting up git remote.')
      execSync(`git remote add origin ${this.answers.githubUrl}`, { cwd: this.destinationPath() })
    }
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
    this.log('Installing dependencies.')
    this.npmInstall()
  }
}
