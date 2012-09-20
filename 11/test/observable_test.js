TestCase("ObservableAddObserverTest", {
  "test should store function": function () {
    var observable = new tddjs.util.Observable();
    var observers = [function () {}, function () {}];

    observable.addObserver(observers[0]);
    observable.addObserver(observers[1]);

    assertEquals(observers, observable.observers);
  }
});

TestCase("ObservableHasObserverTest", {
  "test should return true when has observer": function () {
    var observable = new tddjs.util.Observable();
    var observer = function () {};

    observable.addObserver(observer);
    assertTrue(observable.hasObserver(observer));
  },

  "test should return false when no observers" : function () {
    var observable = new tddjs.util.Observable();

    assertFalse(observable.hasObserver(function () {}));
  }
});
