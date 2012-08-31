function Circle(radius) {
  if (!(this instanceof Circle)) {
    throw new Error();
  }
  this.radius = radius;
}

(function (p) {
  p.diameter = function () {
    return this.radius * 2;
  };

  p.circumference = function () {
    return this.diameter() * Math.PI;
  };

  p.area = function () {
    return this.radius * this.radius * Math.PI;
  };
}(Circle.prototype));


function Sphere(radius) {
  Circle.call(this, radius);
}

Sphere.inherit(Circle);

//(基本)  new で生成されたオブジェクトの[[Prototype]]には、コンストラクタのprototypeへの参照が設定される
// new Sphere(6)で生成されたオブジェクトの[[Prototype]] == Sphere.prototype(Fのオブジェクト)
// (ちなみに、コンストラクタの[[Prototype]] == Function.prototype)
// Fのオブジェクト.[[Prototype]] == Circle.prototypeへの参照が設定される
// Circleのprototype.[[Prototype]] == Object.prototype
(function(p) {
  p.area = function () {
    return 4 * this._super.area.call(this);
  }

  p.volume = function () {
    return 4/3 * Math.PI * this.radius * this.radius * this.radius;
  }
}(Sphere.prototype));

function circle(radius) {
  function getSetRadius() {
    if (arguments.length > 0) {
      if (arguments[0] < 0) {
	throw new TypeError("Radius should be >= 0");
      }
      radius = arguments[0];
    }
    return radius;
  }

  function diameter() {
    return radius * 2;
  }

  function area () {
    return radius * radius * Math.PI;
  }
  function circumference() {
    return diameter() * Math.PI;
  }

  return {
    radius: getSetRadius,
    area: area,
    diameter: diameter,
    circumference: circumference
  }
}

function sphere(radius) {
  var sphereObj = circle(radius);
  var circleArea = sphereObj.area;

  function area() {
    return 4 * circleArea.call(this);
  }

  sphereObj.area = area

  return sphereObj;
}
