var Promise = require("node-promise/promise").Promise;
var id = 0;

var chatRoom = {
  addMessage: function (user, message, callback) {
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
      }

      if (typeof callback == "function") {
        callback(err, data);
      }

      if (err) {
        promise.reject(err, true);
      }
    }.bind(this));

    return promise;
  },

  getMessagesSince: function (id, callback) {
    process.nextTick(function () {
      if (typeof callback != "function") {
        return;
      }

      if (!this.messages) {
        this.messages = [];
      }

      var sliced = [];
      if (this.messages.length > id) {
        sliced = this.messages.slice(id);
      }

      callback(null, sliced);
    }.bind(this));
  }
};

module.exports = chatRoom;
