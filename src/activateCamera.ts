import { global } from './global.js';
import { is } from "./is.js";

export function activateCamera(camera : string | BABYLON.Camera) {
    if (global.scene.activeCamera) {
        global.scene.activeCamera.detachControl();
    }
    if (is.String(camera)) {
        global.scene.setActiveCameraByName(camera);
    }
    else {
        global.scene.activeCamera = camera;
    }
    global.scene.activeCamera.attachControl(global.canvas);
}