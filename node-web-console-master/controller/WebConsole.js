const { NodeSSH } = require('node-ssh')
ssh = new NodeSSH()
const sshConfig = {
  host: "Laptop-0000",
  username: "veldora",
  privateKey: "/home/veldora/.ssh/chi  "
};

//socket functions

module.exports = async (ws, req) => {
  await ssh.connect(sshConfig);
  const shellStream = await ssh.requestShell();
  //on receiving a command
  ws.on("message", msg => {
    const data = JSON.parse(msg);
    switch (data.method) {
      case "command":
        shellStream.write(data.command.trim() + "\n");
        break;
    }
  });
  // listener 

  //shellStream.on() method gives value when command executed successfully. And it gives data only binary format so we convert into the string format.
  //shellStream.stderr.on() method called whenever an error occurred in the execution of the command. Using ws.send() we send value to client.
  shellStream.on("data", data => {
    const d = JSON.stringify({
      jsonrpc: "2.0",
      data: data.toString()
    });
    ws.send(d);
  });
  shellStream.stderr.on("data", data => {
    const d = JSON.stringify({
      jsonrpc: "1.0",
      data: data.toString()
    });
    ws.send(d);
  });
};
