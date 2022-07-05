//creating web-socket
const fastify = require("fastify");
const app = fastify();
app.register(require("fastify-ws"));
const WsController = require("./controller/WebConsole");

//if connected 
app.ready(err => {
  if (err) throw err;
  console.log("server started...");
  app.ws.on("connection", WsController);
});

//sending message
app.get("/", (req, res) => {
  res.send({ hello: "die" });
});

//listening on port 3000
app.listen(3002);
