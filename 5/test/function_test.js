TestCase("FunctionTest", {
  "test function length property": function() {
    assertEquals(2, assert.length);
    // assertEquals(1, document.getElementById.length);
    assertEquals(0, console.log.length);
  },

  "test argument array": function () {
    function to_array() {
      return Array.prototype.slice.call(arguments, 0);
    }

    assertEquals([1,2,3,4,5], to_array(1,2,3,4,5));
  },

  "test argument array by concat": function () {
    function to_array_by_concat() {
      var init = arguments[0];
      //assertEquals("number", typeof(init));
      var add = Array.prototype.slice.call(arguments, 1);
      return init.concat(add);
    }

    assertEquals([1,2,3,4,5], to_array_by_concat([1],2,3,4,5));
  },


  "test scope": function () {
    function sum() {
      assertUndefined(i);

      assertException(function () {
        assertUndefined(someVar);
      }, "ReferenceError");

      var total = arguments[0];
      if (arguments.length > 1) {
        for (var i = 1, l = arguments.length; i < l; i++) {
          total += arguments[i];
        }
      }


      assertEquals(5, i);
      return total;
    }

    assertEquals(15, sum(1,2,3,4,5));
  },

  "test scope chain": function() {
    var i = 10;
    function add(num) {
      return num + i;
    }

    assertEquals(11, add(1));
  },

  "test block which does not make a scope": function() {
    var i = 10;
    if (true) {
      var j = 20;
    }

    assertEquals(10, i);
    assertEquals(20, j);
  }
});

