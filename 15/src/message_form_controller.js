(function () {
  var chat = tddjs.namespace("chat");
  function handleSubmit(event) {
    this.model.notify("message", {});
  }

  chat.messageFormController = Object.create(chat.formController);
  chat.messageFormController.handleSubmit = handleSubmit;
}());
