function stubFn(returnValue) {
  var fn = function () {
    fn.called = true;
    fn.args = arguments;
    return returnValue;
  }

  fn.called = false;

  return fn;
}

(function (global) {
  var NativeDate = global.Date;
  global.stubDateConstructor = function (fakeDate) {
    global.Date = function () {
      global.Date = NativeDate;
      return fakeDate;
    };
  };
}(this));
