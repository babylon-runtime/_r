import { global } from './global.js';
import { find } from "./Elements.js";

export function activateCamera(camera : string) {


    if(global.scene.activeCamera) {
        global.scene.activeCamera.detachControl();
    }

    global.scene.setActiveCameraByName(camera);
    global.scene.activeCamera.attachControl(global.canvas);

    if(global.TRACE) {
        console.groupCollapsed("[_r] - activate camera " + global.scene.activeCamera.name);
        find(camera, global.scene).log();
        console.groupEnd();
    }
}