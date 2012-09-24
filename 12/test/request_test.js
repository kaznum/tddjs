(function () {
  var ajax = tddjs.ajax;

  TestCase("GetRequestTest", {
    setUp: function () {
      this.ajaxCreate = ajax.create;
    },
    tearDown: function () {
      ajax.create = this.ajaxCreate;
    },

    "test should define get method": function () {
      assertFunction(ajax.get);
    },

    "test should throw error without url": function () {
      assertException(function () {
        ajax.get();
      }, "TypeError");
    },

    "test should obtain an XMLHttpRequest object": function () {
      ajax.create = stubFn();
      ajax.get("/url");

      assert(ajax.create.called);
    },

    "test should call open with method, url, async flag": function () {
      var actual;

      ajax.create = stubFn({
        open: function () {
          actural = arguments;
        }
      });

      var url = "/url";
      ajax.get(url);

      assertEquals(["GET", url, true], actual);
    }
  });
}());
