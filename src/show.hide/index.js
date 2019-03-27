import { showNormals, hideNormals } from "./normals.js";
import { showWireframe, hideWireframe } from "./wireframe.js";
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
            default:
                console.error(param + " is not supported by _r.hide");
        }
    });
}
(function (show) {
    show.normals = showNormals;
    show.wireframe = showWireframe;
})(show || (show = {}));
(function (hide) {
    hide.normals = hideNormals;
    hide.wireframe = hideWireframe;
})(hide || (hide = {}));
//# sourceMappingURL=index.js.map