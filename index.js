const pipeline = require('./src/codepipeline-sdk')
var Table = require('cli-table2');
var table = new Table({
  head: ['List of Pipelines']
  // colWidths: [40]
});

pipeline.getListfPipelineNames()
  .then(r => {
    r.forEach(e => table.push([e]))
    console.log(table.toString())
  })
  .catch(err => console.log(err))



// table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
//   ['First value']
// );
