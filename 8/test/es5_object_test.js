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
  }
});
