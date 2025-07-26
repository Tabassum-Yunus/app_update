const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

log.transports.file.resolvePathFn = () => path.join(__dirname, "logs/main.log");

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  win.loadFile("index.html");
};

app.on("ready", () => {
  createWindow(), autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on("checking-for-update", () => {
  log.info("Checking for updates...");
});

autoUpdater.on("update-not-available", () => {
  log.info("App is up to date. No update available...");
});

autoUpdater.on("update-available", () => {
  log.info("Update available...");
});

autoUpdater.on("download-progress", () => {
  log.info("Download is in progress...");
});

autoUpdater.on("update-downloaded", () => {
  log.info("Update downloaded...");
});
