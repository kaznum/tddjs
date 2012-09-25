(function () {
  var ajax = tddjs.namespace("ajax");

  function requestComplete(transport, options) {
    if (transport.status == 200) {
      if (typeof options.success == "function") {
        options.success(transport);
      }
    }
  }

  if (!ajax.create) {
    return;
  }

  function get(url, options) {
    if (typeof url != "string") {
      throw new TypeError("URL should be string");
    }

    options = options || {};
    var transport = tddjs.ajax.create();

    transport.open("GET", url, true);
    transport.onreadystatechange = function () {
      if (transport.readyState == 4) {
        requestComplete(transport, options);
      }
    };
    transport.send(null);
  };

  ajax.get = get;
}());
