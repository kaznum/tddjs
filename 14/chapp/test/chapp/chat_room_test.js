var testCase = require("nodeunit").testCase;
var chatRoom = require("chapp/chat_room");

testCase(exports, "chatRoom.addMessage", {
  "should require username": function (test) {
    var room = Object.create(chatRoom);

    room.addMessage(null, "a message", function (err) {
      test.isNotNull(err);
      test.inherits(err, TypeError);
      test.done();
    });
  },

  "should require message": function (test) {
    var room = Object.create(chatRoom);

    room.addMessage("cjno", null, function (err) {
      test.isNotNull(err);
      test.inherits(err, TypeError);
      test.done();
    });
  }
});
