TestCase("ArrayPrototypeTest", {
  "test arguments should borrow from Array.prototype": function () {
    function addToArray() {
      var args = Array.prototype.slice.call(arguments);
      var arr = args.shift();
      return arr.concat(args);
    }

    var result = addToArray([],1,2,3);
    assertEquals([1,2,3], result);
    
  }
});
