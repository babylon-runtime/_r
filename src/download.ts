import { global } from "./global.js";
import { BABYLON } from "./BABYLON.js";
import { createLibrary } from "./library.js";
import { patch } from "./patch.js";
import "../node_modules/q/q.js";
declare const Q;

export interface IDownloadAsyncOptions {
  loadingScreen? : boolean;
  ready? : Function;
  progress? : Function;
  error? : Function;
}

export interface IDownloadSceneOptions extends IDownloadAsyncOptions{
  scene? : string;
  assets? : string;
  patch? : any;
  addAllToScene? : boolean;
}

export interface IDownloadTextureOptions extends IDownloadAsyncOptions{
  url? : string;
  name? : string;
  noMipmap? : boolean;
  invertY? : boolean;
  samplingMode? : number;
}

export interface IDownloadCubeTextureOptions extends IDownloadAsyncOptions{
  name? : string;
  url? : string;
  extensions? : string[];
  noMipmap? : boolean;
  files? : string[];
}

export function downloadScene(options : IDownloadSceneOptions) {
  let assets, fileName;
  if (options.assets) {
    assets = options.assets;
    fileName = options.scene;
  }
  else {
    fileName = options.scene.split('/').pop();
    assets = options.scene.replace(fileName, '');
  }
  let promise = BABYLON.SceneLoader.LoadAssetContainerAsync(assets, fileName, global.scene, function(e) {
    if (options.progress) {
      options.progress(e);
    }
  }).then(function(assetContainer) {
    // success
    createLibrary(assets + fileName, assetContainer);
    if (options.patch) {
      return patch(options.patch).then(function() {
        if (options.addAllToScene !== false) {
          assetContainer.addAllToScene();
        }
        if (options.ready) {
          options.ready(assetContainer);
        }
      });
    }
    else {
      if (options.addAllToScene !== false) {
        assetContainer.addAllToScene();
      }
      if (options.ready) {
        options.ready(assetContainer);
      }
    }
  }, function(reason) {
    // error
    if (options.error) {
      options.error(reason);
    }
  });
  return promise;
}

export function downloadTexture(options : IDownloadTextureOptions) {
  let defer = Q.defer();
  let assetsManager = new BABYLON.AssetsManager(global.scene);
  let task = assetsManager.addTextureTask(options.name, options.url, options.noMipmap, options.invertY, options.samplingMode);
  task.onSuccess = function(task) {
    defer.resolve(task.texture);
    if (options.ready) {
      options.ready(task.texture);
    }
  };
  task.onError = function(reason) {
    defer.reject(reason);
    if (options.error) {
      options.error(reason);
    }
  };
  assetsManager.load();
  return defer.promise;
}

export function downloadCubeTexture(options : IDownloadCubeTextureOptions) {
  let defer = Q.defer();
  let assetsManager = new BABYLON.AssetsManager(global.scene);
  let task = assetsManager.addTextureTask(options.name, options.url, options.extensions, options.files);
  task.onSuccess = function(task) {
    defer.resolve(task.texture);
    if (options.ready) {
      options.ready(task.texture);
    }
  };
  task.onError = function(reason) {
    defer.reject(reason);
    if (options.error) {
      options.error(reason);
    }
  };
  assetsManager.load();
  return defer.promise;
}
