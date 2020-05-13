const fs = require("fs");
const pkg = require("../../package.json");
const mkdirp = require("mkdirp");

pkg.scripts = {};
pkg.devDependencies = {};
pkg.main = '_r.js';
pkg.types = '_r.d.ts';
pkg.module = "dist/_r.es6.js";

mkdirp('dist.npm');
fs.writeFileSync("dist.npm/package.json", Buffer.from(JSON.stringify(pkg, null, 2), "utf-8") );
fs.copyFileSync("README.md", "dist.npm/README.md");
fs.copyFileSync("dist/_r.js", "dist.npm/_r.js");
fs.copyFileSync("dist/_r.js.map", "dist.npm/_r.js.map");
fs.copyFileSync("dist/_r.es6.js", "dist.npm/_r.es6.js");
fs.copyFileSync("dist/_r.es6.js.map", "dist.npm/_r.min.js.map");
fs.copyFileSync("dist/_r.min.js", "dist.npm/_r.min.js");
fs.copyFileSync("dist/_r.min.js.map", "dist.npm/_r.min.js.map");
fs.copyFileSync("dist/_r.d.ts", "dist.npm/_r.d.ts");
console.log('package ready for npmjs.com');