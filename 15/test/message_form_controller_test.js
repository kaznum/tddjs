(function () {
  var messageController = tddjs.chat.messageFormController;

  TestCase("FormControllerTestCase", {
    "test should be object": function () {
      assertObject(messageController);
    }
  });
}());
