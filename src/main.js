
let electron = require('electron')

let { app, BrowserWindow } = electron

let mainWindow = null

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 900,
        resizable: false
    })
    
    mainWindow.loadURL(`file://${__dirname}/capture.html`)
    
    mainWindow.openDevTools()
})

app.on('closed', _ => {
    mainWindow = null
})