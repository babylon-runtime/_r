import { global } from "../global.js";
import { data } from "../data.js";
import { trigger } from "./core.js";
export var meshes = [
    'OnDoublePickTrigger',
    'OnPickTrigger',
    'OnLeftPickTrigger',
    'OnRightPickTrigger',
    'OnCenterPickTrigger',
    'OnPickDownTrigger',
    'OnPickUpTrigger',
    'OnPickOutTrigger',
    'OnLongPressTrigger',
    'OnPointerOverTrigger',
    'OnPointerOutTrigger'
];
export function onMesh(mesh, event, handler, repeat) {
    if (repeat === void 0) { repeat = true; }
    if (!mesh.actionManager) {
        mesh.actionManager = new BABYLON.ActionManager(global.scene);
    }
    var action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager[event], function (evt) {
        trigger(mesh, event, evt);
    });
    mesh.actionManager.registerAction(action);
    var events = data(mesh, "_r.e");
    if (!events) {
        data(mesh, "_r.e", []);
        events = data(mesh, "_r.e");
    }
    if (!events[event]) {
        events[event] = [];
    }
    events[event].push({
        handler: handler,
        repeat: repeat,
        action: action
    });
}
export function oneMesh(mesh, event, handler) {
    onMesh(mesh, event, handler, false);
}
export function offMesh(mesh, event, handler) {
    var events = data(mesh, '_r.e');
    if (events && events[event]) {
        if (handler) {
            events[event] = events[event].filter(function (_event) {
                if (_event.handler.toString() == handler.toString()) {
                    if (_event.action) {
                        var index = mesh.actionManager.actions.indexOf(_event.action);
                        mesh.actionManager.actions.splice(index, 1);
                    }
                    /** ??
                    if (_event.listener) {
                      mesh.removeEventListener(_event, _event.listener);
                    }**/
                }
                return _event.handler.toString() !== handler.toString();
            });
        }
        else {
            events[event] = [];
        }
    }
}
//# sourceMappingURL=meshes.js.map