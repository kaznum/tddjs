// tddjs.noop should be defined outside of the request scope;
tddjs.noop = function () {};
(function () {
  var ajax = tddjs.namespace("ajax");

  function isSuccess(transport) {
    var status = transport.status;

    return (200 <= status && status < 300 || status == 304 || (tddjs.isLocal() && !status));
  }

  function requestComplete(transport, options) {
    if (isSuccess(transport)) {
      if (typeof options.success == "function") {
        options.success(transport);
      }
    } else {
      if (typeof options.failure == "function") {
        options.failure(transport);
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
