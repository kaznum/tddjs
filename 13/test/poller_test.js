(function () {
  var ajax = tddjs.ajax;

  TestCase("PollerTest", {
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
    }
  });
}());
