(function () {
  var userController = tddjs.chat.userFormController;
  var dom = tddjs.namespace("dom");

  function userFormControllerSetUp() {
    /*:DOC element = <form>
      <fieldset>
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
        <input type="submit" value="Enter">
      </fieldset>
    </form> */
    this.controller = Object.create(userController);
    dom.addEventHandler = stubFn();
    this.event = { preventDefault: stubFn() };
  }

  TestCase("UserFormControllerTest", {
    "test should be object": function () {
      assertObject(userController);
    },

    "test should have setView method": function () {
      assertFunction(userController.setView);
    }
  });

  TestCase("UserFormControllerSetViewTest", {
    setUp: userFormControllerSetUp,

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

  TestCase("UserFormControllerHandleSubmitTest", {
    setUp: userFormControllerSetUp,

    "test should prevent event default action": function () {
      this.controller.handleSubmit(this.event);
      assert(this.event.preventDefault.called);
    },

    "test should set model.currentUser": function () {
      var model = {};
      var input = this.element.getElementsByTagName("input")[0];

      input.value = "cjno";
      this.controller.setModel(model);
      this.controller.setView(this.element);

      this.controller.handleSubmit(this.event);
      assertEquals("cjno", model.currentUser);
    },

    "test should notify observers of username": function () {
      var input = this.element.getElementsByTagName("input")[0];
      input.value = "Bullrog";
      this.controller.setModel({});
      this.controller.setView(this.element);
      var observer = stubFn();

      this.controller.observe("user", observer);
      this.controller.handleSubmit(this.event);

      assert(observer.called);
      assertEquals("Bullrog", observer.args[0]);
    }
  });
}());


