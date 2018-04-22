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
// const print = v => console.log(v.toString())

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
      }),
      header = content => [{colSpan:2, hAlign:'center', content: content.bold}],
      print = v => console.log(v.toString())

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
        header(r.name),
        [{content:'roleArn:'}, {content: r.roleArn}],
        // [{colSpan:2,content: 'artifactStore'}],
        // [r.artifactStore.type,
        //  r.artifactStore.location],
        [{rowSpan:2, content:'artifactStore', vAlign:'center'},
        r.artifactStore.type],
        [r.artifactStore.location],
        header('stages')
      )
      r.stages.forEach(e => {
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
