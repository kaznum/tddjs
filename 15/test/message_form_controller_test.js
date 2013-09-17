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

  TestCase("FormControllerHandleSubmitTest", {
    "test should publish message": function () {
      var controller = Object.create(messageController);
      var model = { notify: stubFn() };

      controller.setModel(model);
      controller.handleSubmit();

      assert(model.notify.called);
      assertEquals("message", model.notify.args[0]);
      assertObject(model.notify.args[1]);
    }
  });
}());
