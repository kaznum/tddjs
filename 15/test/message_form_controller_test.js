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
      /*:DOC element = <form>
          <fieldset>
            <input type="text" name="message" id="message">
            <input type="submit" value="Send">
          </fieldset>
        </form> */
      this.controller = Object.create(messageController);
      this.model = { notify: stubFn() };
      this.controller.setModel(this.model);
      this.controller.setView(this.element);
      this.event = { preventDefault: stubFn() };
    },

    "test should publish message": function () {
      var el = this.element.getElementsByTagName("input")[0];
      el.value = "What are you doing?";
      this.controller.setModel(this.model);
      this.controller.handleSubmit(this.event);

      assert(this.model.notify.called);
      assertEquals("message", this.model.notify.args[0]);
      assertObject(this.model.notify.args[1]);
    },

    "test should publish message from current user": function () {
      var el = this.element.getElementsByTagName("input")[0];
      el.value = "What are you doing?";
      this.model.currentUser = "cjno";
      this.controller.handleSubmit(this.event);
      assertEquals("cjno", this.model.notify.args[1].user);
    },

    "test should publish message from form": function () {
      var el = this.element.getElementsByTagName("input")[0];
      el.value = "What are you doing?";

      this.controller.handleSubmit(this.event);

      var actual = this.model.notify.args[1].message;
      assertEquals("What are you doing?", actual);
      assertEquals("", el.value);
    },

    "test should prevent event default action": function () {
      var el = this.element.getElementsByTagName("input")[0];
      el.value = "What are you doing?";

      this.controller.handleSubmit(this.event);
      assert(this.event.preventDefault.called);
    },

    "test should not notify observers of empty message": function () {
      var el = this.element.getElementsByTagName("input")[0];
      el.value = "";
      this.controller.handleSubmit(this.event);

      assertFalse(this.model.notify.called);
    }
  });
}());
