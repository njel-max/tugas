const express = require("express");
const app = express();
const server = require("http").createServer(app);
const webSocket = require("ws");

const wss = new webSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("A new client Connected!");
  ws.send("Welcome New Client!");

  ws.on("message", function incoming(message) {
    console.log("received: %s", +message);
    ws.send("Got ur msg its:", +message);
  });
});

app.get("/", (req, res) => res.send("Hello World!"))

server.listen(3000, () => console.log("Listening on port: 3000"));
