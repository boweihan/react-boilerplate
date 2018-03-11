function Enum() {
  this.add.apply(this, arguments);
}

Enum.prototype.add = function() {
  for (let i in arguments) {
    this[arguments[i]] = String(arguments[i]);
  }
};

Enum.prototype.toList = function() {
  return Object.keys(this);
};

export default Enum;
