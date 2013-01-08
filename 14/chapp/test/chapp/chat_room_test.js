var testCase = require("nodeunit").testCase;
var chatRoom = require("chapp/chat_room");

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
    var user = "cjno";

    this.room.addMessage(user, "a").then( function (msg1) {
      this.room.addMessage(user, "b").then( function (msg2) {
        test.notEquals(msg1.id, msg2.id);
        test.done();
      });
    }.bind(this));
  },

  "should be asynchronous": function (test) {
    var id;

    this.room.addMessage("cjno", "Hey").then(function (msg) {
      id = msg.id;
    });

    this.room.getMessagesSince(id - 1, function (err, msgs) {
      test.equals(msgs.length, 0);
      test.done();
    });
  },

  "should return a promise": function (test) {
    var result = this.room.addMessage("cjno", "message");
    test.isObject(result);
    test.isFunction(result.then);
    test.done();
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
        room.getMessagesSince(first.id, function (e, msgs) {
          test.isArray(msgs);
          test.same(msgs, [second]);
          test.done();
        });
      });
    });
  },

  "should return empty array if no message exists": function (test) {
    var room = this.room;
    room.getMessagesSince(0, function (e, msgs) {
      test.isArray(msgs);
      test.equals(msgs.length, 0);
      test.done();
    });
  },

  "should return empty array if index is over the messages' length": function (test) {
    var room = this.room;
    var user = this.user;
    room.addMessage(user, "msg", function (e, first) {
      room.addMessage(user, "msg2").then(function (second) {
        room.getMessagesSince(100, function (e, msgs) {
          test.isArray(msgs);
          test.equals(msgs.length, 0);
          test.done();
        });
      });
    });
  },

  "should throw TypeError if callback is not function": function (test) {
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
  }

});
