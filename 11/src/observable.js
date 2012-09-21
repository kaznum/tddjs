tddjs.namespace("util");
(function () {
  function observe(observer) {
    if (!this.observers) {
      this.observers = [];
    }
    if (typeof observer != 'function') {
      throw new TypeError("observer is not function");
    }
    this.observers.push(observer);
  }

  function hasObserver(observer) {
    if (!this.observers) {
      return false;
    }
    for (var i = 0, l = this.observers.length; i < l; i++) {
      if (this.observers[i] == observer) {
        return true;
      }
    }
    return false;
  }

  function notify() {
    if (!this.observers) {
      return;
    }
    for (var i = 0, l = this.observers.length; i < l; i++) {
      try {
        this.observers[i].apply(this, arguments);
      } catch (e) {}
    }
  }

  tddjs.namespace("util").observable = {
    observe: observe,
    hasObserver: hasObserver,
    notify: notify
  };
}());