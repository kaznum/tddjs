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
}());
