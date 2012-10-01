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

  function setData(options) {
    if (options.method == "POST") {
      options.data = tddjs.util.urlParams(options.data);
    } else {
      options.data =null;
    }
  }

  function request(url, options) {
    if (typeof url != "string") {
      throw new TypeError("URL should be string");
    }

    options = tddjs.extend({}, options);
    setData(options);

    var transport = tddjs.ajax.create();

    transport.open(options.method || "GET", url, true);
    transport.onreadystatechange = function () {
      if (transport.readyState == 4) {
        requestComplete(transport, options);
        transport.onreadystatechange = tddjs.noop;
      }
    };
    transport.send(options.data);
  }

  ajax.request = request;

  function get(url, options) {
    options = tddjs.extend({}, options);
    options.method = "GET";
    ajax.request(url, options);
  };

  ajax.get = get;

  function post(url, options) {
    options = tddjs.extend({}, options);
    options.method = "POST";
    ajax.request(url, options);
  }

  ajax.post = post;
}());
