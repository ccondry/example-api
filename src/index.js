// load environment file
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const requestIp = require('request-ip')

const environment = require('./models/environment')
const webexLogger = require('./models/webex-logger')
// set up Node.js HTTP port
const port = process.env.NODE_PORT

// init express app, and configure it
const app = express()
// parse JSON body into req.body, up to 256kb
app.use(bodyParser.json({limit: '256kb'}))
// enable CORS
app.use(cors())
// get remote IP address of request client as req.clientIp
app.use(requestIp.mw())

// run this code on every request
app.use(async function (req, res, next) {
  // put any logging or code you want to run on every request here
  // then call next() to continue processing the request
  next()
  // or call return to stop processing the request now
})

/*****
Routes
*****/

// get this API version
app.use('/api/v1/version', require('./routes/version'))

// test data
app.use('/api/v1/test', require('./routes/test'))

// start HTTP listening now
app.listen(port, () => {
  const message = `${environment.name} version ${environment.version} service started on ${environment.hostname}. Listening on port ${port}.`
  console.log(message)
  webexLogger.log('service started on port ' + port)
})
