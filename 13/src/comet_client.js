(function () {
  var ajax = tddjs.namespace("ajax");
  ajax.cometClient = {};

  function dispatch(data) {
    var observers = this.observers;
    tddjs.each(data, function(topic, events) {
      for (var i = 0, l = events.length; i < l; i++) {
        observers.notify(topic, events[i]);
      }
    });
  }

  ajax.cometClient = {
    dispatch: dispatch
  };
}());
