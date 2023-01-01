#!/system/bin/env node

const os = require('os')
const { program } = require('commander')
const pkg = require('./../package.json')
const create = require('./commands/create.js')

const platform = os.platform()
if (platform !== 'android') throw Error(`Unsupported platform: ${platform}`)

program
  .name('android-countdown')
  .description('CLI to create an countdown on Android devices')
  .version(pkg.version);

program.command('create')
  .description('Creaiting an countdown this views as notification')
  .argument('<string>', 'date to count down')
  .option('-t, --title <string>', 'display the title of the notification')
  .option('-e, --expired <string>', 'expired text that shows when the countdown is expired')
  .action(create);

program.parse();