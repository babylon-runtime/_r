import { global } from "./global.js";
import { createLibrary } from "./library.js";
import { patch } from "./patch.js";

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
  return new Promise((resolve, reject) => {
    BABYLON.SceneLoader.LoadAssetContainerAsync(assets, fileName, global.scene, function(e) {
      if (options.progress) {
        options.progress(e);
      }
    }).then(function(assetContainer) {
      // success
      createLibrary(assets + fileName, assetContainer);
      if (options.patch) {
        try {
          console.log("patching", options.patch);
          patch(options.patch).then(function() {
            if (options.addAllToScene !== false) {
              assetContainer.addAllToScene();
            }
            if (options.ready) {
              options.ready(assetContainer);
            }
            resolve(assetContainer);
          });
        }
        catch (ex) {
          reject(ex);
        }
      }
      else {
        if (options.addAllToScene !== false) {
          assetContainer.addAllToScene();
        }
        if (options.ready) {
          options.ready(assetContainer);
        }
        resolve(assetContainer);
      }
    }, function(reason) {
      // error
      if (options.error) {
        options.error(reason);
        reject(reason);
      }
    });
  });
}

export function downloadTexture(options : IDownloadTextureOptions) {
  return new Promise((resolve, reject) => {
    let assetsManager = new BABYLON.AssetsManager(global.scene);
    let task = assetsManager.addTextureTask(options.name, options.url, options.noMipmap, options.invertY, options.samplingMode);
    task.onSuccess = function(task) {
      resolve(task.texture);
      if (options.ready) {
        options.ready(task.texture);
      }
    };
    task.onError = function(reason) {
      reject(reason);
      if (options.error) {
        options.error(reason);
      }
    };
    assetsManager.load();
  });
}

export function downloadCubeTexture(options : IDownloadCubeTextureOptions) {
  return new Promise((resolve, reject) => {
    let assetsManager = new BABYLON.AssetsManager(global.scene);
    let task = assetsManager.addCubeTextureTask(options.name, options.url, options.extensions, options.noMipmap, options.files);
    task.onSuccess = function(task) {
      resolve(task.texture);
      if (options.ready) {
        options.ready(task.texture);
      }
    };
    task.onError = function(reason) {
      reject(reason);
      if (options.error) {
        options.error(reason);
      }
    };
    assetsManager.load();
  });
}
