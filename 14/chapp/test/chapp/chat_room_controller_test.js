var testCase = require("nodeunit").testCase;
var chatRoomController = require("chapp/chat_room_controller");

testCase(exports, "chatRoomController", {
  "should be object": function (test) {
    test.isNotNull(chatRoomController);
    test.isFunction(chatRoomController.create);
    test.done();
  }
});

testCase(exports, "charRoomController.create", {
  "should return object with request and response": function (test) {
    var req = {};
    var res = {};
    var controller = chatRoomController.create(req, res);

    test.inherits(controller, chatRoomController);
    test.strictEqual(controller.request, req);
    test.strictEqual(controller.response, res);
    test.done();
  }
});

