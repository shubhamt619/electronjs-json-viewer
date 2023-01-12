// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs');
const glob = require("glob");


var mainWindow;

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })
  console.log('directories selected', filePaths[0])
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

async function handleReadFile(event, file) {
  console.log("In handleReadFile", file);
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);
    mainWindow.webContents.send("process-file", obj);
  });
}

async function handleListFiles(event, directory) {
  console.log("Inside handleListFiles", directory);
  let pathToScan = `${directory}\\*.json`.replace(/\\/g, '/')
  let allFiles = glob(pathToScan, {}, function (er, files) {
    console.log("Glob done", files);
    mainWindow.webContents.send("handle-all-files", files);
  })
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    show: false
  })
  mainWindow.maximize();
  mainWindow.show();

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('dialog:openFolder', handleFileOpen)
  ipcMain.handle('load-all-files', handleListFiles)
  ipcMain.handle('read-file', handleReadFile)
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.