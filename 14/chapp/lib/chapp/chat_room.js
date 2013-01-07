var sys = require("sys");

var chatRoom = {
  addMessage: function (user, message) {
    sys.puts(user + ": " + message);
  }
};

module.exports = chatRoom;
