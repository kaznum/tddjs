tddjs.namespace("chat").userFormController = {};

(function () {
  var dom = tddjs.namespace("dom");

  function handleSubmit(event) {
    event.preventDefault();

    if (this.view) {
      var input = this.view.getElementsByTagName("input")[0];
      this.model.currentUser = input.value;
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

  tddjs.namespace("chat").userFormController = {
    setView: setView,
    setModel: setModel,
    handleSubmit: handleSubmit
  };
}());
