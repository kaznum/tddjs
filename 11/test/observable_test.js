TestCase("ObservableAddObserverTest", {
  "test should store function": function () {
    var observable = new tddjs.util.Observable();
    var observers = [function () {}, function () {}];

    observable.addObserver(observers[0]);
    observable.addObserver(observers[1]);

    assertTrue(observable.hasObserver(observers[0]));
    assertTrue(observable.hasObserver(observers[1]));
  }
});

TestCase("ObservableHasObserverTest", {
  "test should return false when no observers" : function () {
    var observable = new tddjs.util.Observable();

    assertFalse(observable.hasObserver(function () {}));
  }
});
