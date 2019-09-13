import { showNormals, hideNormals } from "./normals.js";
import { showWireframe, hideWireframe } from "./wireframe.js";
import { showGizmo, hideGizmo } from "./gizmo.js";
export function show(params, selector) {
    var split = params.split(',');
    split.forEach(function (param) {
        switch (param.trim()) {
            case "normals":
                showNormals(selector);
                break;
            case "wireframe":
                showWireframe(selector);
                break;
            case "gizmo":
                showGizmo(selector);
                break;
            default:
                console.error(param + " is not supported by _r.show");
        }
    });
}
export function hide(params, selector) {
    var split = params.split(',');
    split.forEach(function (param) {
        switch (param.trim()) {
            case "normals":
                hideNormals(selector);
                break;
            case "wireframe":
                hideWireframe(selector);
                break;
            case "gizmo":
                hideGizmo(selector);
                break;
            default:
                console.error(param + " is not supported by _r.hide");
        }
    });
}
(function (show) {
    show.normals = showNormals;
    show.wireframe = showWireframe;
    show.gizmo = showGizmo;
})(show || (show = {}));
(function (hide) {
    hide.normals = hideNormals;
    hide.wireframe = hideWireframe;
    hide.gizmo = hideGizmo;
})(hide || (hide = {}));
//# sourceMappingURL=index.js.map