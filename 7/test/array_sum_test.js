TestCase("ArraySumTest", {
    "test should summarize numbers in array": function () {
	var array = [1,2,3,4,5,6];
	assertEquals(21, array.sum());
    },
    "test looping should only iterate over own properties" : function () {
	var person = {
	    name: "Kazuya",
	    profession: "Programmer",
	    location: "Sapporo"
	};
	var result = [];
	for ( var prop in person ) {
	    if (person.hasOwnProperty(prop)) {
		result.push(prop);
	    }
	}
	var expected = ["location", "name", "profession"];
	assertEquals(expected, result.sort());
    }
});
