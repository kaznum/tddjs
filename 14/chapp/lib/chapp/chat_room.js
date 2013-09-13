var Promise = require("node-promise/promise").Promise;
var id = 0;
var EventEmitter = require("events").EventEmitter;
var chatRoom = Object.create(EventEmitter.prototype);

chatRoom.addMessage = function (user, message) {
  var promise = new Promise();
  process.nextTick(function () {
    var err = null;
    if (!user) {  err = new TypeError("user is null");  }
    if (!message) { err = new TypeError("message is null");  }

    var data;

    if (!err) {
      if (!this.messages) {
        this.messages = [];
      }

      id = this.messages.length + 1;
      data = { id: id++, user: user, message: message};
      this.messages.push(data);
      this.emit("message", data);
      promise.resolve(data);
    } else {
      promise.reject(err, true);
    }
  }.bind(this));

  return promise;
};

chatRoom.getMessagesSince = function (id) {
  var promise = new Promise();

  process.nextTick(function () {
    if (!this.messages) {
      this.messages = [];
    }
    var sliced = [];
    if (this.messages.length > id) {
      sliced = this.messages.slice(id);
    }
    promise.resolve(sliced);
  }.bind(this));
  return promise;
};

chatRoom.waitForMessagesSince = function (id) {
  var promise = new Promise();

  this.getMessagesSince(id).then(function (messages) {
    if (messages.length > 0) {
      promise.resolve(messages);
    } else {
      this.addListener("message", function () {});
    }
  }.bind(this));

  return promise;
};

module.exports = chatRoom;
