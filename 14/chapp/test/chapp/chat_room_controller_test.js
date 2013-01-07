var testCase = require("nodeunit").testCase;
var chatRoomController = require("chapp/chat_room_controller");

var EventEmitter = require("events").EventEmitter;
var stub = require("stub");

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

testCase(exports, "chatRoomController.post", {
  setUp: function () {
    this.jsonParse = JSON.parse;
  },

  tearDown: function () {
    JSON.parse = this.jsonParse;
  },

  "should parse request body as JSON" : function (test) {
    var req = new EventEmitter();
    var controller = chatRoomController.create(req, {});
    var data = { data: { user: "cjno", message: "hi" }};
    var stringData = JSON.stringify(data);
    var str = encodeURI(stringData);

    JSON.parse = stub(data);
    controller.post();
    req.emit("data", str.substring(0, str.length / 2));
    req.emit("data", str.substring(str.length / 2));
    req.emit("end");
    test.equals(JSON.parse.args[0], stringData);
    test.done();
  }
});
