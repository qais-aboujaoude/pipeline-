const pipeline = require('./codepipeline-sdk'),
      colors   = require('colors'),
      Table    = require('cli-table2'),
      ora      = require('ora')

colors.setTheme({
  boldRed: ['red', 'bold']
})

/**
 * @method print stringifys a Table object and prints it
 * @param {Object} t a Table object
 */
const print = t => console.log(t.toString())

/**
 * @method header returns a header row
 * @param {*} c the content of the header
 * @returns {Object[]} An array of table row objects
 */
const header = c => [{colSpan:2, hAlign:'center', content: c.bold}]

const doubleContentRow = (n, v) => [{content: n}, {content: v}]

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
            doubleContentRow('name'.bold, e.name.blue),
            doubleContentRow('version', e.version),
            doubleContentRow('created', e.created.toString()),
            doubleContentRow('updated', e.updated.toString())
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
