const codepipeline = require('./src/codepipeline-sdk')

codepipeline.getListfPipelineNames()
  .then(r => console.log(r))
  .catch(err => console.log(err))

