const { app, BrowserWindow, Menu, Tray } = require("electron");

const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

let mainWindow;
let tray = null;

const singleInstanceLock = app.requestSingleInstanceLock();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1016,
    height: 705,
    frame: false,
    resizable: false,
    icon: isDev ? "public/icon.ico" : "icon.ico",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  Menu.setApplicationMenu(null);

  mainWindow.on("close", (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }

    return false;
  });

  if (isDev) mainWindow.webContents.openDevTools();
}

function createSystemTray() {
  tray = new Tray(isDev ? "public/tray.ico" : "tray.ico");
  var contextMenu = Menu.buildFromTemplate([
    {
      label: "Abrir TBAT",
      click: () => {
        mainWindow.show();
      },
    },
  ]);
  tray.setToolTip("TBAT");
  tray.setContextMenu(contextMenu);

  tray.on("double-click", () => {
    mainWindow.show();
  });
}

if (!singleInstanceLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // Create myWindow, load the rest of the app, etc...
  app.on("ready", () => {
    createWindow();
    createSystemTray();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (mainWindow === null) {
      createWindow();
      createSystemTray();
    }
  });
}
