if (!Function.prototype.memoize) {
    Function.prototype.memoize = function () {
	var cache = {};
	var func = this;
	var join = Array.prototype.join;

	return function() {
	    var key = join.call(arguments);
	    if(!(key in cache)) {
		cache[key] = func.apply(this, arguments);
	    }
	    return cache[key];
	};
	return this;
    };
}

function fibonacci(x) {
    if (x < 2) {
	return 1;
    }

    return fibonacci(x - 1) + fibonacci(x - 2)
}
