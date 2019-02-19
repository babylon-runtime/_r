import { is } from "./is.js";
import { global } from "./global.js";
import { BABYLON } from "./BABYLON.js";
import { createLibrary } from "./library.js";
// Error handling in promise can be tricky, for instance errors in then must be catch, we don't want that for our users, so we provide a ready function.
// + We need progress to track async operation.
export class ImportPromise {
  private _progressCallbacks = [];
  private _readyCallbacks = [];
  private _errorCallbacks = [];
  private _isReady = false;
  private _error = false;
  public _result;
  private _exception;

  constructor(public promise: Promise<any> | any) {
    if (promise.then) {
      promise.then((container) => {
        this._isReady = true;
        this._readyCallbacks.forEach(function(callback) {
          callback(container);
        });
      });

      promise.catch((ex) => {
        this._error = true;
        this._exception = ex;
        this._errorCallbacks.forEach(function(callback) {
          callback(ex);
        });
      });
    }
    else {
      this._isReady = true;
      this._result = promise;
    }
  }

  public triggerProgress(progress) {
    this._progressCallbacks.forEach(function(callback) {
      callback(progress);
    });
  }

  public progress(callback) {
    this._progressCallbacks.push(callback);
    return this;
  }

  public ready(callback) {
    if (this._isReady) {
      callback(this._result);
    }
    else {
      this._readyCallbacks.push(callback);
    }
    return this;
  }

  public error(callback) {
    if (!this._isReady) {
      this._errorCallbacks.push(callback);
    }
    else {
      if (this._error) {
        callback(this._exception);
      }
    }
    return this;
  }
}

export function importScene(...any): ImportPromise {
  return load(...any).ready(function(assetContainer) {
    assetContainer.addAllToScene();
    return assetContainer.scene;
  });
}

export function downloadScene(...any): ImportPromise {
  return load(...any);
}

export function load(...any) {
  let rootUrl, sceneFileName;
  if (any.length === 1) {
    if (is.String(any[0])) {
      // argument is a filename and assets are in the same folder
      let url = any[0];
      sceneFileName = url.split('/').pop();
      rootUrl = url.replace(sceneFileName, "");

    }
    else {
      // argument is an object
      rootUrl = any["assets"];
      sceneFileName = any["scene"];
    }
  }
  else {
    rootUrl = any[0];
    sceneFileName = any[1];
  }
  if (global.TRACE) {
    console.groupCollapsed("[_r] - loadAssets & create library " + sceneFileName + " from " + rootUrl);
    BABYLON.SceneLoader.loggingLevel = BABYLON.SceneLoader.DETAILED_LOGGING;
  }
  let promise = BABYLON.SceneLoader.LoadAssetContainerAsync(rootUrl, sceneFileName, global.scene, function(e) {
    importPromise.triggerProgress(e);
  }).then(function(container) {
    createLibrary(rootUrl + sceneFileName, container);
    BABYLON.SceneLoader.loggingLevel = BABYLON.SceneLoader.NO_LOGGING;
    console.groupEnd();
    return container;
  });

  let importPromise = new ImportPromise(promise);
  return importPromise;
}