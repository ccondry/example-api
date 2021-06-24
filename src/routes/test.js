const express = require('express')
const router = express.Router()
const model = require('../models/test')
const webexLogger = require('../models/webex-logger')

// return 200 if valid JWT
router.get('/', async (req, res, next) => {
  try {
    // get JSON test data
    const data = await model.get()
    // return data with HTTP status 200
    return res.status(200).send(data)
  } catch (e) {
    // log the full error to console
    console.log(e)
    // log the error message to webex
    webexLogger.error(e.message)
    // return error message in JSON format with HTTP status 500
    return res.status(500).send({
      message: e.message
    })
  }
})

module.exports = router
