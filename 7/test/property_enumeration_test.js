TestCase("PropertyEnumerationTest", {
    "test should enumerate shadowed object properties" : function () {
	var object = {
	    toString: "toString",
	    toLocaleString: "toLocaleString",
	    valueOf: "valueOf",
	    hasOwnProperty: "hasOwnProperty",
	    isPrototypeOf: "isPrototypeOf",
	    propertyIsEnumerable: "propertyIsEnumerable",
	    constructor: "constructor",
	    bar: "bar"
	};

	var result = [];

	tddjs.each(object, function (property) {
	    result.push(property);
	});

	assertEquals(8, result.length);
    },

    "test should enumerate shadowed function properties" : function () {
	var object = function () {};
	object.prototype = "prototype";
	object.prototype = true;
	object.call = "call";
	object.apply = "apply";
	object.foo = "foo";
	var result = [];
	tddjs.each(object, function (property) {
	    result.push(property);
	});

	assertEquals(["apply", "call", "foo", "prototype"], result.sort());
    }
});
