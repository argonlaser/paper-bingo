const _ = require('underscore')
const Game = require('./Game.js')
const Player = require('./Player.js')
const logger = require('./Logger/winston.js')

let _findGame = function (user) {
  let functionName = 'In _findGame'
  logger.info(functionName)

  let foundGame = global.gamePool.findGameWithFreeSeats()

  if (_.isEmpty(foundGame)) {
    logger.error('Creating new game as no seats are available in current games.')
    foundGame = new Game(user)
    global.games.push(foundGame)
  }

  return foundGame
}

let handleMyOtherEvent = function (data) {
  console.log(data)
}

let socket = function (socket) {
  // handle all connected related events.
  console.log('Socket connected = ', socket.id)

  let user = new Player(socket)
  let game = global.gamePool.AllocateGameForUser(user)


  socket.on('user.strike', function (payload) {
    user.stike(payload)
  })

  socket.on('user.bingo', function (payload) {
    user.bingo(payload)
  })

  // handle all disconnected related events
  socket.on('disconnect', function () {
    // remove player from the game
    game.removePlayer(user)
    logger.info('Disconnected: ' + socket.id)
  })
}

module.exports = socket
