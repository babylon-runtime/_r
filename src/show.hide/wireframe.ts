import { select } from "../select.js";
import { is } from "../is.js";
import { global } from "../global.js";
import { color } from "../util/color.js";

function showMeshWireframe(mesh, epsilon, width , color) {
  if (mesh.edgesRenderer == undefined) {
    mesh.enableEdgesRendering(epsilon);
    mesh.edgesColor = color;
    mesh.edgesWidth = width;
  } else {
    mesh.enableEdgesRendering(epsilon);
    mesh.edgesColor = color;
    mesh.edgesWidth = width;
    mesh.edgesRenderer.isEnabled = true;
  }
}

function hideMeshWireframe(mesh) {
  if (mesh.edgesRenderer) {
    mesh.edgesRenderer.isEnabled = false;
  }
}

export function showWireframe(selector? : string,  epsilon = 1, width = 1, _color =  new BABYLON.Color4(130 / 255, 230 / 255, 1, 0.85)) {
  if (selector) {
    select(selector).each((item) => {
      if (is.Mesh(item)) {
        showMeshWireframe(item, epsilon, width, color(_color));
      }
    });
  }
  else {
    global.scene.meshes.forEach((mesh) => {
      showMeshWireframe(mesh, epsilon, width, color(_color));
    });
  }
}

export function hideWireframe(selector? : string) {
  if (selector) {
    select(selector).each((item) => {
      if (is.Mesh(item)) {
        hideMeshWireframe(item);
      }
    });
  }
  else {
    global.scene.meshes.forEach((mesh) => {
      hideMeshWireframe(mesh);
    });
  }
}