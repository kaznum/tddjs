(function () {
  if (typeof tddjs == "undefined" ||
      typeof document == "undefined") {
    return;
  }
      
  var dom = tddjs.dom;
  var util = tddjs.util;
  var chat = tddjs.namespace("chat");

  if (!dom || !dom.addEventHandler || !util ||
      !util.observable || !Object.create ||
      !document.getElementsByTagName ||
      !Function.prototype.bind) {
    return;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (this.view) {
      var input = this.view.getElementsByTagName("input")[0];
      var userName = input.value;

      if (!userName) {
        return;
      }
      
      this.view.className = "";
      this.model.currentUser = userName;
      this.notify("user", userName);
    }
  }

  function setView (element) {
    element.className = "js-chat";
    var handler = this.handleSubmit.bind(this);
    dom.addEventHandler(element, "submit", handler);
    this.view = element;
  }

  function setModel(model) {
    this.model = model;
  }

  chat.userFormController = tddjs.extend({}, util.observable);
  chat.userFormController.setView = setView;
  chat.userFormController.setModel = setModel;
  chat.userFormController.handleSubmit = handleSubmit;
}());