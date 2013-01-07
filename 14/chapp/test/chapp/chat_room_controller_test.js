var testCase = require("nodeunit").testCase;
var chatRoomController = require("chapp/chat_room_controller");

testCase(exports, "chatRoomController", {
  "should be object": function (test) {
    test.isNotNull(chatRoomController);
    test.isFunction(chatRoomController.create);
    test.done();
  }
});

