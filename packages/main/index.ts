import { app, BrowserWindow, shell, ipcMain, dialog } from "electron";
import fs from "fs";
import { release } from "os";
import { join } from "path";

// const server = 'https://touchboard-electron-autoupdate.vercel.app';
// const url = `${server}/update/${process.platform}/${app.getVersion()}`;

// autoUpdater.setFeedURL({ url });

// require('update-electron-app')();

import { autoUpdater } from "electron-updater";

// const server =
//   "https://github.com/thomasNGrayTv/touchboard-apps-electron/releases";
// const url = `${server}/update/${process.platform}/${app.getVersion()}`;

// autoUpdater.setFeedURL({ url });

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({
    title: "True/False Page",
    width: 1680,
    height: 900,
    webPreferences: {
      preload: join(__dirname, "../preload/index.cjs"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(join(__dirname, "../renderer/index.html"));
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;

    win.loadURL(url);
    // win.webContents.openDevTools()
  }

  // Test active push message to Renderer-process
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("did-finish-load", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.on("ready", function () {
  autoUpdater.checkForUpdatesAndNotify();
  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify();
  }, 60000);
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

//write a file based on content given
ipcMain.handle("create-a-file", async (event, content: any) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: "~/true-false-data.txt",
  });

  if (!canceled && filePath) {
    fs.writeFile(filePath, content, (err1: any) => {
      // file saved or err
      console.log(err1);
    });
  }
  console.log(filePath);
  console.log("made it!");
  return filePath;
});

// auto update
ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});

autoUpdater.on("update-available", () => {
  console.log("update available");
  win!.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
  console.log("update downloaded");
  win!.webContents.send("update_downloaded");
});

// autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
//   const dialogOpts = {
//     type: "info",
//     buttons: ["Restart", "Later"],
//     title: "Application Update",
//     message: process.platform === "win32" ? releaseNotes : releaseName,
//     detail:
//       "A new version has been downloaded. Restart the application to apply the updates.",
//   };

//   dialog
//     .showMessageBox(dialogOpts)
//     .then((returnValue) => {
//       if (returnValue.response === 0) autoUpdater.quitAndInstall();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

autoUpdater.on("error", (message) => {
  console.error("There was a problem updating the application");
  console.error(message);
});
