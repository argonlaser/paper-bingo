const Checkbox = require('./Checkbox.js')

let Gameboard = function () {
  this.checkbox = []
  this.strikeCount = 0
  this.fillCheckbox()
}

Gameboard.prototype.incStrikeCount = function () {
  this.strikeCount++
}

Gameboard.prototype.scanBingo = function () {
  return (this.strikeCount >= 5)
}

Gameboard.prototype.fillCheckbox = function () {
  let count = 1
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      count++
      const cb = new Checkbox(i + 1, j + 1, count)
      this.checkbox.push(cb)
    }
  }
}

module.exports = Gameboard
