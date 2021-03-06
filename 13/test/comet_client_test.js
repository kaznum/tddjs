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
      this.client.url = "/my/url";
      this.ajaxPoll = ajax.poll;
      this.ajaxCreate = ajax.create;
      this.xhr = Object.create(fakeXMLHttpRequest);
      ajax.create = stubFn(this.xhr);
    },

    tearDown: function () {
      ajax.poll = this.ajaxPoll;
      ajax.create = this.ajaxCreate;
      Clock.reset();
    },

    "test connect should start polling": function () {
      ajax.poll = stubFn({});

      this.client.connect();

      assert(ajax.poll.called);
      assertEquals("/my/url", ajax.poll.args[0]);
    },

    "test should not connect if connected": function () {
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
    },

    "test should dispatch data from request": function () {
      var data = { topic: [{id: "12345"}],
                   otherTopic: [{name: "Me"}] };
      this.client.dispatch = stubFn();

      this.client.connect();
      this.xhr.complete(200, JSON.stringify(data));

      assert(this.client.dispatch.called);
      assertEquals(data, this.client.dispatch.args[0]);
    },

    "test should provide custom header" : function () {
      this.client.connect();
      assertNotUndefined(this.xhr.headers["X-Access-Token"]);
    },

    "test should pass token on following request": function () {
      this.client.connect();
      var data = { token: 1267482145219 };

      this.xhr.complete(200, JSON.stringify(data));
      Clock.tick(1000);

      var headers = this.xhr.headers;
      assertEquals(data.token, headers["X-Access-Token"]);
    }
  });

  TestCase("CometClientNotifyTest", {
    setUp: function () {
      this.client = Object.create(ajax.cometClient);
      this.client.url = "/my/url";
      this.ajaxPost = ajax.post;
      // this.ajaxPoll = ajax.poll;
      // this.ajaxCreate = ajax.create;
      // this.xhr = Object.create(fakeXMLHttpRequest);
      // ajax.create = stubFn(this.xhr);
    },

    tearDown: function () {
      // ajax.poll = this.ajaxPoll;
      // ajax.create = this.ajaxCreate;
      // Clock.reset();
      ajax.post = this.ajaxPost;
    },
    "test notify should be function": function () {
      assertFunction(this.client.notify);
    },

    "test notify should receive topic as an argument" : function () {
      assertException(function () {
        this.client.notify();
      }.bind(this), "TypeError");
    },
    
    "test notify should receive data as an argument" : function () {
      assertException(function () {
        this.client.notify("myTopic");
      }.bind(this), "TypeError");
    },

    "test notify should throw error if no url exists": function () {
      var client = Object.create(ajax.cometClient);
      assertException(function () {
        client.notify("myTopic", {});
      }, "TypeError");
    },

    "test notify should POST to the client.url with topic and data": function () {
      var topic = "myTopic";
      var data = { sample1: "data1", sample2: "data2"};
      var expected_posted_data = JSON.stringify({topic: topic, data: data});

      ajax.post = stubFn();
      this.client.notify(topic, data);
      assert(ajax.post.called);
      assertEquals(this.client.url, ajax.post.args[0]);
      assertEquals(JSON.parse(expected_posted_data), JSON.parse(ajax.post.args[1].data));
    }

    
  });
}());

