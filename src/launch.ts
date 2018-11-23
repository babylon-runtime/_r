import { is } from "./is.js";
import { global } from "./global.js";
import { activateCamera } from "./activateCamera.js";
import {importScene, ImportPromise} from "./import.js";
import { patch } from "./patch/patch.js";
import "../node_modules/q/q.js";
declare var Q;

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

export function launch(obj : IRuntimeLoading | string) {
    isReady = false;
    if(is.String(obj)) {
        return importScene(obj).ready(function() {
            run(<IRuntimeLoading> obj);
        })
    }
    obj = <IRuntimeLoading> obj;
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
            if(obj.assets) {
                return importScene(obj.assets,  <string> obj.scene).ready(function() {
                    run(<IRuntimeLoading> obj);
                });
            }
            else {
                return importScene(<string> obj.scene).ready(function(res) {
                    run(<IRuntimeLoading> obj);
                });
            }
        }
        else {
            // setter accept function and object.
            global.scene = obj.scene;
            run(obj);
            return new ImportPromise(global.scene);
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
        activateCamera(global.scene.cameras[0].name);
    }

    window.addEventListener('resize', function () {
        global.engine.resize();
    });

    if(obj.patch) {
        patch(obj.patch).then(function() {
            if(obj.beforeFirstRender && is.Function(obj.beforeFirstRender)) {
                obj.beforeFirstRender();
            }

            start();

            isReady = true;
            callbacks.forEach(function(callback) {
                callback.call(global.scene);
            });
            callbacks.length = 0;
        })
    }
    else {
        if(obj.beforeFirstRender && is.Function(obj.beforeFirstRender)) {
            obj.beforeFirstRender();
        }

        start();

        isReady = true;
        callbacks.forEach(function(callback) {
            callback.call(global.scene);
        });
        callbacks.length = 0;
    }


}

function loop() {
    global.scene.render();
}

export function start() {
    global.engine.runRenderLoop(loop);
}

export function pause() {
    global.engine.stopRenderLoop(loop);
}

export function ready(callback:Function) {
    if(isReady) {
        callback.call(global.scene);
    }
    else {
        callbacks.push(callback);
    }
}

