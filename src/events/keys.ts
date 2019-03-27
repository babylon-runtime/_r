import { BABYLON } from "../BABYLON.js";
import { global } from "../global.js";
import { data } from "../data.js";
import { trigger } from "./core.js";

export const keys = [
  'OnKeyDownTrigger',
  'OnKeyUpTrigger'
];

// see https://api.jquery.com/category/events/keyboard-events/
export function onKeyEvent(event : string,  handler: (args: any) => void, repeat = true) {
  if (!global.scene.actionManager) {
    global.scene.actionManager = new BABYLON.ActionManager(global.scene);
  }
  let action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager[event], (evt) => {
    trigger(global.scene, event, evt);
  });
  global.scene.actionManager.registerAction(action);
  let events = data(global.scene, "_r.e");
  if (!events) {
    data(global.scene, "_r.e", []);
    events =  data(global.scene, "_r.e");
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

export function oneKeyEvent(event : string, handler: (args: any) => void) {
  onKeyEvent(event, handler, false);
}

export function offKeyEvent(event : string, handler?: (args: any) => void) {
  let events = data(global.scene, '_r.e');
  if (events[event]) {
    if (handler) {
      events[event] = events[event].filter(function(_event) {
        if (_event.handler.toString() == handler.toString()) {
          if (_event.action) {
            let index = global.scene.actionManager.actions.indexOf(_event.action);
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