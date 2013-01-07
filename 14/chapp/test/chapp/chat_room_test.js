var testCase = require("nodeunit").testCase;
var chatRoom = require("chapp/chat_room");

testCase(exports, "chatRoom.addMessage", {
  setUp: function () {
    this.room = Object.create(chatRoom);
  },

  "should require username": function (test) {
    this.room.addMessage(null, "a message", function (err) {
      test.isNotNull(err);
      test.inherits(err, TypeError);
      test.done();
    });
  },

  "should require message": function (test) {
    this.room.addMessage("cjno", null, function (err) {
      test.isNotNull(err);
      test.inherits(err, TypeError);
      test.done();
    });
  }
});
