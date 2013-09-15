tddjs.namespace("chat").userFormController = {};

(function () {
  var dom = tddjs.namespace("dom");

  function handleSubmit(event) {
  }

  function setView (element) {
    element.className = "js-chat";
    var handler = this.handleSubmit.bind(this);
    dom.addEventHandler(element, "submit", handler);
  }

  tddjs.namespace("chat").userFormController = {
    setView: setView,
    handleSubmit: handleSubmit
  };
}());
