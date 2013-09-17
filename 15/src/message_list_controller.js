(function () {
  var chat = tddjs.namespace("chat");
  function setModel(model) {
    model.observe("message", this.addMessage.bind(this));
  }

  function addMessage(message) {}

  chat.messageListController = {
    setModel: setModel,
    addMessage: addMessage
  };
}());
