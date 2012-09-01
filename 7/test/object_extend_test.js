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
  }
});
