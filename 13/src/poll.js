(function () {
  var ajax = tddjs.namespace("ajax");
  function poll(url, options) {
    var poller = Object.create(ajax.poller);
    poller.url = url;
    options = options || {};
    poller.headers = options.headers;
    poller.success = options.success;
    poller.failure = options.failure;
    poller.complete = options.complete;
    poller.interval = options.interval;
    poller.start();

    return poller;
  }

  ajax.poll = poll;
}());
