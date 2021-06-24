const fetch = require('./fetch')

// get test data
async function get () {
  try {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    const data = await fetch(url)
    return data
  } catch (e) {
    throw e
  }
}

module.exports = {
  get
}