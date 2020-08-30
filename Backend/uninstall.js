var Service = require("node-windows").Service;
var path = require("path");

// Create a new service object
var svc = new Service({
  name: "Techbox Systems - Backend VOEC",
  description: "Server to Electron App",
  script: path.resolve(__dirname, "dist-backend", "src", "server.js"),
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("uninstall", function () {
  svc.stop();
  console.log("Uninstalled");
});

svc.uninstall();
