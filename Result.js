let Result = function (gameUUID) {
  this.gameUUID = gameUUID
  this.ranks = []
}

Result.prototype.addRank = function (socket, position) {
  let rank = {}
  rank.socketid = socket.id
  rank.position = position
  this.ranks.push(rank)
}

Result.prototype.getRanks = function () {
  return this.ranks
}

Result.prototype.getGameUUID = function () {
  return this.gameUUID
}

module.exports = Result
