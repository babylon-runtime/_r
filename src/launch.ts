import { is } from "./is.js";
import { extend }  from "./extend.js";
import { global } from "./global.js";
import { BABYLON } from './BABYLON.js';
import { activateCamera } from "./activateCamera.js";
import { importScene, ImportPromise } from "./import.js";
import { patch, patchChain } from "./patch.js";
import "../node_modules/q/q.js";

declare var Q;

let isReady = true;
let callbacks = [];

export interface IRuntimeLoading {
  container?: string | HTMLCanvasElement;
  assets?: string;
  scene: Function | string;
  activeCamera?: Function | string | any;
  patch?: Array<any>;
  beforeFirstRender?: Function;
  ktx?: boolean | Array<string>;
  enableOfflineSupport?: boolean;
  progressLoading: Function;
  loadingScreen: any;
}

let options : IRuntimeLoading = {
  container : null,
  assets : null,
  scene : null,
  activeCamera : null,
  patch : null,
  ktx : false,
  enableOfflineSupport : false,
  progressLoading: null,
  loadingScreen: null,
};

export function launch(obj: IRuntimeLoading | string) : Q.Promise<BABYLON.Scene> {
  isReady = false;
  options = extend(options, obj);
  // CANVAS
  if (options.container) {
    global.canvas = options.container;
  }
  // KTX
  if (options.ktx) {
    if (is.Array(options.ktx)) {
      global.engine.setTextureFormatToUse(<string[]> options.ktx);
    }
    else {
      if (options.ktx === true) {
        global.engine.setTextureFormatToUse(['-astc.ktx', '-dxt.ktx', '-pvrtc.ktx', '-etc2.ktx']);
      }
    }
  }
  // ENABLE OFFLINE SUPPORT
  if (options.enableOfflineSupport) {
    global.engine.enableOfflineSupport = options.enableOfflineSupport;
  }
  else {
    global.engine.enableOfflineSupport = false;
  }
  // LOADING SCREEN
  if (options.loadingScreen) {
    global.engine.loadingScreen = options.loadingScreen;
  }
  // RESIZE
  window.addEventListener('resize', function() {
    global.engine.resize();
  });
  return _createScene().then(() => {
    return _patch().then(() => {
      _checkActiveCamera();
      _beforeFirstRender();
      start();
      isReady = true;
      callbacks.forEach(function(callback) {
        try {
          callback.call(global.scene);
        }
        catch (ex) {
          console.error(ex);
        }
      });
      callbacks.length = 0;
    });
  });
}

function _createScene() : Q.Promise<null> {
  let defer = Q.defer();
  if (options.scene) {
    if (is.String(options.scene)) {
      // scene is a filename
      if (options.assets) {
        importScene(options.assets, <string> options.scene).ready(function() {
          defer.resolve();
        });
      }
      else {
        importScene(<string> options.scene).ready(function(res) {
          defer.resolve();
        });
      }
    }
    else {
      if (is.Function(options.scene)) {
        try {
          let result = eval("var canvas=_r.canvas; var engine = _r.engine; var scene=_r.scene; var createScene=" + options.scene + ';createScene()');
          if (is.Scene(result)) {
            global.scene = result;
          }
        }
        catch (ex) {
          defer.reject(ex);
          throw ex;
        }
      }
      else {
        if (is.Scene(options.scene)) {
          global.scene = options.scene;
        }
        else {
          defer.reject("invalid scene parameter in _r.launch");
          throw new Error("invalid scene parameter in _r.launch");
        }
      }
      defer.resolve();
    }
  }
  else {
    defer.resolve();
  }
  return defer.promise;
}

function _patch() : Q.Promise<null> {
  if (options.patch) {
    return patch(options.patch);
  }
  else {
   return Q();
  }
}

function _beforeFirstRender()  {
  if (options.beforeFirstRender && is.Function(options.beforeFirstRender)) {
    options.beforeFirstRender();
  }
}

function _checkActiveCamera() {
  if (is.String(options.activeCamera)) {
    activateCamera(<string> options.activeCamera);
  }
  else {
    if (is.Function(options.activeCamera)) {
      try {
        let camera = (<Function> options.activeCamera).call(global.scene);
        activateCamera(camera.name);
      }
      catch (ex) {
        console.error("_r.launch() error on activeCamera", ex);
      }
    }
    else {
      if (is.Camera(options.activeCamera)) {
        activateCamera(options.activeCamera.name);
      }
    }
  }
  if (!global.scene.activeCamera && global.scene.cameras.length > 0) {
    activateCamera(global.scene.cameras[0].name);
  }
  if (global.scene.activeCamera && global.scene.activeCamera.inputs && !global.scene.activeCamera.inputs.attachedElement) {
    global.scene.activeCamera.attachControl(global.canvas);
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

export function ready(callback: Function) {
  if (isReady) {
    callback.call(global.scene);
  }
  else {
    callbacks.push(callback);
  }
}