
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    autoHideMenuBar:true,
    resizable:false,
    
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
      
    }
  })

  mainWindow.resizable = false;
  mainWindow.loadFile('index.html')

  
  mainWindow.webContents.openDevTools()
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
