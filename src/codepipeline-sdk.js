process.env.AWS_SDK_LOAD_CONFIG = true

const AWS = require('aws-sdk'),
      CodePipeline = new AWS.CodePipeline()

CodePipeline.getPipeline({name: 'haulo-api-demo-pipeline'}, (err, data) => {
  err ? console.log(err, err.stack) : console.log(data)
})

CodePipeline.getPipelineState({name: 'haulo-api-demo-pipeline'}, (err, data) => {
  err ? console.log(err, err.stack) : console.log(data)
})

CodePipeline.listPipelineExecutions({pipelineName: 'haulo-api-demo-pipeline'}, (err, data) => {
   err ? console.log(err, err.stack) : console.log(data)
})
