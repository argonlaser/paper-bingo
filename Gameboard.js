const Checkbox = require('./Checkbox.js')
const _ = require('underscore')

let Gameboard = function () {
  this.checkbox = []
  this.strikeCount = 0
}

Gameboard.prototype.incStrikeCount = function () {
  this.strikeCount++
}

Gameboard.prototype.addIfStriked = function (cbArray) {
  var trueCount = _.filter(cbArray, function (cbObj) { return cbObj.isStriked === true })
  if (trueCount === 5) {
    return 1
  } else {
    return 0
  }
}

Gameboard.prototype.scanBingo = function () {
  return (this.strikeCount >= 5)
}

Gameboard.prototype.strikeCheckbox = function (value) {
  var cboxObj = _.find(this.checkbox, function (cbObj) {
    return cbObj.val === value && cbObj.isStriked === false
  })

  var index = _.indexOf(this.checkbox, cboxObj)
  if (index !== -1) {
    this.checkbox[index].setStriked(true)
  }
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

Gameboard.prototype.CountStriked = function (board) {
  // check how many rows are striked
  var i = 0
  var arr = []

  for (i = 0; i < 5; i++) {
    arr = _.filter(this.checkbox, function (cbObj) { return cbObj.row === i })
    this.strikeCount += this.addIfStriked(arr)
    console.log(arr, this.strikeCount)
  }

  // check how many colums are striked
  for (i = 0; i < 5; i++) {
    arr = _.filter(this.checkbox, function (cbObj) { return cbObj.col === i })
    this.strikeCount += this.addIfStriked(arr)
    console.log(arr, this.strikeCount)
  }

  // check how many right to down diagonal are striked
  for (i = 0; i < 5; i++) {
    arr = _.filter(this.checkbox, function (cbObj) { return cbObj.col === cbObj.row })
    this.strikeCount += this.addIfStriked(arr)
    console.log(arr, this.strikeCount)
  }

  // check how many left to down diagonal are striked
  for (i = 0; i < 5; i++) {
    arr = _.filter(this.checkbox, function (cbObj) { return cbObj.col + cbObj.row + 1 === 5 })
    this.strikeCount += this.addIfStriked(arr)
    console.log(arr, this.strikeCount)
  }
}

module.exports = Gameboard
