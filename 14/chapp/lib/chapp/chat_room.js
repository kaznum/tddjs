var sys = require("sys");

var chatRoom = {
  addMessage: function (user, message, callback) {
    var err = null;
    if (!user) {  err = new TypeError("user is null");  }
    if (!message) { err = new TypeError("message is null");  }

    var data;

    if (!err) {
      data = { id: 1, user: user, message: message};
    }

    if (typeof callback == "function") {
      callback(err, data);
    }
  }
};

module.exports = chatRoom;
