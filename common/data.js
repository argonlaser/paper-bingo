const gameState = {
  WAITING: 0,
  PROGRESS: 1,
  END: 2
}

const gameMode = {
  ONLINE: 0,
  OFFLINE: 1
}

const position = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5
}

module.exports = {
  gameState: gameState,
  gameMode: gameMode,
  position: position,
  MAX_GAME_CAPACITY: 2,
  NO_OF_PLAYERS: 5
}
