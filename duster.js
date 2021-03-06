// duster.js  
// Watch directory of dust.js templates and automatically compile them
// by Dan McGrady http://dmix.ca

var src_path = "./src/dusts"; // directory of dust templates are stored with .dust file extension
var public_path = "./public/dusts/"; // directory where the compiled .js files should be saved to

var fs = require('fs');                                                                        
var dust = require('dust');
var watcher = require('watch-tree').watchTree(src_path, {'sample-rate': 30}); // polls folder ever 30ms

watcher.on('fileModified', function(path, stats) {
  fs.readFile(path, 'ascii', function (err, data) {
    if (err) throw err;

    var filename = path.split("/").reverse()[0].replace(".dust","");
    var filepath = public_path + filename + ".js";
    var compiled = dust.compile(data, filename);

    fs.writeFile(filepath, compiled, function (err) {
      if (err) throw err;
      console.log('Saved ' + filepath);
    });
  });
});