var http = require("http");
var url = require("url");
var crController = require("chapp/chat_room_controller");

module.exports = http.createServer(function (req, res) {
  if (url.parse(req.url).pathname == "/comet") {
    var controller = crController.create(req, res);
    controller[req.method.toLowerCase()]();
  }
});
