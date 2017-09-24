const Checkbox = require('./Checkbox.js')

let Gameboard = function () {
  this.checkbox = []
  this.strikeCount = 0
}

Gameboard.prototype.incStrikeCount = function () {
  this.strikeCount++
}

Gameboard.prototype.scanBingo = function () {
  return (this.strikeCount >= 5)
}

Gameboard.prototype.fillCheckbox = function (board) {
  let count = 0
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const cb = new Checkbox(i, j, board[count])
      this.checkbox.push(cb)
      count++
    }
  }
}

module.exports = Gameboard
