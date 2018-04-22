process.env.AWS_SDK_LOAD_CONFIG = true

const AWS = require('aws-sdk'),
      CodePipeline = new AWS.CodePipeline()

module.exports = {

  /**
   * @async
   * @method getListfPipelines
   * Calls the CodePipeline SDK and returns all pipelines names, date and version
   * associated with the user
   * @returns {Promise<array>} 
   */
  getListfPipelines: () => (new Promise((resolve, reject) => {
    CodePipeline.listPipelines({}, (err, data) => {
      err ? reject(err, err.stack) : resolve(data.pipelines)
    })})),

  /**
   * @method getListfPipelineNames
   * Calls the CodePipeline SDK and returns an array of pipeline names
   * with the user 
   * @returns {Promise<array>} 
   */
  ListfPipelineNames: () => (new Promise((resolve, reject) => {
    CodePipeline.listPipelines({}, (err, data) => {
      err ? reject(err, err.stack) : resolve(data.pipelines.map(p => p.name))
    })})),

  /**
   * @async
   * @method getPipeline
   * Calls the CodePipeline SDK and returns a JSON object containing information
   * about the pipeline and its stages
   * @param {string} name name of pipeline to retrieve infomation about
   * @returns {Object} a JSON object of pipeline information
   */
  getPipeline: name => (new Promise((resolve, reject) => {
    CodePipeline.getPipeline({name: name}, (err, data) => {
      err ? reject(err, err.stack) : resolve(data.pipeline)
    })})),

  /**
   * @async
   * @method getPipelineState
   * Calls the CodePipeline SDK and returns all pipelines names, date and version
   * associated with the user
   * @param {string} name name of pipeline to retrieve infomation about
   * @returns {Object} a JSON object about pipeline state
   */
  getPipelineState: name => (new Promise((resolve, reject) => {
    CodePipeline.getPipelineState({name: name}, (err, data) => {
      err ? reject(err, err.stack) : resolve(data)
    })})),

  /**
   * @async
   * @method listPipelineExecutions
   * Calls the CodePipeline SDK and returns all pipelines names, date and version
   * associated with the user
   * @param {string} name name of pipeline to retrieve infomation about
   * @param {number} number number of excuitions to return. Default is 10
   * @returns {Object} a JSON object of pipeline executions 
   */
  listPipelineExecutions: (name, number) => (new Promise((resolve, reject) => {
    CodePipeline.listPipelineExecutions({
      pipelineName: name,
      maxResults: number || 10
      }, (err, data) => {
      err ? reject(err, err.stack) : resolve(data)
    })})),

  /**
   * //TODO rework
   * @async
   * @method getListfPipelines
   * Calls the CodePipeline SDK and returns an detailed information about 
   * an execution 
   * @returns {Object} a JSON object of 
   */
  getPipelineExecutions: () => (new Promise((resolve, reject) => {
    CodePipeline.getPipelineExecution({
      pipelineExecutionId: 'c7061c33-f756-4aa9-b2dc-ea5ea3bdae89',
      pipelineName: 'haulo-api-prod-pipeline'
      }, (err, data) => {
      err ? reject(err, err.stack) : resolve(data)
    })}))

}

