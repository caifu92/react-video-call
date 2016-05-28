var path = require("path");

var express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	io = require("socket.io"),
	uuid = require("node-uuid");

var userIds = {};

app.use("/", express.static(process.cwd() + "/../client"));

module.exports.run = function (config) {
	server.listen(config.PORT);
	console.log("Server is listening at :" + config.PORT);
	io.listen(server, { log: true })
		.on("connection", initSocket);
};

/**
 * Initialize when a connection is made
 * @param {SocketIO.Socket} socket
 */
function initSocket(socket) {
	var id;
	socket.on("init", (data, fn) => {
		id = uuid.v4().substr(0, 13);
		userIds[id] = socket;
		socket.emit("init", { id: id });
	}).on("call", data => {
		data["from"] = id;
		var to = userIds[data.to];
		if (to) to.emit("call", data);
		else socket.emit("call", { failed: true });
	}).on("end", data => {
		data["from"] = id;
		var to = userIds[data.to];
		if (to) to.emit("end");
	}).on("disconnect", () => {
		delete userIds[id];
		console.log(id, "disconnected");
	});

	return socket;
}