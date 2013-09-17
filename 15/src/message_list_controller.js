(function () {
  var chat = tddjs.namespace("chat");
  function setModel(model) {
    model.observe("message", function () {});
  };

  chat.messageListController = {
    setModel: setModel
  };
}());
