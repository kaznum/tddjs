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
  },

  complete: function (status, responseText) {
    this.status = status || 200;
    this.responseText = responseText;
    this.readyStateChange(4);
  }
};

function forceStatusAndReadyState(xhr, status, rs) {
  var ajax = tddjs.namespace("ajax");
  var success = stubFn();
  var failure = stubFn();
  var complete = stubFn();

  ajax.get("/url", {
    success: success,
    failure: failure,
    complete: complete
  });

  xhr.status = status;
  xhr.readyStateChange(rs);

  return {
    success: success.called,
    failure: failure.called,
    complete: complete.called
  };
}
