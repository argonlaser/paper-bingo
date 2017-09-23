const _ = require('underscore')
const Game = require('./Game.js')
const Player = require('./Player.js')
const logger = require('./Logger/winston.js')

let addGameToGlobal = function (game) {
  let index = global.games.indexOf(game)
  if (index === -1) {
    global.games.push(game)
  }
}

let _findGame = function (user) {
  let functionName = 'In _findGame'
  logger.info(functionName)
  let foundGame = _.find(global.games, function (game) {
    logger.warn(game.getUUID(), game.count)
    return game.count < 2
  })

  if (_.isEmpty(foundGame) === true) {
    logger.error('Empty')
    foundGame = new Game(user)
    addGameToGlobal(foundGame)
  }

  foundGame.addPlayer(user)

  return foundGame
}

let handleMyOtherEvent = function (data) {
  console.log(data)
}

let socket = function (socket) {
  // handle all connected related events.
  console.log('Socket connected = ', socket.id)

  let user = new Player(socket)

  // once connected, find a suitable game for this guy
  let foundGame = _findGame(user)

  // join the user to a room
  socket.join(foundGame.getUUID())
  logger.info('Join room', foundGame.getUUID())

  global.io.in(foundGame.getUUID()).emit('start', {id: foundGame.getUUID(), currIndex: foundGame.currentPlayerIndex})

  socket.emit('news', { hello: 'world' })
  socket.on('my other event', handleMyOtherEvent)

  // handle all disconnected related events
  socket.on('disconnect', function () {
    // remove player from the game
    foundGame.removePlayer(user)
    logger.info('Disconnected: ' + socket.id)
  })
}

module.exports = socket
