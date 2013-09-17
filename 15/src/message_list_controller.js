(function () {
  var chat = tddjs.namespace("chat");
  function setModel(model) {
    model.observe("message", this.addMessage.bind(this));
  }

  function addMessage(message) {}

  function setView(element) {
    element.className = "js-chat";
  }

  chat.messageListController = {
    setModel: setModel,
    setView: setView,
    addMessage: addMessage
  };
}());
