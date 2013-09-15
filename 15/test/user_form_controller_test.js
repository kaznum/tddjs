(function () {
  var userController = tddjs.chat.userFormController;
  var dom = tddjs.namespace("dom");

  TestCase("UserFormControllerTest", {
    "test should be object": function () {
      assertObject(userController);
    },

    "test should have setView method": function () {
      assertFunction(userController.setView);
    }
  });

  TestCase("UserFormControllerSetViewTest", {
    setUp: function () {
      this.controller = Object.create(userController);
      this.element = {};
      dom.addEventHandler = stubFn();
    },

    "test should add js-chat class": function () {
      this.controller.setView(this.element);
      assertClassName("js-chat", this.element);
    },

    "test should handle submit event": function () {
      this.controller.setView(this.element);

      assert(dom.addEventHandler.called);
      assertSame(this.element, dom.addEventHandler.args[0]);
      assertEquals("submit", dom.addEventHandler.args[1]);
      assertFunction(dom.addEventHandler.args[2]);
    },

    "test should handle event with bound handleSubmit": function () {
      var stub = this.controller.handleSubmit = stubFn();

      this.controller.setView(this.element);
      dom.addEventHandler.args[2]();

      assert(stub.called);
      assertSame(this.controller, stub.thisValue);
    }
  });

}());


