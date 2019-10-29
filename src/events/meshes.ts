import { global } from "../global.js";
import { data } from "../data.js";
import { trigger } from "./core.js";

export const meshes = [
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

export function onMesh(mesh: BABYLON.Mesh, event: string, handler: (args: any) => void, repeat = true) {
  if (!mesh.actionManager) {
    mesh.actionManager = new BABYLON.ActionManager(global.scene);
  }
  let action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager[event], function(evt) {
    trigger(mesh, event, evt);
  });
  if (!mesh.actionManager.hasSpecificTrigger(BABYLON.ActionManager[event])) {
    mesh.actionManager.registerAction(action);
  }
  let events = data(mesh, "_r.e");
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

export function oneMesh(mesh: BABYLON.Mesh, event: string, handler: (args: any) => void) {
  onMesh(mesh, event, handler, false);
}

export function offMesh(mesh: BABYLON.Mesh, event: string, handler?: (args: any) => void) {
  let events = data(mesh, '_r.e');
  if (events && events[event]) {
    if (handler) {
      events[event] = events[event].filter(function(_event) {
        if (_event.handler.toString() == handler.toString()) {
          if (_event.action) {
            let index = mesh.actionManager.actions.indexOf(_event.action);
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