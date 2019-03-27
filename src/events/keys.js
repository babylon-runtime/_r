import { BABYLON } from "../BABYLON.js";
import { global } from "../global.js";
import { data } from "../data.js";
import { trigger } from "./core.js";
export var keys = [
    'OnKeyDownTrigger',
    'OnKeyUpTrigger'
];
// see https://api.jquery.com/category/events/keyboard-events/
export function onKeyEvent(event, handler, repeat) {
    if (repeat === void 0) { repeat = true; }
    if (!global.scene.actionManager) {
        global.scene.actionManager = new BABYLON.ActionManager(global.scene);
    }
    var action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager[event], function (evt) {
        trigger(global.scene, event, evt);
    });
    global.scene.actionManager.registerAction(action);
    var events = data(global.scene, "_r.e");
    if (!events) {
        data(global.scene, "_r.e", []);
        events = data(global.scene, "_r.e");
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
export function oneKeyEvent(event, handler) {
    onKeyEvent(event, handler, false);
}
export function offKeyEvent(event, handler) {
    var events = data(global.scene, '_r.e');
    if (events[event]) {
        if (handler) {
            events[event] = events[event].filter(function (_event) {
                if (_event.handler.toString() == handler.toString()) {
                    if (_event.action) {
                        var index = global.scene.actionManager.actions.indexOf(_event.action);
                        global.scene.actionManager.actions.splice(index, 1);
                    }
                    if (_event.listener) {
                        global.scene.removeEventListener(_event, _event.listener);
                    }
                }
                return _event.handler.toString() !== handler.toString();
            });
        }
        else {
            events[event] = [];
        }
    }
}
//# sourceMappingURL=keys.js.map