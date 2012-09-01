TestCase("ObjectExtentTest", {
  setUp: function () {
    this.dummy = {
      setName: function (name) {
	return (this.name = name);
      },
      getName: function () {
	return this.name || null;
      }
    };
  },
  "test should copy properties": function () {
    var object = {};
    tddjs.extend(object, this.dummy);

    assertEquals("function", typeof object.setName);
    assertEquals("function", typeof object.getName);
  },
  "test should return new object when source is null": function () {
    var object = tddjs.extend(null, this.dummy);

    assertEquals("function", typeof object.setName);
    assertEquals("function", typeof object.getName);
  },
  "test should return target untatched when no source": function () {
    var object = tddjs.extend({});
    var properties = [];

    for (var prop in object) {
      properties.push(prop);
    }

    assertEquals(0, properties.length);
  }
});
