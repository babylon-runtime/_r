import { global } from './global.js';

export function activateCamera(camera : string) {
    if(global.scene.activeCamera) {
        global.scene.activeCamera.detachControl();
    }
    global.scene.setActiveCameraByName(camera);
    global.scene.activeCamera.attachControl(global.canvas, true);
}