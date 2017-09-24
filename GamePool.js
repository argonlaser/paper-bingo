var _ = require('underscore')
var Game = require('./Game.js')
var logger = require('./Logger/winston.js')
const GAME_CAPACITY = 2

module.exports = GamePool

function GamePool () {
  var games = []

  var addGame = function (game) {
    games.push(game)
  }

  var findGameWithFreeSeats = function () {
    return _.find(games, function (game) {
      return game.players.length < GAME_CAPACITY
    })
  }

  this.AllocateGameForUser = function (user) {
    var game = findGameWithFreeSeats()
    if (_.isEmpty(game)) {
      game = new Game(user)
      addGame(game)
      console.log('cannot find new game, so creating one', game.uuid)
    } else {
      console.log('found new game with id', game.uuid)
      game.addPlayer(user)
    }
    return game
  }

  this.RemoveGame = function (game) {
    var index = games.indexOf(game)

    if (index > -1) {
      logger.debug('Remove game = ', game, 'from games ', game.getUUID())
      games.splice(index, 1)
    }
  }
}
