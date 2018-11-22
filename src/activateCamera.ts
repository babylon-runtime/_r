import { global } from './global.js';

export function activateCamera(camera : string) {
    console.log("activateCamera " + camera)
    if(global.scene.activeCamera) {
        global.scene.activeCamera.detachControl();
    }
    global.scene.setActiveCameraByName(camera);
    //global.scene.cameraToUseForPointers = global.scene.activeCamera;
    global.scene.activeCamera.attachControl(global.canvas);
}