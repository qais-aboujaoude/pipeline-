process.env.AWS_SDK_LOAD_CONFIG = true

const AWS = require('aws-sdk'),
      CodePipeline = new AWS.CodePipeline()

module.exports = {

  /**
   * @method getListfPipelineNames
   * Calls the CodePipeline SDK and returns all pipelines names associated
   * with the user 
   */
  getListfPipelineNames: () => {
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

  listPipelineExecutions: name => {
    return new Promise((resolve, reject) => {
      CodePipeline.listPipelineExecutions({name: name}, (err, data) => {
        err ? reject(err, err.stack) : resolve(data)
      })
    })    
  }

}

