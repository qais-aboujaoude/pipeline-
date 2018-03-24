const Table    = require('cli-table2'),
      pipeline = require('./codepipeline-sdk')

const namesListTable = new Table({
  chars: {
    'top': '═'
    , 'top-mid': '╤'
    , 'top-left': '╔'
    , 'top-right': '╗'
    , 'bottom': '═'
    , 'bottom-mid': '╧'
    , 'bottom-left': '╚'
    , 'bottom-right': '╝'
    , 'left': '║'
    , 'left-mid': '╟'
    , 'right': '║'
    , 'right-mid': '╢'
  },
  head: ['List of Pipelines Names']
})

const displayListofNames = () => {
  pipeline.ListfPipelineNames()
  .then(r => {
    r.forEach(e => table.push([e]))
    console.log(table.toString())
  })
  .catch(err => console.log(err))
}

const pipesTable = new Table({
  chars: {
    'top': '═'
    , 'top-mid': '╤'
    , 'top-left': '╔'
    , 'top-right': '╗'
    , 'bottom': '═'
    , 'bottom-mid': '╧'
    , 'bottom-left': '╚'
    , 'bottom-right': '╝'
    , 'left': '║'
    , 'left-mid': '╟'
    , 'right': '║'
    , 'right-mid': '╢'
  },
  head: ['List of Pipelines']
})

const displayListofPipelines = () => {
  pipeline.getListfPipelines()
    .then(r => {
      r.forEach(e => {
        pipesTable.push(
            [{content:'name:'}, {content: e.name}],
            [{content:'version:'}, {content: e.version}],
            [{content:'created:'}, {content: e.created.toString()}],
            [{content:'created:'}, {content: e.updated.toString()}]
        )
      });
    })
    .catch(e => console.log(e))
}
        
