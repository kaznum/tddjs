(function () {
  var chat = tddjs.namespace("chat");
  function setModel(model) {
    model.observe("message", this.addMessage.bind(this));
  }

  function addMessage(message) {
    var user = document.createElement("dt");
    user.innerHTML = "@" + message.user;
    this.view.appendChild(user);
  }

  function setView(element) {
    element.className = "js-chat";
    this.view = element;
  }

  chat.messageListController = {
    setModel: setModel,
    setView: setView,
    addMessage: addMessage
  };
}());
