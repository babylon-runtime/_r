const fs = require("fs");
const pkg = require("../../package.json");
const mkdirp = require("mkdirp");

pkg.scripts = {};
pkg.devDependencies = {};
pkg.main = '_r.js';

mkdirp('dist.npm');
fs.writeFileSync("dist.npm/package.json", Buffer.from(JSON.stringify(pkg, null, 2), "utf-8") );
fs.copyFileSync("README.md", "dist.npm/README.md");
fs.copyFileSync("dist/_r.js", "dist.npm/_r.js");
fs.copyFileSync("dist/_r.min.js", "dist.npm/_r.min.js");
fs.copyFileSync("dist/_r.js", "dist.npm/_r.js.map");
fs.copyFileSync("dist/_r.min.js", "dist.npm/_r.min.js");
fs.copyFileSync("dist/_r.min.js", "dist.npm/_r.min.js.map");
console.log('package ready for npmjs.com');