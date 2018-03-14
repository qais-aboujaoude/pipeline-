process.env.AWS_SDK_LOAD_CONFIG = true

const AWS = require('aws-sdk'),
      CodePipeline = new AWS.CodePipeline()

CodePipeline.listPipelines({}, (err, data) => {
  err ? console.log(err, err.stack) : console.log(data)
})

