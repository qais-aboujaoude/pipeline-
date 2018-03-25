#!/usr/bin/env node
const display = require('./src/formatted-tables')
      program = require('commander')

program
  .version('0.1.0')
  .option('-l, --list', 'list pipelines')
  .option('-d, --names', 'List Names')
  .option('-p, --pipeline', 'List Names')
  .option('-n, --name [name]', 'name of the pipeline')
  .parse(process.argv)

if(program.names) display.displayListofNames() 
if(program.list) display.displayListofPipelines()
if(program.pipeline) display.pipelineInformation(program.name)


