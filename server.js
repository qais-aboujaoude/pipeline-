const codepipeline = require('./src/codepipeline-sdk'),
      express      = require('express'),
      app          = express()

/**
 * Get a list of all aviable pipelines
 */
app.get('/pipelines', (req, res) => {
  codepipeline.getListfPipelineNames()
    .then(r => res.send(r))
    .catch(err => res.send(err))
})

/**
 * Get information about a certain pipeline
 */
app.get('/pipeline/:name', (req, res) => {
  codepipeline.getPipeline(req.params.name)
    .then(r => res.send(r))
    .catch(err => res.send(err))
})

/**
 * Get information about the state of a certain pipeline
 */
app.get('/state/:name', (req, res) => {
  codepipeline.getPipelineState(req.params.name)
    .then(r => res.send(r))
    .catch(err => res.send(err))
})


/**
 * Get list of recent executions of a pipeline
 * number is an optional param. default returns 10
 */
app.get('/executions/:name/:number*?', (req, res) => {
  console.log(req.params.number)
  codepipeline.listPipelineExecutions(req.params.name, req.params.number)
    .then(r => res.send(r))
    .catch(err => res.send(err))
})

app.get('/execution/', (req, res) => {
  codepipeline.getPipelineExecutions()
    .then(r => res.send(r))
    .catch(err => res.send(err))
})

app.listen(3000, () => console.log('Server running on port 3000'))