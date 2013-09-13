tddjs.namespace("chat").userFormController = {};

(function () {
  var dom = tddjs.namespace("dom");

  function setView (element) {
    element.className = "js-chat";
    dom.addEventHandler(element, "submit", function () {});
  }

  tddjs.namespace("chat").userFormController = {
    setView: setView
  };
}());
