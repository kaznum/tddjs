(function () {
  var listController = tddjs.chat.messageListController;

  TestCase("MessageListControllerTest", {
    "test should be object": function () {
      assertObject(listController);
    }
  });
}());
