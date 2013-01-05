(function () {
  var ajax = tddjs.ajax;

  TestCase("CometClientTest", {
    "test should be object" : function () {
      assertObject(ajax.cometClient);
    },

    "test should have dispatch method" : function () {
      var client = Object.create(ajax.cometClient);

      assertFunction(client.dispatch);
    }
  });
}());

