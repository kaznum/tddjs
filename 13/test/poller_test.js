(function () {
  var ajax = tddjs.ajax;

  TestCase("PollerTest", {
    setUp: function() {
      this.ajaxCreate = ajax.create;
      this.xhr = Object.create(fakeXMLHttpRequest);
      ajax.create = stubFn(this.xhr);
      this.ajaxRequest = ajax.request;
      this.poller = Object.create(ajax.poller);
      this.poller.url = "/url";
    },

    tearDown: function () {
      ajax.request = this.ajaxRequest;
      ajax.create = this.ajaxCreate;
      Clock.reset();
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
      var time = new Date().getTime();
      stubDateConstructor(new Date(time));
      poller.start();
      
      var expectedArgs = ["GET", poller.url + "?" + time, true];
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
    },

    "test should configure request interval": function () {
      this.poller.interval = 350;
      this.poller.start();
      this.xhr.complete();
      this.xhr.send = stubFn();
      Clock.tick(349);
      assertFalse(this.xhr.send.called);

      Clock.tick(1);
      assert(this.xhr.send.called);
    },

    "test should pass headers to request": function () {
      this.poller.headers = {
        "Header-One": "1",
        "Header-Two": "2"
      };

      this.poller.start();

      var actual = this.xhr.headers;
      var expected = this.poller.headers;
      assertEquals(expected["Header-One"], actual["Header-One"]);
      assertEquals(expected["Header-Two"], actual["Header-Two"]);
    },

    "test should pass success callback" : function () {
      this.poller.success = stubFn();

      this.poller.start();
      this.xhr.complete();

      assert(this.poller.success.called);
    },

    "test should pass failure callback": function () {
      this.poller.failure = stubFn();

      this.poller.start();
      this.xhr.complete(400);
      assert(this.poller.failure.called);
    },

    "test should pass complete callback": function () {
      this.poller.complete = stubFn();

      this.poller.start();
      this.xhr.complete();
      assert(this.poller.complete.called);
    },

    "test should re-request immediately after long request": function () {
      this.poller.interval = 500;
      this.poller.start();
      var ahead = new Date().getTime() + 600;
      stubDateConstructor(new Date(ahead));
      ajax.request = stubFn();

      this.xhr.complete();
      Clock.tick(0);

      assert(ajax.request.called);
    },

    "test should add cache buster to URL" : function () {
      var date = new Date();
      var ts = date.getTime();
      stubDateConstructor(date);
      this.poller.url = "/url";

      this.poller.start();

      assertEquals("/url?" + ts, this.xhr.open.args[1]);
    }
  });
}());
