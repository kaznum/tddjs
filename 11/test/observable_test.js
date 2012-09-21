TestCase("ObservableAddObserverTest", {
  setUp: function () {
    this.observable = Object.create(tddjs.util.observable);
  },
  "test should store function": function () {
    var observers = [function () {}, function () {}];
    var observable = this.observable;
    observable.observe(observers[0]);
    observable.observe(observers[1]);

    assertTrue(observable.hasObserver(observers[0]));
    assertTrue(observable.hasObserver(observers[1]));
  },

  "test should throw for uncallable observer": function () {
    var observable = this.observable;
    assertException(function () {
      observable.observe({});
    }, "TypeError");
  },
});

TestCase("ObservableHasObserverTest", {
  setUp: function () {
    this.observable = Object.create(tddjs.util.observable);
  },

  "test should return false when no observers" : function () {
    assertFalse(this.observable.hasObserver(function () {}));
  }
});

TestCase("ObservableNotifyObserversTest", {
  setUp: function () {
    this.observable = Object.create(tddjs.util.observable);
  },

  "test should call all observers": function () {
    var observable = this.observable;
    var observer1 = function () { observer1.called = true; };
    var observer2 = function () { observer2.called = true; };

    observable.observe(observer1);
    observable.observe(observer2);
    observable.notify();

    assertTrue(observer1.called);
    assertTrue(observer2.called);
  },

  "test should pass through arguments": function () {
    var actual;
    var observable = this.observable;

    observable.observe(function () {
      actual = arguments;
    });

    observable.notify("String", 1, 32);

    assertEquals(["String", 1, 32], actual);
  },

  "test should notfiy all even when some fail": function () {
    var observable = this.observable;
    var observer1 = function () { throw new Error("Oops") };
    var observer2 = function () { observer2.called = true };

    observable.observe(observer1);
    observable.observe(observer2);
    observable.notify();
    assertTrue(observer2.called);
  },

  "test should call observers in the order they were added": function () {
    var calls = [];
    var observable = this.observable;
    var observer1 = function () { calls.push(observer1); };
    var observer2 = function () { calls.push(observer2); };
    observable.observe(observer1);
    observable.observe(observer2);

    observable.notify();

    assertEquals(observer1, calls[0]);
    assertEquals(observer2, calls[1]);
  },

  "test should not fail if no observers" : function () {
    observable = this.observable;
    assertNoException(function () {
      observable.notify();
    });
  }
});