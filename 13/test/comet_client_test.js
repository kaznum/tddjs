(function () {
  var ajax = tddjs.ajax;

  TestCase("CometClientTest", {
    "test should be object" : function () {
      assertObject(ajax.cometClient);
    },

    "test should have dispatch method" : function () {
      var client = Object.create(ajax.cometClient);

      assertFunction(client.dispatch);
    },

    "test dispatch should notify observers": function () {
      var client = Object.create(ajax.cometClient);
      client.observers = { notify: stubFn() };
      client.dispatch({ someEvent: [{id : 1234}]});

      var args = client.observers.notify.args;

      assert(client.observers.notify.called);
      assertEquals("someEvent", args[0]);
      assertEquals({id: 1234}, args[1]);
    }
  });
}());

