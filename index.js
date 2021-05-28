const fs = require('fs-extra')
const isImage = require('is-image');


const bannerFolderDir = './assets/banner/';
const panelFolderDir = './assets/panel/';
const dist = './dist/';
const cssFileName = './file.txt';
const commentFileName = './comment.txt';
const linksFileName = './links.html';


start();

function start() {
  reset();
  create(bannerFolderDir, true);
  create(panelFolderDir, false);
}



function reset() {
  clear(dist);
  emptyFile(cssFileName);
  emptyFile(commentFileName);
  emptyFile(linksFileName);
}

function createCss(cssFile, folderName, fileName) {
  fs.appendFileSync(cssFile, 
  "." + folderName + " #logo {\n" 
  + "  background-image: url('./images/retailers/" + folderName + "/" + fileName + "');\n" 
  + "}\n");
}

function createLinks(linksFile, folderName, demoLink) {
  fs.appendFileSync(linksFile, 
  "<div>\n"
  + "\t<a href='" + demoLink + folderName + "'>" + demoLink + folderName + "</a>\n" 
  + "</div>\n");
}

function createComment(commentFile, folderName) {
  fs.appendFileSync(commentFile, folderName + " | ");
}

function emptyFile(file) {
  fs.writeFile(file, '');
}

function create(dir, shouldCreateFolder){

  fs.readdirSync(dir, {withFileTypes: true})
  .map(item => {
    if (isImage(item.name)) {
      let folderName = createFolderName(item.name);

      if (folderName) {
        if (shouldCreateFolder) {
          fs.ensureDirSync(dist + folderName);
          createComment(commentFileName, folderName);
        }

        copyFile(dir + item.name, dist + folderName + '/' + item.name );
        createCss(cssFileName, folderName, item.name);
        createLinks(linksFileName, folderName, 'https://ad.vrvm.com/creative/custom/sproutloud/ENT-1009/expandable-ttm/demo-phone.html?variant=')
      }
      else {
        console.log("Wrong filename --- " + item.name);
      }
    }
  });
}





function copyFile(oldPath, newPath) {
  fs.copyFile(oldPath, newPath, err => {
    if (err) return console.error('Could not copy file -- ' + oldPath)
  });
}

function clear(dir) {
  fs.emptyDir(dir, err => {
    if (err) return console.error('Could not empty ' + dir)
  })
}

function createFolderName(name) {
  // name = name.match(/\_[0-9]?[A-Za-z\_]+/);
  name = name.match(/\_[A-Za-z\_]+/);
  if (name) {
    let folderName = name[0].replace(/_/g, "").toLowerCase();
    return folderName;
  }
  return;
}