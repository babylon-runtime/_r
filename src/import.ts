import { is } from "./is.js";
import { global } from "./global.js";
import {BABYLON} from "./BABYLON.js";
import "../node_modules/q/q.js";
export declare const Q;

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
    constructor(public promise : Promise<any> | any) {
        let self = this;
        if(promise.then) {
            promise.then(function(container) {
                self._isReady = true;
                self._readyCallbacks.forEach(function(callback) {
                    callback(container.scene);
                })
            });

            promise.catch(function(ex) {
                self._error = true;
                self._exception = ex;
                self._errorCallbacks.forEach(function(callback) {
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
        })
    }

    public progress(callback) {
        this._progressCallbacks.push(callback);
        return this;
    }

    public ready(callback) {
        if(this._isReady) {
            callback(this._result);
        }
        else {
            this._readyCallbacks.push(callback);
        }
        return this;
    }

    public error(callback) {
        if(!this._isReady) {
            this._errorCallbacks.push(callback);
        }
        else {
            if(this._error) {
                callback(this._exception);
            }
        }
        return this;
    }
}

function GetFilename(url)
{
    if (url)
    {
        var m = url.toString().match(/.*\/(.+?)\./);
        if (m && m.length > 1)
        {
            return m[1];
        }
    }
    return "";
}

export function importScene(...any) : ImportPromise {
    if(any.length === 1) {
        if(is.String(any[0])) {
            // argument is a filename and assets are in the same folder
            let url = any[0];
            let filename = url.split('/').pop();
            let rootUrl = url.replace(filename, "");
            return load(rootUrl, filename);

        }
        else {
            // argument is an object
            let roolUrl = any["assets"];
            let sceneFileName = any["scene"];
            return load(roolUrl, sceneFileName);
        }
    }
    else {
        let rootUrl = any[0];
        let sceneFileName = any[1];
        return load(rootUrl, sceneFileName);
    }
}

function load(rootUrl, fileName) {
    if(global.TRACE) {
        console.group("_r.import(" + rootUrl + ", " + fileName + ")");
        BABYLON.SceneLoader.loggingLevel = BABYLON.SceneLoader.DETAILED_LOGGING;
    }
    let promise = BABYLON.SceneLoader.LoadAssetContainerAsync(rootUrl, fileName, global.scene, function(e) {
        importPromise.triggerProgress(e);
    }).then(function(container) {
        container.addAllToScene();
        BABYLON.SceneLoader.loggingLevel = BABYLON.SceneLoader.NO_LOGGING;
        console.groupEnd();
        return container;
    });

    let importPromise = new ImportPromise(promise);
    return importPromise;
}

export function disposeScene(...any) {

}