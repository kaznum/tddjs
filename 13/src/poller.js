(function() {
  if (typeof tddjs == "undefined") {
    return;
  }
  var ajax = tddjs.namespace("ajax");

  if (!ajax.request || !Object.create) {
    return;
  }

  function start() {
    if (!this.url) {
      throw new TypeError("Must specify URL to poll");
    }
    
    var poller = this;

    var interval = 1000;
    if (typeof this.interval == "number") {
      interval = this.interval;
    }

    var requestStart = new Date().getTime();

    ajax.request(this.url + "?" + requestStart, {
      complete: function () {
        var elapsed = new Date().getTime() - requestStart;
        var remaining = interval - elapsed;

        setTimeout(function () {
          poller.start();
        }, Math.max(0, remaining));

        if (typeof poller.complete == "function") {
          poller.complete();
        }
      },
      headers: poller.headers,
      success: poller.success,
      failure: poller.failure
    });
  }
  ajax.poller = {
    start: start
  };
}());
