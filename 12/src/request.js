// tddjs.noop should be defined outside of the request scope;
tddjs.noop = function () {};
(function () {
  var ajax = tddjs.namespace("ajax");

  function requestComplete(transport, options) {
    var status = transport.status;

    if (status == 200 || (tddjs.isLocal() && !status)) {
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
        transport.onreadystatechange = tddjs.noop;
      }
    };
    transport.send(null);
  };

  ajax.get = get;
}());
