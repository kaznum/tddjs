(function () {

  if (typeof tddjs == "undefined" ||
      typeof document == "undefined" ||
      !document.createElement) {
    return;
    }

  var element = document.createElement("dl");

  if (!element.appendChild ||
      typeof element.innerHTML != "string") {
    return;
  }
  element = null;
  
  var chat = tddjs.namespace("chat");
  function setModel(model) {
    model.observe("message", this.addMessage.bind(this));
  }

  function addMessage(message) {
    if (this.prevUser != message.user) {
      var user = document.createElement("dt");
      user.innerHTML = "@" + message.user;
      this.view.appendChild(user);
      this.prevUser = message.user;

      this.view.scrollTop = this.view.scrollHeight;
    }

    var msg = document.createElement("dd");
    msg.innerHTML = message.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    this.view.appendChild(msg);
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
