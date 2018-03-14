process.env.AWS_SDK_LOAD_CONFIG = true

const AWS = require('aws-sdk'),
      CodePipeline = new AWS.CodePipeline(),
      express = require('express')

const app = express()




// app.get('/', (req, res) => {

// }) 


// app.listen(3000, () => console.log('Server running on port 3000'))


