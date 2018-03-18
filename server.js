const codepipeline = require('./src/codepipeline-sdk'),
      express      = require('express'),
      app          = express()

app.get('/pipelines', (req, res) => {
  codepipeline.getListfPipelineNames()
    .then(r => res.send(r))
    .catch(err => res.send(err))
})

app.get('/pipeline/:name', (req, res) => {
  codepipeline.getPipeline(req.params.name)
    .then(r => res.send(r))
    .catch(err => res.send(err))
})

app.get('/state/:name', (req, res) => {
  codepipeline.getPipelineState(req.params.name)
    .then(r => res.send(r))
    .catch(err => res.send(err))
})

app.get('/execution/:name', (req, res) => {
  codepipeline.listPipelineExecutions(req.params.name)
    .then(r => res.send(r))
    .catch(err => res.send(err))
})

app.listen(3000, () => console.log('Server running on port 3000'))