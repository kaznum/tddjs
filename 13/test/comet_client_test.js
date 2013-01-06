(function () {
  var ajax = tddjs.ajax;

  TestCase("CometClientTest", {
    "test should be object" : function () {
      assertObject(ajax.cometClient);
    }
  });

  TestCase("CometClientDispatchTest", {
    setUp: function () {
      this.client = Object.create(ajax.cometClient);
      this.client.observers = { notify: stubFn() };
    },

    "test should have dispatch method" : function () {
      assertFunction(this.client.dispatch);
    },

    "test dispatch should notify observers": function () {
      this.client.observers = { notify: stubFn() };
      this.client.dispatch({ someEvent: [{id : 1234}]});

      var args = this.client.observers.notify.args;

      assert(this.client.observers.notify.called);
      assertEquals("someEvent", args[0]);
      assertEquals({id: 1234}, args[1]);
    },

    "test should not throw if no observers": function () {
      this.client.observers = null;

      assertNoException(function () {
        this.client.dispatch({ someEvent: [{}]});
      }.bind(this));
    },

    "test should not throw if notify undefined": function () {
      this.client.observers = {};

      assertNoException(function () {
        this.client.dispatch({ someEvent: [{}]});
      }.bind(this));
    },

    "test should not throw if data is not provided": function () {
      assertNoException(function () {
        this.client.dispatch();
      }.bind(this));
    },

    "test should not throw if event is null" : function () {
      assertNoException(function () {
        this.client.dispatch({myEvent: null});
      }.bind(this));
    }
  });

  TestCase("CometClientObserveTest", {
    setUp: function () {
      this.client = Object.create(ajax.cometClient);
    },

    "test should remember observers": function () {
      var observers = [stubFn(), stubFn()];
      this.client.observe("myEvent", observers[0]);
      this.client.observe("myEvent", observers[1]);
      var data = { myEvent: [{}] };

      this.client.dispatch(data);

      assert(observers[0].called);
      assertSame(data.myEvent[0], observers[0].args[0]);
      assert(observers[1].called);
      assertSame(data.myEvent[0], observers[1].args[0]);
    }
  });

  TestCase("CometClientConnectTest", {
    setUp: function () {
      this.client = Object.create(ajax.cometClient);
      this.ajaxPoll = ajax.poll;
    },

    tearDown: function () {
      ajax.poll = this.ajaxPoll;
    },

    "test connect should start polling": function () {
      this.client.url = "/my/url";
      ajax.poll = stubFn({});

      this.client.connect();

      assert(ajax.poll.called);
      assertEquals("/my/url", ajax.poll.args[0]);
    },

    "test should not connect if connected": function () {
      this.client.url = "/my/url";
      ajax.poll = stubFn({});
      this.client.connect();

      ajax.poll = stubFn({});
      this.client.connect();
      assertFalse(ajax.poll.called);
    },

    "test connect should throw error if no url exists": function () {
      var client = Object.create(ajax.cometClient);
      ajax.poll = stubFn({});

      assertException(function () {
        client.connect();
      }, "TypeError");
    }
  });
}());

