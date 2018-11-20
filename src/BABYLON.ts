// this will let us :
// - have autocompletion in IDE (PHPStorm here)
// - test easily with import * from index.js
// ...but it's not including in bundle by rollup.

import * as BABYLON from "../node_modules/babylonjs/es6.js";
export {BABYLON};
