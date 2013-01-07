var testCase = require("nodeunit").testCase;
var chatRoomController = require("chapp/chat_room_controller");

var EventEmitter = require("events").EventEmitter;
var stub = require("stub");

function controllerSetUp() {
  var req = this.req = new EventEmitter();
  var res = this.res = {};
  this.controller = chatRoomController.create(req, res);
  this.jsonParse = JSON.parse;
}

function controllerTearDown() {
  JSON.parse = this.jsonParse;
}

testCase(exports, "chatRoomController", {
  "should be object": function (test) {
    test.isNotNull(chatRoomController);
    test.isFunction(chatRoomController.create);
    test.done();
  }
});

testCase(exports, "charRoomController.create", {
  setUp: controllerSetUp,

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
  setUp: controllerSetUp,
  tearDown: controllerTearDown,

  "should parse request body as JSON" : function (test) {
    var data = { data: { user: "cjno", message: "hi" }};
    var stringData = JSON.stringify(data);
    var str = encodeURI(stringData);

    JSON.parse = stub(data);
    this.controller.post();
    this.req.emit("data", str.substring(0, str.length / 2));
    this.req.emit("data", str.substring(str.length / 2));
    this.req.emit("end");
    test.equals(JSON.parse.args[0], stringData);
    test.done();
  }
});
