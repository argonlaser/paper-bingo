var app = require('http').createServer(handler)
var io = require('socket.io')(app)
var fs = require('fs')
var path = require('path')
const logger = require('./Logger/winston.js')

app.listen(8080)
logger.info('Server is running in port 8080')

global.games = []

function handler (req, res) {
  fs.readFile(path.join(__dirname, '/public/index.html'),
  function (err, data) {
    if (err) {
      res.writeHead(500)
      logger.error('Error loading index.html')
      return res.end('Error loading index.html')
    }

    logger.info('Served index.html')
    res.writeHead(200)
    res.end(data)
  })
}

io.on('connection', require('./socket.js'))
global.io = io
