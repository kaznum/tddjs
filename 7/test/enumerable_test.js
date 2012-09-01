TestCase("EnumerableTest", {
  "test should add enumerable methods to arrays": function () {
    tddjs.extend(Array.prototype, enumerable);

    var even = [1,2,3,4].reject(function(i) {
      return i % 2 == 1;
    });
  }
});
