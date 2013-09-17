(function () {
  var messageController = tddjs.chat.messageFormController;
  var formController = tddjs.chat.formController;

  TestCase("FormControllerTestCase", {
    "test should be object": function () {
      assertObject(messageController);
    },

    "test should inherit setView from formController": function () {
      assertSame(messageController.setView, formController.setView);
    },

    "test should have handleSubmit method": function () {
      assertFunction(messageController.handleSubmit);
    }
  });
}());
