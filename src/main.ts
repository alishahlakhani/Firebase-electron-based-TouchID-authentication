import { app, BrowserWindow ,ipcMain,systemPreferences} from "electron";
import { init } from "./utils/firebase";
const { setup: setupPushReceiver } = require('electron-push-receiver');
import * as path from "path";

function createWindow() {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      worldSafeExecuteJavaScript: true, contextIsolation: true
    },
    width: 800,
    // frame: false,
    // resizable: false,
    // transparent: true,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));
  
  // Initialize electron-push-receiver component. Should be called before 'did-finish-load'
  setupPushReceiver(mainWindow.webContents);

  ipcMain.on("Inform", (event, args) => {
    if (systemPreferences.canPromptTouchID()) {
      systemPreferences.promptTouchID('To get consent for a Security-Gated Thing').then(success => {
        console.log('You have successfully authenticated with Touch ID!')
        // Send result back to renderer process
        // mainWindow.webContents.send("fromMain", responseObj);
        // TODO: Post request
      }).catch(err => {
        console.log(err)
      })
    }
  });

  // // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  // Init firebase 
  // await init();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.