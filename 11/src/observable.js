tddjs.namespace("util");
(function () {
  function Observable() {
    this.observers = [];
  }
  tddjs.util.Observable = Observable;

  function addObserver(observer) {
    this.observers.push(observer);
  }
  Observable.prototype.addObserver = addObserver;

  function hasObserver(observer) {
    for (var i = 0, l = this.observers.length; i < l; i++) {
      if (this.observers[i] == observer) {
        return true;
      }
    }
    return false;
  }
  Observable.prototype.hasObserver = hasObserver;

  function notifyObservers() {
    for (var i = 0, l = this.observers.length; i < l; i++) {
      this.observers[i]();
    }
  }
  Observable.prototype.notifyObservers = notifyObservers;

}());
