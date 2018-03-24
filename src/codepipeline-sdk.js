process.env.AWS_SDK_LOAD_CONFIG = true

const AWS = require('aws-sdk'),
      CodePipeline = new AWS.CodePipeline()

module.exports = {

  /**
   * @method getListfPipelineNames
   * Calls the CodePipeline SDK and returns all pipelines names, date and version
   * associated with the user
   */
  getListfPipelines: () => {
    return new Promise((resolve, reject) => {
      CodePipeline.listPipelines({}, (err, data) => {
        err ? reject(err, err.stack) : resolve(data.pipelines)
      })
    })
  },

  /**
   * @method getListfPipelineNames
   * Calls the CodePipeline SDK and returns all pipelines names associated
   * with the user 
   */
  ListfPipelineNames: () => {
    return new Promise((resolve, reject) => {
      CodePipeline.listPipelines({}, (err, data) => {
        err ? reject(err, err.stack) : resolve(data.pipelines.map(p => p.name))
      })
    })
  },

  getPipeline: name => {
    return new Promise((resolve, reject) => {
      CodePipeline.getPipeline({name: name}, (err, data) => {
        err ? reject(err, err.stack) : resolve(data)
      })
    })    
  },

  getPipelineState: name => {
    return new Promise((resolve, reject) => {
      CodePipeline.getPipelineState({name: name}, (err, data) => {
        err ? reject(err, err.stack) : resolve(data)
      })
    })    
  },

  listPipelineExecutions: (name, number) => {
    return new Promise((resolve, reject) => {
      CodePipeline.listPipelineExecutions({
        pipelineName: name,
        maxResults: number || 10
        }, (err, data) => {
        err ? reject(err, err.stack) : resolve(data)
      })
    })    
  },

  getPipelineExecutions: () => {
    return new Promise((resolve, reject) => {
      CodePipeline.getPipelineExecution({
        pipelineExecutionId: 'c7061c33-f756-4aa9-b2dc-ea5ea3bdae89',
        pipelineName: 'haulo-api-prod-pipeline'
        }, (err, data) => {
        err ? reject(err, err.stack) : resolve(data)
      })
    })    
  }

}

