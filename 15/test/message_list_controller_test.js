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

  TestCase("MessageListControllerSetModelTest", {
    "test should observe model's message channel": function () {
      var controller = Object.create(listController);
      var model = { observe: stubFn() };

      controller.setModel(model);
      assert(model.observe.called);
      assertEquals("message", model.observe.args[0]);
      assertFunction(model.observe.args[1]);
    }
  });
}());
