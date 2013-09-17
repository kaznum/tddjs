(function () {
  if (typeof tddjs == "undefined") {
    return;
  }

  var dom = tddjs.dom;
  var chat = tddjs.namespace("chat");

  if (!dom || !dom.addEventHandler || !Function.prototype.bind) {
    return;
  }

  function setView(element) {
    element.className = "js-chat";
    var handler = this.handleSubmit.bind(this);
    dom.addEventHandler(element, "submit", handler);
    this.view = element;
  }

  chat.formController = {
    setView: setView
  };
}());
