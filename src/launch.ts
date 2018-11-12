import { is } from "./is.js";
import { global } from "./global.js";
import { activateCamera } from "./activateCamera.js";
import {BABYLON} from "./BABYLON.js";
//import { patch } from "./patch.js";


let isReady = true;
let callbacks = [];

export interface IRuntimeLoading {
    container? : string | HTMLCanvasElement,
    assets? : string,
    scene : Function | string,
    activeCamera? : Function | string | any,
    patch? : Array<any>,
    beforeFirstRender? : Function,
    ktx? : boolean | Array<string>,
    enableOfflineSupport? : boolean,
    progressLoading : Function
    loadingScreen : any
}

export function launch(obj : IRuntimeLoading) {
    isReady = false;

    if(obj.container) {
        global.canvas = obj.container;
    }

    if(obj.ktx) {
        if(is.Array(obj.ktx)) {
            global.engine.setTextureFormatToUse(<string[]> obj.ktx);
        }
        else {
            if(obj.ktx === true) {
                global.engine.setTextureFormatToUse(['-astc.ktx', '-dxt.ktx', '-pvrtc.ktx', '-etc2.ktx'])
            }
        }
    }

    if(obj.enableOfflineSupport) {
        global.engine.enableOfflineSupport = obj.enableOfflineSupport;
    }
    else {
        global.engine.enableOfflineSupport = false;
    }

    if(obj.loadingScreen) {
        global.engine.loadingScreen = obj.loadingScreen;
    }

    if(obj.scene) {
        if(is.String(obj.scene)) {
            // scene is a filename
            let ext = (<string> obj.scene).split('.').pop();
            if((ext === "glb" || ext === "gltf") && !(BABYLON.GLTF1 || BABYLON.GLTF2)) {
                console.error("[babylon-runtime] You try to load a GLTF scene but you forget to include the loader : https://preview.babylonjs.com/loaders/babylonjs.loaders.min.js ");
                return;
            }
            BABYLON.SceneLoader.Load(obj.assets, <string> obj.scene, global.engine, function(scene) {
                global.scene = scene;
                if(obj.patch) {
                    // TODO
                    throw new Error("patches in launch not yet available");
                    /**
                    patch(obj.patch).then(function() {
                        run(obj);
                    })**/
                }
                else {
                    run(obj);
                }
            });
        }
        else {
            // setter accept function and object.
            global.scene = obj.scene;
            if(obj.patch) {
                // TODO
                throw new Error("patches in launch not yet available");
                /**
                patch(obj.patch).then(function() {
                    run(obj);
                })**/
            }
            else {
                run(obj);
            }

        }
    }
}

function run(obj : IRuntimeLoading) {
    if(obj.activeCamera) {
        if(is.String(obj.activeCamera)) {
            activateCamera(<string> obj.activeCamera);
        }
        else {
            if(is.Function(obj.activeCamera)) {
                try {
                    let camera = (<Function> obj.activeCamera).call(global.scene);
                    activateCamera(camera.name);
                }
                catch(ex) {
                    console.error("_r.launch() error on activeCamera", ex);
                }
            }
            else {
                activateCamera( obj.activeCamera.name);
            }
        }

    }

    if(!global.scene.activeCamera && global.scene.cameras.length > 0) {
        global.scene.activeCamera = global.scene.cameras[0];
    }

    if(obj.beforeFirstRender && is.Function(obj.beforeFirstRender)) {
        obj.beforeFirstRender();
    }
    window.addEventListener('resize', function () {
        global.engine.resize();
    });

    global.engine.runRenderLoop(function(){
        global.scene.render();
    });

    isReady = true;
    callbacks.forEach(function(callback) {
        callback.call(global.scene);
    });
    callbacks.length = 0;
}

export function ready(callback:Function) {
    if(isReady) {
        callback.call(global.scene);
    }
    else {
        callbacks.push(callback);
    }
}

