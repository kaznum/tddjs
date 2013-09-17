(function () {
  var chat = tddjs.namespace("chat");
  function handleSubmit(event) {}

  chat.messageFormController = Object.create(chat.formController);
  chat.messageFormController.handleSubmit = handleSubmit;
}());
