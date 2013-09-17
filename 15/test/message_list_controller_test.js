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
    setUp: function () {
      this.controller = Object.create(listController);
      this.model = { observe: stubFn() };
    },

    "test should observe model's message channel": function () {
      var controller = Object.create(listController);
      var model = { observe: stubFn() };

      controller.setModel(model);
      assert(model.observe.called);
      assertEquals("message", model.observe.args[0]);
      assertFunction(model.observe.args[1]);
    },

    "test should observe with bound addMessage": function () {
      var stub = this.controller.addMessage = stubFn();

      this.controller.setModel(this.model);
      this.model.observe.args[1]();
      assert(stub.called);
      assertSame(this.controller, stub.thisValue);
    }
  });
}());