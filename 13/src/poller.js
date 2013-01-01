(function() {
  var ajax = tddjs.namespace("ajax");

  function start() {
    if (!this.url) {
      throw new TypeError("Must specify URL to poll");
    }
    
    var poller = this;

    var interval = 1000;
    if (typeof this.interval == "number") {
      interval = this.interval;
    }

    ajax.request(this.url, {
      complete: function () {
        setTimeout(function () {
          poller.start();
        }, interval);

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
