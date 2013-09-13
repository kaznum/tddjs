(function () {
  var userController = tddjs.chat.userFormController;

  TestCase("UserFormControllerTest", {
    "test should be object": function () {
      assertObject(userController);
    },

    "test should have setView method": function () {
      assertFunction(userController.setView);
    }
  });

  TestCase("UserFormControllerSetViewTest", {
    "test should add js-chat class": function () {
      var controller = Object.create(userController);
      var element = {};

      controller.setView(element);
      assertClassName("js-chat", element);
    }
  });
}());


