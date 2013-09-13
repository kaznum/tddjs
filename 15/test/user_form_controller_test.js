(function () {
  var userController = tddjs.chat.userFormController;

  TestCase("UserFormControllerTest", {
    "test should be object": function () {
      assertObject(userController);
    }
  });
}());

