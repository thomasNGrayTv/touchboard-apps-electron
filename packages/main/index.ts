import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  dialog,
  desktopCapturer,
} from "electron";
import fs from "fs";
import { release } from "os";
import { join } from "path";
import { autoUpdater } from "electron-updater";
import log from "electron-log";

import { v4 as uuidv4 } from "uuid";
import screenshot from "screenshot-desktop";

var socket = require("socket.io-client")("http://192.168.1.119:5000");
var interval: NodeJS.Timer;

log.transports.file.level = "info";
log.transports.console.format = "{h}:{i}:{s} {text}";

autoUpdater.logger = log;

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
    title: "Touchscreen Apps",
    autoHideMenuBar: true,
    width: 1680,
    height: 900,
    webPreferences: {
      preload: join(__dirname, "../preload/index.cjs"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    win.removeMenu();
    win.loadFile(join(__dirname, "../renderer/index.html"));
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;

    win.loadURL(url);
    // win.webContents.openDevTools()
  }

  // Test active push message to Renderer-process
  win.webContents.on("did-finish-load", () => {
    console.log("checked for updates");
    autoUpdater.checkForUpdatesAndNotify();
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

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

autoUpdater.on("error", (message) => {
  console.error("There was a problem updating the application");
  console.error(message);
});

//start screen share
ipcMain.on("start-share", (event, arg) => {
  //generate random string id
  var uuid = uuidv4();
  //socket connects to our backend and calls 'join-message' method there
  socket.emit("join-message", uuid);
  //send uuid to the frontend
  event.reply("uuid", uuid);

  // desktopCapturer
  //   .getSources({
  //     types: ["window", "screen"],
  //     thumbnailSize: { width: 1920, height: 1080 },
  //   })
  //   .then(async (sources) => {
  //     for (const source of sources) {
  //       if (source.name === "Touchboard Apps") {
  //         try {
  //           const mediaDevices = navigator.mediaDevices as any;
  //           const stream = await mediaDevices.getUserMedia({
  //             audio: true,
  //             video: {
  //               mandatory: {
  //                 chromeMediaSource: "desktop",
  //                 chromeMediaSourceId: source.id,
  //                 minWidth: 1280,
  //                 maxWidth: 1280,
  //                 minHeight: 720,
  //                 maxHeight: 720,
  //               },
  //             },
  //           });

  //           var obj = {
  //             room: uuid,
  //             image: stream,
  //           };

  //           socket.emit("screen-data", JSON.stringify(obj));
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       }
  //     }
  //   });

  //take continuous screen shot
  interval = setInterval(() => {
    desktopCapturer
      .getSources({
        types: ["window", "screen"],
        thumbnailSize: { width: 1920, height: 1080 },
      })
      .then(async (sources) => {
        for (const source of sources) {
          if (source.name === "Touchboard Apps") {
          }
        }

        let imgStr = sources[0].thumbnail.toDataURL();
        var obj = {
          room: uuid,
          image: imgStr,
        };

        socket.emit("screen-data", JSON.stringify(obj));
      });

    desktopCapturer
      .getSources({
        types: ["window", "screen"],
        thumbnailSize: { width: 1920, height: 1080 },
      })
      .then((sources) => {
        let imgStr = sources[0].thumbnail.toDataURL();
        var obj = {
          room: uuid,
          image: imgStr,
        };

        socket.emit("screen-data", JSON.stringify(obj));
      });

    // screenshot().then((img) => {
    //   //broadcast to all other users
    //   var imgStr = Buffer.from(img).toString("base64");

    //   var obj = {
    //     room: uuid,
    //     image: imgStr,
    //   };

    //   socket.emit("screen-data", JSON.stringify(obj));
    // });
  }, 100);
});

//stop screen share
ipcMain.on("stop-share", (event, arg) => {
  //stop broadcasting & screenshot capturing
  clearInterval(interval);
});
