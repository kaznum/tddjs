(function () {
  var ajax = tddjs.ajax;

  TestCase("PollerTest", {
    setUp: function() {
      this.ajaxCreate = ajax.create;
      this.xhr = Object.create(fakeXMLHttpRequest);
      ajax.create = stubFn(this.xhr);
      this.poller = Object.create(ajax.poller);
      this.poller.url = "/url";
    },

    tearDown: function () {
      ajax.create = this.ajaxCreate;
    },

    "test should be object" : function () {
      assertObject(ajax.poller);
    },

    "test start should throw exception for missing URL" : function () {
      var poller = Object.create(ajax.poller);

      assertException(function () {
        poller.start();
      }, "TypeError");
    },

    "test should define a start method" : function () {
      assertFunction(ajax.poller.start);
    },

    "test start should make XHR request with URL" : function () {
      var poller = this.poller;
      poller.start();

      var expectedArgs = ["GET", poller.url, true];
      var actualArgs = [].slice.call(this.xhr.open.args);
      assert(this.xhr.open.called);
      assertEquals(expectedArgs, actualArgs);
      assert(this.xhr.send.called);
    },

    "test should schedule new request when complete": function () {
      var poller = this.poller;

      poller.start();
      this.xhr.complete();
      this.xhr.send = stubFn();
      Clock.tick(1000);

      assert(this.xhr.send.called);
    },

    "test should not make new request until 1000ms passed" : function () {
      this.poller.start();
      this.xhr.complete();
      this.xhr.send = stubFn();
      Clock.tick(999);

      assertFalse(this.xhr.send.called);
    }
  });
}());
