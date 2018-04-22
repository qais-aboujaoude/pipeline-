const pipeline = require('./codepipeline-sdk'),
      colors   = require('colors'),
      Table    = require('cli-table2'),
      ora      = require('ora')

colors.setTheme({
  boldRed: ['red', 'bold']
})

/**
 * @method print takes a table, toStrings is and logs it
 * @param {*} v 
 */
const print = v => console.log(v.toString())

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
      print(namesListTable)
    })
    .catch(e => console.error(e))
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
      print(pipelinesListTable)
    })
    .catch(e => console.error(e))
}

const pipelineInformation = name => {
  spinner.start()
  pipeline.getPipeline(name)
    .then(r => {
      spinner.stop()
      pipeTable.push(
        [{colSpan:2, hAlign:'center', content: `${r.pipeline.name}`.bold}],
        [{content:'roleArn:'}, {content: r.pipeline.roleArn}],
        // [{colSpan:2,content: 'artifactStore'}],
        // [r.pipeline.artifactStore.type,
        //  r.pipeline.artifactStore.location],
        [{rowSpan:2, content:'artifactStore', vAlign:'center'},
        r.pipeline.artifactStore.type],
        [r.pipeline.artifactStore.location]
      )
      r.pipeline.stages.forEach(e => {
        pipeTable.push(
          [{content:'name:'.bold}, {content: `${e.name}`.blue}],
        )
      });
      print(pipeTable)
    })
    .catch(e => console.error(e))
}

module.exports.displayListofNames = displayListofNames
module.exports.displayListofPipelines = displayListofPipelines
module.exports.pipelineInformation = pipelineInformation
