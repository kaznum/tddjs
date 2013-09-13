var testCase = require("nodeunit").testCase;
var chatRoomController = require("chapp/chat_room_controller");
var Promise = require("node-promise/promise").Promise;

var EventEmitter = require("events").EventEmitter;
var stub = require("stub");

function controllerSetUp() {
  var req = this.req = new EventEmitter();
  var res = this.res = {
    writeHead: stub(),
    end: stub()
  };
  var promise = this.addMessagePromise = new Promise();

  this.controller = chatRoomController.create(req, res);
  this.controller.chatRoom = { addMessage: stub(promise) };
  this.jsonParse = JSON.parse;
  this.sendRequest = function (data) {
    var str = encodeURI(JSON.stringify(data));
    this.req.emit("data", str.substring(0, str.length / 2));
    this.req.emit("data", str.substring(str.length / 2));
    this.req.emit("end");
  };
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

    JSON.parse = stub(data);
    this.controller.post();
    this.sendRequest(data);
    test.equals(JSON.parse.args[0], JSON.stringify(data));
    test.done();
  },

  "should add message from request body" : function (test) {
    var data = {data: {user: "cjno", message: "hi" }};
    this.controller.post();
    this.sendRequest(data);

    test.ok(this.controller.chatRoom.addMessage.called);
    var args = this.controller.chatRoom.addMessage.args;
    test.equals(args[0], data.data.user);
    test.equals(args[1], data.data.message);
    test.done();
  },

  "should write status header when addMessage resolves": function (test) {
    var data = { data: {user: "cjno", message: "hi" } };

    this.controller.post();
    this.sendRequest(data);
    this.addMessagePromise.resolve({});

    process.nextTick(function () {
      test.ok(this.res.writeHead.called);
      test.equals(this.res.writeHead.args[0], 201);
      test.done();
    }.bind(this));
  },

  "should close connection when addMessage resolved" : function (test) {
    var data = { data: {user: "cjno", message: "hi" }};

    this.controller.post();
    this.sendRequest(data);
    this.addMessagePromise.resolve({});

    process.nextTick(function () {
      test.ok(this.res.end.called);
      test.done();
    }.bind(this));
  },

  "should not respond immediately": function (test) {
    this.controller.post();
    this.sendRequest({ data: {} });

    test.ok(!this.res.end.called);
    test.done();
  }
});
