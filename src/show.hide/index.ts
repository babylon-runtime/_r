import { showNormals, hideNormals } from "./normals.js";
import { showWireframe, hideWireframe } from "./wireframe.js";

export function show(params : string, selector? : string) {
  let split = params.split(',');
  split.forEach((param) => {
    switch (param.trim()) {
      case "normals" :
        showNormals(selector);
        break;
      case "wireframe":
        showWireframe(selector);
        break;
      default:
        console.error(param + " is not supported by _r.show");
    }
  });
}

export function hide(params : string, selector? : string) {
  let split = params.split(',');
  split.forEach((param) => {
    switch (param.trim()) {
      case "normals" :
        hideNormals(selector);
        break;
      case "wireframe":
        hideWireframe(selector);
        break;
      default :
        console.error(param + " is not supported by _r.hide");
    }
  });
}

export namespace show {
  export let normals = showNormals;
  export let wireframe = showWireframe;
}

export namespace hide{
  export let normals = hideNormals;
  export let wireframe = hideWireframe;
}