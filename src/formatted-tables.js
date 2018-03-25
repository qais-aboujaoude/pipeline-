const Table    = require('cli-table2'),
      pipeline = require('./codepipeline-sdk'),
      ora = require('ora')

const chars = {
  'top': '═',
  'top-mid': '╤',
  'top-left': '╔',
  'top-right': '╗',
  'bottom': '═',
  'bottom-mid': '╧',
  'bottom-left': '╚',
  'bottom-right': '╝',
  'left': '║',
  'left-mid': '╟',
  'right': '║',
  'right-mid': '╢'
}

const namesListTable = new Table({
  chars: chars,
  head: ['List of Pipelines Names']
})

const pipesTable = new Table({
  chars: chars,
  head: ['List of Pipelines']
})
const spinner = ora('Loading!')

const displayListofNames = () => {
  spinner.start()
  pipeline.ListfPipelineNames()
    .then(r => {
      r.forEach(e => namesListTable.push([e]))
      spinner.stop()
      console.log(namesListTable.toString())
    })
    .catch(err => console.log(err))
}

const displayListofPipelines = () => {
  spinner.start()
  pipeline.getListfPipelines()
    .then(r => {
      r.forEach(e => {
        pipesTable.push(
            [{content:'name:'}, {content: e.name}],
            [{content:'version:'}, {content: e.version}],
            [{content:'created:'}, {content: e.created.toString()}],
            [{content:'created:'}, {content: e.updated.toString()}]
        )
      })
      spinner.stop()
      console.log(pipesTable.toString())
    })
    .catch(e => console.log(e))
}
        
module.exports.displayListofNames = displayListofNames
module.exports.displayListofPipelines = displayListofPipelines