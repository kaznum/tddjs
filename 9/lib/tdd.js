/*jslint indent: 2, onevar: false, plusplus: false, eqeqeq: false, nomen: false*/
var tddjs = (function () {
  function namespace(string) {
    var object = this;
    var levels = string.split(".");

    for (var i = 0, l = levels.length; i < l; i++) {
      if (typeof object[levels[i]] == "undefined") {
        object[levels[i]] = {};
      }

      object = object[levels[i]];
    }

    return object;
  }

  return {
    namespace: namespace
  };
}());

(function () {
  var id = 0;

  function uid(object) {
    if (typeof object.__uid != "number") {
      object.__uid = id++;
    }

    return object.__uid;
  }

  if (typeof tddjs == "object") {
    tddjs.uid = uid;
  }
}());

(function () {
  function iterator(collection) {
    var index = 0;
    var length = collection.length;

    function next() {
      var item = collection[index++];
      next.hasNext = index < length;

      return item;
    }

    next.hasNext = index < length;

    return next;
  }

  if (typeof tddjs == "object") {
    tddjs.iterator = iterator;
  }
}());

tddjs.isOwnProperty = (function () {
  var hasOwn = Object.prototype.hasOwnProperty;
  if (typeof hasOwn == "function") {
    return function (object, property) {
      return hasOwn.call(object, property);
    };
  } else {
    // Provide an emulation if you can live with possibly inaccurate results
    throw new TypeError("hasOwnProperty is not a function");
  }
}());

tddjs.each = (function () {
  function unEnumerated(object, properties) {
    var length = properties.length;

    // initialize
    for (var i = 0; i < length; i++) {
      object[properties[i]] = true;
    }

    var enumerated = length;
    for (var prop in object) {
      if (tddjs.isOwnProperty(object, prop)) {
	enumerated--;
	object[prop] = false;
      }
    }

    if (!enumerated) {
      return;
    }

    var needsFix = [];

    for(i = 0; i < length; i++) {
      if(object[properties[i]]) {
	needsFix.push(properties[i]);
      }
    }

    return needsFix;
  }

  var oFixes = unEnumerated({}, ["toString", "toLocaleString",
				 "valueOf", "hasOwnProperty",
				 "isPrototypeOf", "constructor",
				 "propertyIsEnumerable"]);
  var fFixes = unEnumerated(function () {}, ["call", "apply", "prototype"]);
  if (fFixes && oFixes) {
    fFixes = oFixes.concat(fFixes);
  }

  var needsFix = { "object": oFixes, "function": fFixes };

  return function (object, callback) {
    if (typeof callback != "function") {
      throw new TypeError("callback is not a function");
    }

    for (var prop in object) {
      if (tddjs.isOwnProperty(object, prop)) {
	callback(prop, object[prop]);
      }
    }

    var fixes = needsFix[typeof object];
    if (fixes) {
      var property;
      for(var i = 0, l = fixes.length; i < l; i++) {
	property = fixes[i];

	if (tddjs.isOwnProperty(object, property)) {
	  callback(property, object[property]);
	}
      }
    }
  };
}());

tddjs.extend = (function () {
  function extend(target, source)  {
    target = target || {};
    if (!source) {
      return target;
    }
    tddjs.each(source, function (prop, val) {
      target[prop] = val;
    });

    return target;
  }

  return extend;
}());

(function () {
  var dom = tddjs.namespace("dom");

  function addClassName(element, cName) {
    var regexp = new RegExp("(^|\\s)" + cName + "(\\s|$)");

    if (element && !regexp.test(element.className)) {
      cName = element.className + " " + cName;
      element.className = cName.replace(/^\s+|\+s$/g, "");
    }
  }

  function removeClassName(element, cName) {
    var r = new RegExp("(^|\\s)" + cName + "(\\s|$)");

    if (element) {
      cName = element.className.replace(r, " ");
      element.className = cName.replace(/^\s+|\s+$/g, "");
    }
  }

  dom.addClassName = addClassName;
  dom.removeClassName = removeClassName;
}());

