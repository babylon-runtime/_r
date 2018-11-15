import { is } from "./is.js";
import { global } from "./global.js";
import {BABYLON} from "./BABYLON.js";
import "../node_modules/q/q.js";
export declare const Q;

export function importScene(...any) : Q.Promise<any> {
    if(any.length === 1) {
        if(is.String(any[0])) {
            // argument is a filename and assets are in the same folder
        }
        else {
            // argument is an object
            let roolUrl = any["assets"];
            let sceneFileName = any["scene"];
        }
    }
    else {
        let rootUrl = any[0];
        let sceneFileName = any[1];
        let deferred = Q.defer();
        BABYLON.SceneLoader.LoadAssetContainer(rootUrl, sceneFileName, global.scene, function(container) {
            container.addAllToScene();
            console.log(container);
            deferred.resolve();
        });
        return deferred.promise;
    }
    return;
}

export function disposeScene(...any) {

}