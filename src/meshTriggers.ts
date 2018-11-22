import {BABYLON} from "./BABYLON.js";
import {global} from "./global.js";
import {data} from "./data.js";
import {trigger} from "./events.js";

export const meshTriggers = [
    'NothingTrigger ',
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
    'OnPointerOutTrigger',
    'OnEveryFrameTrigger',
    'OnIntersectionEnterTrigger',
    'OnIntersectionExitTrigger',
    'OnKeyDownTrigger',
    'OnKeyUpTrigger'
];

export function onMesh(mesh : BABYLON.Mesh, event : string,  handler : (args : any) => void, repeat = true) {
    if(!mesh.actionManager) {
        console.log("actionManager", mesh.getScene())
        mesh.actionManager = new BABYLON.ActionManager(mesh.getScene());
    }
    let action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager[event], function(evt){
        trigger(mesh, event, evt);
    });

    mesh.actionManager.registerAction(action);

    let events = data(mesh, "_r.events");
    if(!events) {
        data(mesh, "_r.events", []);
        events = data(mesh, "_r.events");
    }
    if(!events[event]) {
        events[event] = [];
    }
    events[event].push({
        handler : handler,
        repeat : repeat,
        action : action
    });
}

export function oneMesh(mesh : BABYLON.Mesh, event : string,  handler : (args : any) => void) {
    onMesh(mesh, event, handler, false);
}

export function offMesh(mesh : BABYLON.Mesh, event : string,  handler? : (args : any) => void) {
    let events = data(mesh, '_r.events');
    if(events[event]) {
        if(handler) {
            events[event] = events[event].filter(function(_event) {
                if(_event.handler.toString() == handler.toString()) {
                    if(_event.action) {
                        let index = mesh.actionManager.actions.indexOf(_event.action);
                        mesh.actionManager.actions.splice(index, 1);
                    }
                    if(_event.listener) {
                        mesh.removeEventListener(_event, _event.listener);
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