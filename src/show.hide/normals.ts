import { global } from "../global.js";
import { data } from "../data.js";
import { select } from "../select.js";
import { is } from "../is.js";
import { color } from "../util/color.js";

// from https://doc.babylonjs.com/snippets/normals
function showMeshNormals(mesh, size, _color) {
  hideMeshNormals(mesh);
  let normals = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
  let positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
  _color = color(_color);
  size = size || 1;

  let lines = [];
  for (var i = 0; i < normals.length; i += 3) {
    var v1 = BABYLON.Vector3.FromArray(positions, i);
    var v2 = v1.add(BABYLON.Vector3.FromArray(normals, i).scaleInPlace(size));
    lines.push([v1.add(mesh.position), v2.add(mesh.position)]);
  }
  var normalLines = BABYLON.MeshBuilder.CreateLineSystem("_r.normals." + mesh.uniqueId, {lines: lines}, global.scene);
  normalLines.color = _color;
  data(mesh, '_r.normals', normalLines);
  return normalLines;
}

function hideMeshNormals(mesh) {
  let normalLines = data(mesh, '_r.normals');
  if (normalLines) {
    normalLines.dispose();
  }
}

export function showNormals(selector? : string, size = 1, color = "red") {
  if (selector) {
    select(selector).each((item) => {
      if (is.Mesh(item)) {
        showMeshNormals(item, size, color);
      }
    });
  }
  else {
    global.scene.meshes.forEach((mesh) => {
      showMeshNormals(mesh, size, color);
    });
  }
}

export function hideNormals(selector? : string) {
  if (selector) {
    select(selector).each((item) => {
      if (is.Mesh(item)) {
        hideMeshNormals(item);
      }
    });
  }
  else {
    global.scene.meshes.forEach((mesh) => {
      hideMeshNormals(mesh);
    });
  }
}