var sys = require("sys");

var chatRoom = {
  addMessage: function (user, message, callback) {
    if (!user) {
      callback(new TypeError("user is null"));
    } else {
      sys.puts(user + ": " + message);
    }
  }
};

module.exports = chatRoom;
