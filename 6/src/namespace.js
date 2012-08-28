var tddjs = (function () {
    function namespace(string) {
	var object = this;
	var levels = string.split(".");
	for(var i = 0, l = levels.length; i < l; i++) {
	    if (typeof object[levels[i]] == "undefined") {
		object[levels[i]] = {};
	    }
	    object = object[levels[i]];
	}
	return object;
    }

    return {
	namespace: namespace
    };
}());

(function () {
    function iterator(collection) {
	var length = collection.length;
	var index = 0;
	function next() {
	    return collection[index++];
	}
	function hasNext() {
	    return index < length
	}

	return {
	    next: next,
	    hasNext: hasNext
	}
    }

    if (typeof tddjs == "object") {
	tddjs.iterator = iterator;
    } else {
	tddjs = {
	    iterator: iterator
	};
    }
}());
