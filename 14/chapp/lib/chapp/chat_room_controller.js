var chatRoomController = {
  create: function (request, response) {
    return Object.create(this, {
      request: {value: request},
      response: {value: response}
    });
  },

  post: function () {
    var body = "";

    this.request.addListener("data", function (chunk) {
      body += chunk;
    });

    this.request.addListener("end", function () {
      var data = JSON.parse(decodeURI(body)).data;

      this.chatRoom.addMessage(data.user, data.message
                              ).then(function () {
                                this.response.writeHead(201);
                                this.response.end();
                              }.bind(this), function () {
                                this.response.writeHead(500);
                                this.response.end();
                              }.bind(this));
    }.bind(this));
  },

  get: function () {
    var id = this.request.headers["x-access-token"] || 0;
    var wait = this.chatRoom.waitForMessagesSince(id);

    wait.then(function (msgs) {
      this.respond(200, {
        message: msgs,
        token: msgs[msgs.length - 1].id
      });
    }.bind(this));
  },

  respond: function (status) {
    this.response.writeHead(201);
    this.response.end();
  }
};

module.exports = chatRoomController;
