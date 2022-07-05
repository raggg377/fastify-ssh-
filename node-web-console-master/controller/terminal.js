const {NodeSSH} = require('node-ssh')
ssh = new NodeSSH()  //creating instance of ssh
const sshConfig = {   //config 
  host: "Laptop-0000",
  username: "veldora",
  privateKey: "/home/veldora/.ssh/chi "
};

//creating terminal
async function myVeryCoolAsyncFunction() {
  await ssh.connect(sshConfig);
  const defaultDirectory = await ssh.exec("pwd", [], { stream: "stdout" });
  const shellStream = await ssh.requestShell();

  const stdin = process.openStdin();
  stdin.addListener("data", data => {
    shellStream.write("ls" + "\n");
  });
  shellStream.on("data", data => {
    process.stdout.write(data);
  });
  shellStream.stderr.on("data", data => {
    process.stdout.write(data);
  });
}
myVeryCoolAsyncFunction()
  .then(function() {
    console.log("all done");
  })
  .catch(function(error) {
    console.log("encountered an error", error);
  });
