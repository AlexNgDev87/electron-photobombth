
navigator.getUserMedia = navigator.webkitGetUserMedia

function handleSuccess(videoEl, stream) {
    videoEl.src = window.URL.createObjectURL(stream);
}

function handleError(error) {
    console.log('camera error ', error)
}

window.addEventListener('DOMContentLoaded', _ => {
    const videoEl = document.getElementById('video')
    const canvasEl = document.getElementById('canvas')
    const recordEl = document.getElementById('record')
    const photosEl = document.getElementById('photosContainer')
    const counterEl = document.getElementById('counter')
    
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
    
    // access the webcam video
    navigator.getUserMedia(constraints, stream => handleSuccess(videoEl, stream), handleError)
})