const codepipeline = require('./src/codepipeline-sdk')

// codepipeline.getListfPipelineNames()
//   .then(r => console.log(r))
//   .catch(err => console.log(err))


const express = require('express'),
      app = express()

app.get('/pipeline', (req, res) => {
  codepipeline.getPipeline('haulo-trucking-client-demo-pipeline')
    .then(r => res.send(r))
    .catch(err => res.send(err))
})

app.listen(3000, () => console.log('Server running on port 300'))