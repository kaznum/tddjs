(function() {
  var ajax = tddjs.namespace("ajax");

  TestCase("PollTest", {
    setUp: function () {
      this.request = ajax.request;
      this.create = Object.create;
      ajax.request = stubFn();
    },

    tearDown: function () {
      ajax.request = this.request;
      Object.create = this.create;
    },

    "test should call start on poller object" : function () {
      var poller = { start: stubFn() };
      Object.create = stubFn(poller);

      ajax.poll("/url");

      assert(poller.start.called);
    },

    "test should set url property on poller object": function () {
      var poller = ajax.poll("/url");
      assertSame("/url", poller.url);
    },

    "test should pass headers to poller": function () {
      var headers = {
        "Header-One": "1",
        "Header-Two": "2"
      };

      var poller = ajax.poll("/url", { headers: headers } );

      var actual = headers;
      var expected = poller.headers;
      assertEquals(expected["Header-One"], actual["Header-One"]);
      assertEquals(expected["Header-Two"], actual["Header-Two"]);
    },
  });
}());
