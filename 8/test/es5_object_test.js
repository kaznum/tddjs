TestCase("ES5ObjectTest", {
  "test defineProperty": function () {
    var circle = {};

    Object.defineProperty(circle, "radius", {
      value: 4,
      writable: false,
      configurable: false
    });

    assertEquals(4, circle.radius);
  },
  "test changing property descriptor": function () {
    var circle = { radius: 3 };
    var descriptor = Object.getOwnPropertyDescriptor(circle, "radius");

    descriptor.configurable = false;
    Object.defineProperty(circle, "radius", descriptor);
    delete circle.radius;

    assertEquals(3, circle.radius);
  },
  "test es3 inheritance via constructors": function () {
    var circle = {};
    function CircleProxy() {}
    CircleProxy.prototype = circle;
    var sphere = new CircleProxy();

    assert(circle.isPrototypeOf(sphere));
  },
  "test inheritance via proprietary __proto__": function () {
    var circle = {};
    var sphere = {};
    sphere.__proto__ = circle;
    assert(circle.isPrototypeOf(sphere));
  },
  "test inheritance via es5 style": function () {
    var circle = {};
    var sphere = Object.create(circle);
    assert(circle.isPrototypeOf(sphere));
    assertEquals(circle, Object.getPrototypeOf(sphere));
  },
  "test Object.create with properties": function () {
    var circle = {};
    var sphere = Object.create(circle, {
      radius: {
	value: 3,
	writable: false,
	configurable: false,
	enumerable: true
      }
    });
    assertEquals(3, sphere.radius);
    assert(circle.isPrototypeOf(sphere));
    assertEquals(circle, Object.getPrototypeOf(sphere));
  }
});
