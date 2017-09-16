var app = require('http').createServer(handler)
var io = require('socket.io')(app)
var fs = require('fs')
var path = require('path')

app.listen(8080)

global.games = []

function handler (req, res) {
  fs.readFile(path.join(__dirname, '/public/index.html'),
  function (err, data) {
    if (err) {
      res.writeHead(500)
      return res.end('Error loading index.html')
    }

    res.writeHead(200)
    res.end(data)
  })
}

io.on('connection', require('./socket.js'))
