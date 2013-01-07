var sys = require("sys");

var chatRoom = {
  addMessage: function (user, message, callback) {
    if (!user) {
      callback(new TypeError("user is null"));
    }

    if (!message) {
      callback(new TypeError("message is null"));
    }

    //sys.puts(user + ": " + message);
  }
};

module.exports = chatRoom;
