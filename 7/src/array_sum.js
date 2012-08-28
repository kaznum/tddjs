Array.prototype.sum = function () {
    var length = this.length;
    var total = 0;
    for (var i = 0; i < length; i++) {
	total += this[i];
    }
    return total;
};
