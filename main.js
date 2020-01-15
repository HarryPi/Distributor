/*
* Not to be confused with angular main
* This is the main entry point for electron
* That will utilize angular output
* */

const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

/***
 * @type Electron.BrowserWindow
 * The main window screen
 */
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '/dist/Distributor/index.html'),
      protocol: 'file',
      slashes: true
    })
  );
// Open development tools
  mainWindow.webContents.openDevTools();

// On close window event
  mainWindow.on('closed', () => {
    mainWindow = null; // Destroy main window
  });
};
// On electron ready
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) createWindow()
});
