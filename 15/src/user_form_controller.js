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

  function setModel(model) {
    this.model = model;
  }

  chat.userFormController = tddjs.extend(Object.create(chat.formController),
                                         util.observable);
  chat.userFormController.setModel = setModel;
  chat.userFormController.handleSubmit = handleSubmit;
}());
