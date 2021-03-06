var fakeXMLHttpRequest = {
  open: stubFn(),
  send: stubFn(),

  setRequestHeader: function (header, value) {
    if (!this.headers) {
      this.headers = {};
    }

    this.headers[header] = value;
  },

  readyStateChange: function (readyState) {
    this.readyState = readyState;
    this.onreadystatechange();
  }
};

function forceStatusAndReadyState(xhr, status, rs) {
  var ajax = tddjs.namespace("ajax");
  var success = stubFn();
  var failure = stubFn();

  ajax.get("/url", {
    success: success,
    failure: failure
  });

  xhr.status = status;
  xhr.readyStateChange(rs);

  return {
    success: success.called,
    failure: failure.called
  };
}
