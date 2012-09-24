(function() {
  var xhr;
  var ajax = tddjs.namespace("ajax");
  var options = [
    function () {
      return new ActiveXObject("Microsoft.XMLHTTP");
    },

    function () {
      return new XMLHttpRequest();
    }
  ];

  for (var i = 0, l = options.length; i < l; i++) {
    try {
      xhr = options[i]();

      if (typeof xhr.readyState == "number" &&
          tddjs.isHostMethod(xhr, "open") &&
          tddjs.isHostMethod(xhr, "send") &&
          tddjs.isHostMethod(xhr, "setRequestHeader")) {
        ajax.create = options[i];
        break;
      }
    } catch (e) {}
  }
}());
(function () {
  var ajax = tddjs.namespace("ajax");

  if (!ajax.create) {
    return;
  }
  
  function get(url) {
    if (typeof url != "string") {
      throw new TypeError("URL should be string");
    }

    var transport = tddjs.ajax.create();
    transport.open("GET", url, true);
  };

  ajax.get = get;
}());
