var fs = require("fs");
var neudev = module.exports = new Function("neudev", "return " + fs.readFileSync(__dirname + "/neudev.js", "utf8"))();
