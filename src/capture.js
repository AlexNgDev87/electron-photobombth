
const electron = require('electron')
const countdown = require('./countdown')
const video = require('./video')

const { ipcRenderer: ipc } = electron 

// we build the structure of the photo collection
function formatImgTag(doc, bytes) {
    const div = doc.createElement('div')
    div.classList.add('photo')
    const close = doc.createElement('div')
    close.classList.add('photoClose')
    const img = new Image()
    img.classList.add('photoImg')
    img.src = bytes
    div.appendChild(img)
    div.appendChild(close)
    return div
}

window.addEventListener('DOMContentLoaded', _ => {
    const videoEl = document.getElementById('video')
    const canvasEl = document.getElementById('canvas')
    const recordEl = document.getElementById('record')
    const photosEl = document.getElementById('photosContainer')
    const counterEl = document.getElementById('counter')
    
    // initialise the canvas to a 2D context
    const ctx = canvasEl.getContext('2d')

    video.init(navigator, videoEl);

    recordEl.addEventListener('click', _ => {
        countdown.start(counterEl, 3, _ => {
            const bytes = video.captureBytes(videoEl, ctx, canvasEl)

            // we wanna send an event to the main process
            ipc.send('image-captured', bytes)

            photosEl.appendChild(formatImgTag(document, bytes))
        })
    })
})