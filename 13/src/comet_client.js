(function () {
  var ajax = tddjs.ajax;
  var util = tddjs.util;
  ajax.cometClient = {};

  function dispatch(data) {
    var observers = this.observers;
    if(!observers || typeof observers.notify != "function") {
      return;
    }

    tddjs.each(data, function(topic, events) {
      var length = events && events.length;
      for (var i = 0;  i < length; i++) {
        observers.notify(topic, events[i]);
      }
    });
  }

  function observe(topic, observer) {
    if (!this.observers) {
      this.observers = Object.create(util.observable);
    }
    this.observers.observe(topic, observer);
  }

  ajax.cometClient = {
    dispatch: dispatch,
    observe: observe
  };
}());
