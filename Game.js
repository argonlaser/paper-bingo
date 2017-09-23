const uuid = require('uuid/v1')
const gameData = require('./common/data.js')
const logger = require('./Logger/winston.js')

var Game = function (user) {
  this.uuid = uuid()
  this.players = [user]
  this.currentPlayer = user
  this.currentPlayerIndex = -1
  this.result = {}
  this.count = 0
  this.state = gameData.gameState.WAITING
  this.mode = gameData.gameMode.ONLINE
}

Game.prototype.addCount = function () {
  this.count++
}

Game.prototype.isFull = function () {
  return this.players.length >= 2
}

Game.prototype.getCurrentPlayerIndex = function () {
  return this.currentPlayerIndex
}

Game.prototype.setCurrentPlayerIndex = function (index) {
  this.currentPlayerIndex = index
}

Game.prototype.increaseCurrentPlayerIndex = function (index) {
  this.currentPlayerIndex++
  return this.currentPlayerIndex % gameData.NO_OF_PLAYERS
}

Game.prototype.getPlayersCount = function () {
  return this.players.length
}

Game.prototype.getCurrentPlayer = function () {
  return this.currentPlayer
}

Game.prototype.addPlayer = function (player) {
  let functionName = 'addPlayer'
  logger.info(functionName, ' | ', 'In this function')

  if (this.isFull() === false) {
    this.players.push(player)
    this.count++
  }

  if (this.isFull()) {
    this.start()
  }
}

Game.prototype.start = function () {
  for (var i = 0; i < this.players.length; i++) {
    var player = this.players[i]
    player.sendEvent('game.started', {players: [1, 2], gameId: this.uuid})
  }
}

Game.prototype.removePlayer = function (player) {
  // add code to remove player
  var index = this.players.indexOf(player)

  if (index > -1) {
    logger.debug('Remove user = ', this.players[index].socket.id, 'from game = ', this.getUUID())
    this.players.splice(index, 1)
    this.count--
  }
}

Game.prototype.getUUID = function () {
  return this.uuid
}

Game.prototype.getState = function () {
  return this.state
}

Game.prototype.setState = function (state) {
  this.state = state
}

Game.prototype.getMode = function () {
  return this.mode
}

Game.prototype.setMode = function (mode) {
  this.mode = mode
}

module.exports = Game
