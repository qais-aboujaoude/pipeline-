const Table    = require('cli-table2'),
      pipeline = require('./codepipeline-sdk'),
      colors   = require('colors'),
      ora      = require('ora')

colors.setTheme({
  boldRed: ['red', 'bold']
})

const spinner  = ora('Loading!'),
      chars = {
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
      },
      namesListTable = new Table({
        chars: chars,
        head: ['List of Pipelines Names']
      }),
      pipelinesListTable = new Table({
        chars: chars,
        head: ['List of Pipelines']
      }),
      pipeTable = new Table({
        chars: chars
      })

const displayListofNames = () => {
  spinner.start()
  pipeline.ListfPipelineNames()
    .then(r => {
      r.forEach(e => namesListTable.push([e]))
      spinner.stop()
      console.log(namesListTable.toString())
    })
    .catch(e => console.log(e))
}

const displayListofPipelines = () => {
  spinner.start()
  pipeline.getListfPipelines()
    .then(r => {
      r.forEach(e => {
        pipelinesListTable.push(
            [{content:'name:'.bold}, {content: `${e.name}`.blue}],
            [{content:'version:'}, {content: e.version}],
            [{content:'created:'}, {content: e.created.toString()}],
            [{content:'created:'}, {content: e.updated.toString()}]
        )
      })
      spinner.stop()
      console.log(pipelinesListTable.toString())
    })
    .catch(e => console.log(e))
}

const pipelineInformation = name => {
  spinner.start()
  pipeline.getPipeline(name)
    .then(r => {
      spinner.stop()
      pipeTable.options.head = [r.pipeline.name]
      pipeTable.push(
        [{content:'roleArn:'}, {content: r.pipeline.roleArn}],
        [{colSpan:2,content: 'artifactStore'}],
        [r.pipeline.artifactStore.type, 
         r.pipeline.artifactStore.location],
      )
      console.log(pipeTable.toString())
    })
    .catch(e => console.log(e))
}

module.exports.displayListofNames = displayListofNames
module.exports.displayListofPipelines = displayListofPipelines
module.exports.pipelineInformation = pipelineInformation
