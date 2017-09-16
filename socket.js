const _ = require('underscore')

let socket = function (socket) {
  // handle all connected related events.
  console.log('Socket connected = ', socket.id)

  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })

  // handle all disconnected related events
  socket.on('disconnect', function () {
    console.log('Disconnected: ' + socket.id)
  })
}

module.exports = socket
