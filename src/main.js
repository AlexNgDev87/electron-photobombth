
let electron = require('electron')

let images = require('./images')

let { app, BrowserWindow, ipcMain: ipc } = electron

let mainWindow = null

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 900,
        resizable: false
    })
    
    mainWindow.loadURL(`file://${__dirname}/capture.html`)
    
    mainWindow.openDevTools()

    images.mkdir(images.getPicturesDir(app))

    app.on('closed', _ => {
        mainWindow = null
    })
})

ipc.on('image-captured', (evt, contents) => {
    images.save(images.getPicturesDir(app), contents)
})

