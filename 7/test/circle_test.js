TestCase("CircleTest", {
  "test inspect objects" : function () {
    var circ = new Circle(6);
    var circ2 = { radius: 6 };

    assertTrue(circ instanceof Object);
    assertTrue(circ instanceof Circle);
    assertTrue(circ2 instanceof Object);
    assertEquals(Circle, circ.constructor);
    assertEquals(Object, circ2.constructor);
  },
  "test should create another object of same kind": function () {
    var circle = new Circle(6);
    var circle2 = new circle.constructor(9);
    assertEquals(circle.constructor, circle2.constructor);
    assertTrue(circle2 instanceof Circle);
  },
  "test should inherit properties from Circle.prototype" : function () {
    var circle = new Circle(6);
    assertEquals(12, circle.diameter());
  },
  "test constructor is Object when prototype is overridden": function () {
    function Circle() {}
    Circle.prototype = {};
    assertEquals(Object, new Circle().constructor);
  },
  "test calling prototype without 'new' returns undefined": function () {
    assertException(function() { Circle(6);}, "Error")
  },

  "test spheres are circles in 3D": function () {
    var radius = 3;
    var sphere = new Sphere(radius);

    assertTrue(sphere instanceof Sphere);
    assertTrue(sphere instanceof Circle);
    assertTrue(sphere instanceof Object);
    assertEquals(6, sphere.diameter());
    assertEquals(36 * Math.PI,sphere.area());
    assertEquals(4 / 3 * 27 * Math.PI,sphere.volume());
  },

  "test should create circle object with function": function () {
    var circ = circle(6);
    assertEquals(6, circ.radius());

    circ.radius(12);
    assertEquals(12, circ.radius());
    assertEquals(24, circ.diameter());
  },
  "test should create sphere object with function": function () {
    var sp = sphere(6);
    assertEquals(6, sp.radius());

    sp.radius(12);
    assertEquals(12, sp.radius());
    assertEquals(4 * Math.PI * 144, sp.area());
  }
});
