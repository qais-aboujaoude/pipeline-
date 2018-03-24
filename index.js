const pipeline = require('./src/codepipeline-sdk')
var Table = require('cli-table2');
var table = new Table({
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
});

// pipeline.ListfPipelineNames()
//   .then(r => {
//     r.forEach(e => table.push([e]))
//     console.log(table.toString())
//   })
//   .catch(err => console.log(err))

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
  console.log(pipesTable.toString())
  })
  .catch(e => console.log(e))


// table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
//   ['First value']
// );
