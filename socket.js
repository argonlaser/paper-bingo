const Player = require('./Player.js')
const logger = require('./Logger/winston.js')

let socket = function (socket) {
  // handle all connected related events.
  logger.info('Socket connected = ', socket.id)

  let user = new Player(socket)
  let game

  socket.on('user.strike', function (payload) {
    console.log(payload)
    // emit to all people in room and give chance to next person
    payload.currPlayerIndex = game.increaseCurrentPlayerIndex()
    game.sendEvent('striked', payload)
  })

  socket.on('game.join', function (payload) {
    logger.warn(payload.board)
    logger.debug('game.join event :', socket.id)
    user.gameBoard.fillCheckbox(payload.board)
    game = global.gamePool.AllocateGameForUser(user)
  })

  socket.on('user.bingo', function (payload) {
    user.bingo(payload)
  })

  // handle all disconnected related events
  socket.on('disconnect', function () {
    logger.info('Disconnected: ' + socket.id)

    // remove player from the game
    game && game.removePlayer(user)

    if (game && game.players.length === 0) {
      global.gamePool.RemoveGame(game)
    }
  })
}

module.exports = socket
