(function () {
  var listController = tddjs.chat.messageListController;

  TestCase("MessageListControllerTest", {
    "test should be object": function () {
      assertObject(listController);
    },

    "test should have setModel method": function () {
      assertFunction(listController.setModel);
    }
  });
}());
