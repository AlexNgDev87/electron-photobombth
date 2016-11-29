
const fs = require('fs')
const path = require('path')

const logError = err => err && console.error(err)

let date = new Date();
let day = date.getDate();
let monthIndex = date.getMonth();
let year = date.getFullYear();

exports.save = (picturesPath, contents) => {
    // base64 encoded image data, 
    const base64Data = contents.replace(/^data:image\/png;base64,/, '')
    fs.writeFile(path.join(picturesPath, `${ year.toString()  + monthIndex.toString() + day.toString() }.png`), base64Data, { encoding: 'base64' }, logError)
}

exports.getPicturesDir = app => {
    // it needs the electron app, so that it can access the OS directory
    return path.join(app.getPath('pictures'), 'photobombth');
}

exports.mkdir = picturesPath => {
    fs.stat(picturesPath, (err, stats) => {
        // files was missing
        if (err && err.code != 'ENOENT')
            return logError(err)
        else if (err || !stats.isDirectory())
            fs.mkdir(picturesPath, logError)
    })
}