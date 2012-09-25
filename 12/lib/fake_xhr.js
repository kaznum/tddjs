var fakeXMLHttpRequest = {
  open: stubFn(),
  send: stubFn(),

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
