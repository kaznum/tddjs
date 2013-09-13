var testCase = require("nodeunit").testCase;
var chatRoom = require("chapp/chat_room");
var all = require("node-promise/promise").all;
var Promise = require("node-promise/promise").Promise;
var stub = require("stub");

testCase(exports, "chatRoom.addMessage", {
  setUp: function () {
    this.room = Object.create(chatRoom);
  },

  "should require username": function (test) {
    var promise = this.room.addMessage(null, "message");

    promise.then(function () {}, function (err) {
      test.isNotNull(err);
      test.inherits(err, TypeError);
      test.done();
    });
  },

  "should require message": function (test) {
    var promise = this.room.addMessage("cjno", null);

    promise.then(function () {}, function (err) {
      test.isNotNull(err);
      test.inherits(err, TypeError);
      test.done();
    });
  },

  "should not require a callback": function (test) {
    test.noException(function () {
      this.room.addMessage();
      test.done();
    }.bind(this));
  },

  "should call callback with new object": function (test) {
    var txt = "Some message";

    this.room.addMessage("cjno", txt).then(function (msg) {
      test.isObject(msg);
      test.isNumber(msg.id);
      test.equals(msg.message, txt);
      test.equals(msg.user, "cjno");
      test.done();
    });
  },

  "should assign unique ids to messages": function (test) {
    var room = this.room;
    var messages = [];
    var collect = function (msg) { messages.push(msg); };

    var add = all(room.addMessage("u", "a").then(collect),
                  room.addMessage("u", "b").then(collect));

    add.then(function () {
      test.notEquals(messages[0].id, messages[1].id);
      test.done();
    });
  },

  "should be asynchronous": function (test) {
    var id;

    this.room.addMessage("cjno", "Hey").then(function (msg) {
      id = msg.id;
    });

    this.room.getMessagesSince(id - 1).then(function (msgs) {
      test.equals(msgs.length, 0);
      test.done();
    });
  },

  "should return a promise": function (test) {
    var result = this.room.addMessage("cjno", "message");
    test.isObject(result);
    test.isFunction(result.then);
    test.done();
  },

  "should emit 'message' event": function (test) {
    var message;
    this.room.addListener("message", function(m) {
      message = m;
    });

    this.room.addMessage("cjno", "msg").then(function(m) {
      test.same(m, message);
      test.done();
    });
  }
});

testCase(exports, "chatRoom.getMessagesSince", {
  setUp: function () {
    this.room = Object.create(chatRoom);
    this.user = "cjno";
  },

  "should get messages since given id": function (test) {
    var room = this.room;
    var user = this.user;
    room.addMessage(user, "msg").then(function (first) {
      room.addMessage(user, "msg2").then(function (second) {
        room.getMessagesSince(first.id).then(function (msgs) {
          test.isArray(msgs);
          test.same(msgs, [second]);
          test.done();
        });
      });
    });
  },

  "should return empty array if no message exists": function (test) {
    var room = this.room;
    room.getMessagesSince(0).then(function (msgs) {
      test.isArray(msgs);
      test.equals(msgs.length, 0);
      test.done();
    });
  },

  "should return empty array if index is over the messages' length": function (test) {
    var room = this.room;
    var user = this.user;
    room.addMessage(user, "msg").then(function (first) {
      room.addMessage(user, "msg2").then(function (second) {
        room.getMessagesSince(100).then(function (msgs) {
          test.isArray(msgs);
          test.equals(msgs.length, 0);
          test.done();
        });
      });
    });
  },

  "should not throw TypeError if callback is not function": function (test) {
    var room = this.room;
    var user = this.user;
    test.noException(function () {
      room.addMessage(user, "msg").then(function (first) {
        room.addMessage(user, "msg2").then(function (second) {
          room.getMessagesSince(first.id);
        });
      });
    });
    test.done();
  },

  "should return a promise": function (test) {
    var room = this.room;
    var user = this.user;
    room.addMessage(user, "msg").then(function (first) {
      room.addMessage(user, "msg2").then(function (second) {
        var result = room.getMessagesSince(first.id);
        test.isObject(result);
        test.isFunction(result.then);
        test.done();
      });
    });
  }
});

testCase(exports, "chatRoom", {
  "should be event emitter": function (test) {
    test.isFunction(chatRoom.addListener);
    test.isFunction(chatRoom.emit);
    test.done();
  }
});

testCase(exports, "chatRoom.waitForMessagesSince", {
  setUp: function () {
    this.room = Object.create(chatRoom);
  },

  "should yield existing messages": function (test) {
    var promise = new Promise();
    promise.resolve([{ id: 43 }]);
    this.room.getMessagesSince = stub(promise);

    this.room.waitForMessagesSince(42).then(function (m) {
      test.same([{ id: 43 }], m);
      test.done();
    });
  },

  "should add listener when no messages": function (test) {
    this.room.addListener = stub();
    var promise = new Promise();
    promise.resolve([]); // addMessageが遅延している場合は、[]が返される
    this.room.getMessagesSince = stub(promise);

    this.room.waitForMessagesSince(0);

    process.nextTick(function () {
      test.equals(this.room.addListener.args[0], "message");
      test.isFunction(this.room.addListener.args[1]);
      test.done();
    }.bind(this));
  }
});
