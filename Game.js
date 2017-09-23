const uuid = require('uuid/v1')
const gameData = require('./common/data.js')
const logger = require('./Logger/winston.js')

/**
 * Constructor for game
 */
var Game = function (user) {
  this.uuid = uuid()
  this.players = [user]
  this.currentPlayer = user
  this.currentPlayerIndex = -1
  this.result = {}
  this.state = gameData.gameState.WAITING
  this.mode = gameData.gameMode.ONLINE
}

/**
 * Check if game is full or not
 */
Game.prototype.isFull = function () {
  return this.players.length >= 2
}

/**
 * Gets the current player index
 */
Game.prototype.getCurrentPlayerIndex = function () {
  return this.currentPlayerIndex
}

/**
 * Sets the current player index
 */
Game.prototype.setCurrentPlayerIndex = function (index) {
  this.currentPlayerIndex = index
}

/**
 * Increase the current player index(Round-Robin)
 */
Game.prototype.increaseCurrentPlayerIndex = function (index) {
  this.currentPlayerIndex++
  return this.currentPlayerIndex % gameData.NO_OF_PLAYERS
}

/**
 * Gets number of players in the game
 */
Game.prototype.length = function () {
  return this.players.length
}

/**
 * Get the current player
 */
Game.prototype.getCurrentPlayer = function () {
  return this.currentPlayer
}

/**
 * Adds a new player into the game
 */
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

/**
 * Starts the game and sets the status
 */
Game.prototype.start = function () {
  for (var i = 0; i < this.players.length; i++) {
    var player = this.players[i]
    player.sendEvent('game.started', {players: [1, 2], gameId: this.uuid})
  }
}

/**
 * Removes the player from the game
 */
Game.prototype.removePlayer = function (player) {
  // add code to remove player
  var index = this.players.indexOf(player)

  if (index > -1) {
    logger.debug('Remove user = ', this.players[index].socket.id, 'from game = ', this.getUUID())
    this.players.splice(index, 1)
    this.count--
  }
}

/**
 * Get the uuid of the game
 */
Game.prototype.getUUID = function () {
  return this.uuid
}

/**
 * Get the state of the game
 */
Game.prototype.getState = function () {
  return this.state
}

/**
 * Sets the state of the game
 * WAITING: 0,
 * PROGRESS: 1,
 * END: 2
 */
Game.prototype.setState = function (state) {
  this.state = state
}

/**
 * Get the mode of the game
 */
Game.prototype.getMode = function () {
  return this.mode
}

/**
 * Set the mode of the game
 */
Game.prototype.setMode = function (mode) {
  this.mode = mode
}

module.exports = Game
