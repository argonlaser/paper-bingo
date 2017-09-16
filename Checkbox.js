let Checkbox = function (row, col, val) {
  this.isStriked = false
  this.row = row
  this.col = col
  this.val = val
}

Checkbox.prototype.setStriked = function (flag) {
  this.isStriked = flag
}

Checkbox.prototype.getStriked = function (flag) {
  return this.isStriked
}

Checkbox.prototype.getVal = function () {
  return this.val
}

Checkbox.prototype.setVal = function (val) {
  this.val = val
}

module.exports = Checkbox
