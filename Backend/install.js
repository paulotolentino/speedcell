var Service = require("node-windows").Service;

// Create a new service object
var svc = new Service({
  name: "Techbox Systems - Backend VOEC",
  description: "Server to Electron App",
  script:
    "D:\\Biblioteca\\Documents\\Dev\\github\\speedcell\\Backend\\dist\\src\\server.js",
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  svc.start();
  console.log("Installed");
});

svc.install();
