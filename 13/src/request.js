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
    if (options.data) {
      options.data = tddjs.util.urlParams(options.data);
      if (options.method == "GET") {
        re = new RegExp("\\?");
        if (options.url.match(re)) {
          options.url += "&"
        } else {
          options.url += "?"
        }
        options.url += options.data;
        options.data = null;
      }
    } else {
      options.data = null;
    }
  }

  function setDefaultHeader(transport, userHeaders, header, val) {
    if (!userHeaders[header]) {
        transport.setRequestHeader(header, val);
    }
  }

  function setHeaders(options) {
    var transport = options.transport;
    var headers = options.headers || {};
    tddjs.each(headers, function (header, value) {
      transport.setRequestHeader(header, value);
    });

    if (options.method == "POST" && options.data) {
      setDefaultHeader(transport, headers, "Content-Type", "application/x-www-form-urlencoded");
      setDefaultHeader(transport, headers, "Content-Length", options.data.length);
    }
    setDefaultHeader(transport, headers, "X-Requested-With", "XMLHttpRequest");
  }

  function request(url, options) {
    if (typeof url != "string") {
      throw new TypeError("URL should be string");
    }

    options = tddjs.extend({}, options);
    options.url = url;
    setData(options);

    var transport = tddjs.ajax.create();
    options.transport = transport;

    transport.open(options.method || "GET", options.url, true);

    setHeaders(options);

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
