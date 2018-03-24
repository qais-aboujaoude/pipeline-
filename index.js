#!/usr/bin/env node
const display = require('./src/formatted-tables')
      program = require('commander')

program
  .version('0.1.0')
  .option('-l, --list', 'list pipelines')
  .option('-n, --names', 'List Names')
  .parse(process.argv)

if(program.names) display.displayListofNames()
if(program.list) display.displayListofPipelines()


