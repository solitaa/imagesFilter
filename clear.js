const fs = require('fs-extra')

const retailers = './retailers/';
const cssFileName = './file.txt';
const commentFileName = './comment.txt';
const linksFileName = './links.html';


clear(retailers);
emptyFile(cssFileName);
emptyFile(commentFileName);
emptyFile(linksFileName);

function clear(dir) {
    fs.emptyDir(dir, err => {
        if (err) return console.error('Could not empty ' + dir);
    })
}

function emptyFile(file) {
    fs.writeFile(file, '', err => {
        if (err) return console.error(err)
    })
}