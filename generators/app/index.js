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
      name: 'author',
      message: 'Your name',
      default: this.user.git.name()
    }, {
      type: 'input',
      name: 'email',
      message: 'Your email',
      default: this.user.git.email()
    }, {
      type: 'input',
      name: 'githubUsername',
      message: 'Your github username',
      default: async () => {
        try {
          return await this.user.github.username();
        } catch (error) {
          return null;
        }
      }
    }, {
      type: 'confirm',
      name: 'npmInstall',
      message: 'Install dependencies'
    }]).then((answers) => {
      this.answers = {
        ...answers,
        year: new Date().getFullYear(),
        githubUrl: `https://github.com/${answers.githubUsername}/${answers.name}.git`
      }
    })
  }

  configuring () {
    this.log('🔧 Setting up git repository.')
    execSync('git init', { cwd: this.destinationPath() })

    if (this.answers.githubUrl) {
      try {
        this.log('🔧 Setting up git remote.')
        execSync(`git remote add origin ${this.answers.githubUrl}`, { cwd: this.destinationPath() })
      } catch (error) {
        this.log(`❗️ Failed to set git remote. ${error.message}`)
      }
    }
  }

  writing () {
    this.log('🔧 Copying template files.')
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.answers,
      undefined,
      { globOptions: { dot: true } }
    )
  }

  installing () {
    if (this.answers.npmInstall) {
      this.log('🔧 Installing dependencies.')
      this.npmInstall()
    }
  }

  end () {
    this.log(`🎉 Created npm module ${this.answers.name}`)
  }
}
