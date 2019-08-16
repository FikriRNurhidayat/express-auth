const fs = require('fs');
const path = require('path');
const current_dir = path.join(__dirname);

var files = fs.readdirSync(current_dir).filter(file => {
  return file.indexOf(".swp") == -1 && file.indexOf("index") == -1;
});

var exportedModule = {};

files.forEach(file => {
  let propertyName = file.split(".")[0];
  exportedModule[propertyName] = require(`./${file}`);
});

module.exports = exportedModule;
