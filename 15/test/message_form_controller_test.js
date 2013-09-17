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
    setUp: function () {
      this.controller = Object.create(messageController);
      this.model = { notify: stubFn() };
      this.controller.setModel(this.model);
    },

    "test should publish message": function () {
      var controller = Object.create(messageController);
      var model = { notify: stubFn() };

      controller.setModel(model);
      controller.handleSubmit();

      assert(model.notify.called);
      assertEquals("message", model.notify.args[0]);
      assertObject(model.notify.args[1]);
    },

    "test should publish message from current user": function () {
      this.model.currentUser = "cjno";
      this.controller.handleSubmit();
      assertEquals("cjno", this.model.notify.args[1].user);
    }

  });
}());
