
const { app, BrowserWindow,screen } = require('electron')
const path = require('path')



function createWindow () {
  const {width, height} = screen.getPrimaryDisplay().workAreaSize
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    autoHideMenuBar:true,
    resizable:false,
    
    //fullscreen:true,
    
    webPreferences: {
      
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
      
    }
  })

  mainWindow.maximize();
  
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
