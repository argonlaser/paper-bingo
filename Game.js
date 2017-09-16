const uuid = require('uuid/v1')
const gameData = require('./common/data.js')

var Game = function (user) {
  this.uuid = uuid()
  this.players = []
  this.currentPlayer = user
  this.currentPlayerIndex = -1
  this.result = {}
  this.isFull = false
  this.state = gameData.gameState.WAITING
  this.mode = gameData.gameMode.ONLINE
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
  this.players.push(player)
}

Game.prototype.removePlayer = function (player) {
  // add code to remove player
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
