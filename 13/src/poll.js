(function () {
  var ajax = tddjs.namespace("ajax");
  function poll(url, options) {
    var poller = Object.create(ajax.poller);
    poller.url = url;
    options = options || {};
    poller.headers = options.headers;
    
    poller.start();

    return poller;
  }

  ajax.poll = poll;
}());
