var sys = require("sys");

var chatRoom = {
  addMessage: function (user, message, callback) {
    var err = null;
    if (!user) {  err = new TypeError("user is null");  }
    if (!message) { err = new TypeError("message is null");  }
    if (typeof callback == "function") {
      callback(err);
    }
    //sys.puts(user + ": " + message);
  }
};

module.exports = chatRoom;
