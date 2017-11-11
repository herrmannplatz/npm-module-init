const Generator = require(`yeoman-generator`)
const { exec } = require('child_process')
const { promisify } = require('util')

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)

        this.destinationRoot(opts.name)
    }

    prompting() {
        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : 'Your project name',
            default : this.options.name
        }, {
            type    : 'input',
            name    : 'desc',
            message : 'Your project description',
            default : ''
        }])
    }

    _copyFile(file, options) {
        this.fs.copyTpl(
            this.templatePath(file),
            this.destinationPath(file),
            options
        )
    }

    _gitInit() {
        return promisify(exec)('git init', { cwd: this.destinationPath()})
    }

    writing() {
        const files = [
            '.editorconfig',
            '.gitignore',
            'package.json',
            'README.md',
            'index.js',
            'index.spec.js'
        ]

        const { name, desc } = this.options;

        files.forEach(file => this._copyFile(file, { name, desc }))
    }

    async installing() {
        await this._gitInit();
        this.npmInstall()
    } 
};
   