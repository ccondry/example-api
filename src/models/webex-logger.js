const fetch = require('./fetch')
const package = require('../../package.json')
const os = require('os')

// find env hostname
const hostname = os.hostname()

// trim message to 7439 bytes for Webex to accept it
function trimMessage (message) {
  // does message exceed max text size for Webex?
  if (Buffer.byteLength(message, 'utf8') > 7439) {
    // make a buffer of the message
    const buf1 = Buffer.from(message, 'utf8')
    // allocate max size buffer
    const buf2 = Buffer.allocUnsafe(7439)
    // copy to the max size buffer
    buf1.copy(buf2, 0, 0, 7439)
    // set message value to truncated message
    message = buf1.toString('utf8')
  }
  return message
}

// main log method
function log (level = 'info') {
  return async function () {
    let text = ''
    let markdown = ''
  
    if (!arguments.length) {
      // no arguments
      return
    }
    // has arguments
    for (const args of arguments) {
      if (typeof args === 'string') {
        // user passed a string
        text += trimMessage(args) + ' '
      } else if (typeof args === 'object') {
        // user passed an object
        // save trimmed text
        text += trimMessage(args.text || '')  + ' '
        // trim markdown, if exists
        if (args.markdown) {
          markdown += trimMessage(args.markdown) + ' '
        }
      }
    }
    // trim again
    text = trimMessage(text)
    markdown = trimMessage(markdown)
  
    if (!text && !markdown) {
      // empty or no log message, so do nothing
      console.log('empty log message passed to Teams Logger. noop.')
      return
    }
  
    if (!markdown) {
      // if no markdown set yet, add text as markdown
      markdown = text
    }
  
    // define text prefix for this service
    // const packageName = process.env.npm_package_name
    const packageName = package.name
    // const packageVersion = process.env.npm_package_version
    const packageVersion = package.version
    const textPrefix = `${packageName} ${packageVersion} on ${hostname} - ${level}: `
    const markdownPrefix = `**${packageName} ${packageVersion}** on **${hostname}** - **${level}**: `
    // add prefix to plaintext
    text = textPrefix + text
    let mentions = ''
    if (level === 'error') {
      // @all on errors (and add a space at the end)
      mentions = `<@all> `
    }
    // add prefix and mentions (if any) to markdown
    markdown = `${markdownPrefix}${mentions}${markdown}`
  
    // send message to room
    try {
      const url = 'https://webexapis.com/v1/messages'
      const roomId = process.env.WEBEX_LOGS_ROOM_ID
      const token = process.env.WEBEX_BOT_TOKEN
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: {
          roomId,
          text,
          markdown
        }
      }
      await fetch(url, options)
    } catch (e) {
      console.log('failed to log to Webex Teams room:', e.message)
    }
  }
}

module.exports = {
  log: log('info'),
  error: log('error'),
  info: log('info'),
  debug: log('debug'),
  warn: log('warning'),
  warning: log('warning')
}
