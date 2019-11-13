import { is } from "./is.js";
import { extend }  from "./util/extend.js";
import { global } from "./global.js";
import { activateCamera } from "./activateCamera.js";
import { downloadScene } from "./download.js";
import { patch } from "./patch/patch.js";

let isReady = true;
let callbacks = [];

export interface IRuntimeLoading {
  container? : string | HTMLElement;
  canvas?: string | HTMLCanvasElement;
  assets?: string;
  scene: Function | string;
  activeCamera?: Function | string | any;
  patch?: Array<any>;
  beforeFirstRender?: Function;
  ktx?: boolean | Array<string>;
  enableOfflineSupport?: boolean;
  progress?: Function;
  loadingScreen?: any;
}

let options : IRuntimeLoading = {
  container : null,
  canvas : null,
  assets : null,
  scene : null,
  activeCamera : null,
  patch : null,
  ktx : false,
  enableOfflineSupport : false,
  progress: null,
  loadingScreen: null,
};

export function launch(obj: IRuntimeLoading | string) : Promise<BABYLON.Scene> {
  isReady = false;
  options = extend(options, obj);
  // CANVAS
  if (options.canvas) {
    if (is.String(options.canvas)) {
      let element = document.getElementById(<string> options.canvas);
      if (is.DOM.canvas(element)) {
        global.canvas = element;
      }
      else {
        console.error("_r.launch - " + options.canvas + "is not a valid HTMLCanvasElement");
      }
    }
    else {
      if (is.DOM.canvas(options.canvas)) {
        global.canvas = options.canvas;
      }
      else {
        console.error("_r.launch - canvas parameter should be a string or a HTMLCanvasElement");
      }
    }
  }
  if (options.container) {
    if (is.String(options.container)) {
      let parent = document.getElementById(<string> options.container);
      parent.appendChild(global.canvas);
    }
    else {
      (<HTMLElement> options.container).appendChild(global.canvas);
    }
  }
  else {
    document.body.appendChild(global.canvas);
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
  return new Promise((resolve, reject) => {
    _createScene().then(() => {
      _patch().then(() => {
        _checkActiveCamera();
        _beforeFirstRender();
        // RESIZE
        window.addEventListener('resize', function() {
          global.engine.resize();
        });
        global.engine.resize();
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
        resolve(global.scene);
      });
    }, (err) => {
      reject(err);
    });
  });
}

function _createScene() : Promise<any> {
  if (options.scene) {
    if (is.String(options.scene)) {
      // scene is a filename
      if (options.assets) {
        return downloadScene({
          scene: <string>options.scene,
          assets: options.assets,
          progress: options.progress
        });
      } else {
        return downloadScene({
          scene: <string>options.scene,
          progress: options.progress
        });
      }
    } else {
      return new Promise((resolve, reject) => {
        if (is.Function(options.scene)) {
          try {
            let result = eval("var canvas=_r.canvas; var engine = _r.engine; var scene=_r.scene; var createScene=" + options.scene + ';createScene()');
            if (BABYLON.Engine.LastCreatedEngine.scenes.length == 2) {
              BABYLON.Engine.LastCreatedEngine.scenes[0].dispose();
            }
            if (is.Scene(result)) {
              global.scene = result;
            }
            resolve();
          } catch (ex) {
            reject(ex);
            throw ex;
          }
        } else {
          if (is.Scene(options.scene)) {
            global.scene = options.scene;
            resolve();
          } else {
            reject("invalid scene parameter in _r.launch");
            throw new Error("invalid scene parameter in _r.launch");
          }
        }
      });
    }
  }
}

function _patch() : Promise<null> {
  if (options.patch) {
    return patch(options.patch);
  }
  else {
    return new Promise((resolve) => {
      resolve();
    });
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