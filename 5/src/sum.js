function sum() {
  var total = 0;
  for (var i = 0, l = arguments.length; i < l; i++) {
    total += arguments[i];
  }
  return total;
}

