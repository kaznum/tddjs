(function () {
  var chat = tddjs.namespace("chat");
  function handleSubmit(event) {
    var input = this.view.getElementsByTagName("input")[0];

    this.model.notify("message", {
      user: this.model.currentUser,
      message: input.value
    });
  }

  chat.messageFormController = Object.create(chat.formController);
  chat.messageFormController.handleSubmit = handleSubmit;
}());
