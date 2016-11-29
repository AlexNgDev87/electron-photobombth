
// describes what media devices we're trying to capture
const constraints = {
    audio: false,
    video: {
        mandatory: {
            minWidth: 853,
            minHeight: 480,
            maxWidth: 853,
            maxHeight: 480
        }
    }
}

function handleSuccess(videoEl, stream) {
    videoEl.src = window.URL.createObjectURL(stream);
}

function handleError(error) {
    console.log('camera error ', error)
}

exports.init = (nav, videoEl) => {
    // access the webcam video using the browser navigator media webkit
    nav.getUserMedia = nav.webkitGetUserMedia
    nav.getUserMedia(constraints, stream => handleSuccess(videoEl, stream), handleError)
}

exports.captureBytes = (videoEl, ctx, canvasEl) => {
    // we get the video frame and draw it into the canvas context
    ctx.drawImage(videoEl, 0, 0)

    return ctx.canvas.toDataURL('image/png') // return the drawed context as png
}