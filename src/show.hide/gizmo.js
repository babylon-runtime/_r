import { select } from "../select.js";
import { is } from "../is.js";
import { global } from "../global.js";
// Create utility layer the gizmo will be rendered on
var utilLayer;
function initUtilLayer() {
    if (!utilLayer) {
        utilLayer = new BABYLON.UtilityLayerRenderer(global.scene);
    }
}
function showMeshGizmo(mesh, gizmoType, axis, color) {
    var gizmo;
    gizmoType = (typeof gizmoType === 'string') ? gizmoType.toLowerCase() : gizmoType;
    axis = (typeof axis === 'string') ? axis.toLowerCase() : axis;
    hideMeshGizmo(mesh);
    switch (gizmoType) {
        case 'position':
            gizmo = new BABYLON.PositionGizmo(utilLayer);
            break;
        case 'rotation':
            gizmo = new BABYLON.RotationGizmo(utilLayer);
            break;
        case 'scale':
            gizmo = new BABYLON.ScaleGizmo(utilLayer);
            break;
        case 'boundingbox':
        default:
            gizmo = new BABYLON.BoundingBoxGizmo(color, utilLayer);
            break;
    }
    gizmo.attachedMesh = mesh;
    if (axis && gizmo.xGizmo) {
        console.info('_r : gizmo axis works only with BABYLON > 4.0.3, actual is: ' + BABYLON.Engine.Version);
        gizmo.xGizmo.isEnabled = axis.indexOf('x') !== -1;
        gizmo.yGizmo.isEnabled = axis.indexOf('y') !== -1;
        gizmo.zGizmo.isEnabled = axis.indexOf('z') !== -1;
        // Keep the gizmo fixed to world rotation
        gizmo.updateGizmoRotationToMatchAttachedMesh = false;
        gizmo.updateGizmoPositionToMatchAttachedMesh = true;
    }
    select(mesh).data('runtime-gizmo', gizmo);
    return gizmo;
}
function hideMeshGizmo(mesh) {
    var gizmo = select(mesh).data('runtime-gizmo');
    if (gizmo) {
        gizmo.dispose();
        select(mesh).data('runtime-gizmo', null);
    }
}
export function showGizmo(selector, gizmoType, axis, _color) {
    if (_color === void 0) { _color = new BABYLON.Color3(130 / 255, 230 / 255, 1); }
    var result = [];
    initUtilLayer();
    if (selector) {
        select(selector).each(function (item) {
            if (is.Mesh(item)) {
                result.push(showMeshGizmo(item, gizmoType, axis, _color));
            }
        });
    }
    else {
        global.scene.meshes.forEach(function (mesh) {
            result.push(showMeshGizmo(mesh, gizmoType, axis, _color));
        });
    }
    return result;
}
export function hideGizmo(selector) {
    if (selector) {
        select(selector).each(function (item) {
            if (is.Mesh(item)) {
                hideMeshGizmo(item);
            }
        });
    }
    else {
        global.scene.meshes.forEach(function (mesh) {
            hideMeshGizmo(mesh);
        });
    }
}
//# sourceMappingURL=gizmo.js.map