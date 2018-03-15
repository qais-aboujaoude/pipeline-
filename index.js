process.env.AWS_SDK_LOAD_CONFIG = true

const AWS = require('aws-sdk'),
      CodePipeline = new AWS.CodePipeline(),
      express = require('express')

const app = express()

app.get('/', (req, res) => {
  CodePipeline.getPipelineState({name: 'haulo-api-demo-pipeline'}, (err, data) => {
    err ? console.log(err, err.stack) : res.send(data)
  })  
}) 


app.listen(3000, () => console.log('Server running on port 3000'))


