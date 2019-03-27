import { BABYLON } from "../BABYLON.js";
import { global } from "../global.js";
import { is } from "../is.js";
import { extend } from "../util/extend.js";
import { loadingScreen } from "../util/loadingScreen.js";
import { patch } from "../patch.js";
var DEFAULTS = {
    loadingScreen: true,
    addAllToScene: true
};
function importAssetContainerAsync(settings) {
    var assets, fileName;
    if (settings.assets) {
        assets = settings.assets;
        fileName = settings.scene;
    }
    else {
        fileName = settings.scene.split('/').pop();
        assets = settings.scene.replace(fileName, '');
    }
    var defer = Q.defer();
    BABYLON.SceneLoader.LoadAssetContainerAsync(assets, fileName, global.scene, function (e) {
        if (settings.progress) {
            settings.progress(e);
        }
    }).then(function (assetContainer) {
        if (settings.patch) {
            patch(settings.patch).done(function () {
                defer.resolve(assetContainer);
            });
        }
        else {
            defer.resolve(assetContainer);
        }
    }, function (reason) {
        if (settings.error) {
            settings.error(reason);
        }
        defer.reject(reason);
    });
    return defer.promise;
}
// see http://api.jquery.com/jquery.ajax/
export function importScene(scene, settings) {
    var options = {};
    if (is.String(scene)) {
        options.scene = scene;
        if (settings) {
            options = extend({}, DEFAULTS, settings);
        }
    }
    else {
        settings = scene;
        options = extend({}, DEFAULTS, settings);
    }
    if (options.loadingScreen == true) {
        loadingScreen.show();
    }
    return importAssetContainerAsync(options).then(function (assetContainer) {
        if (settings.addAllToScene) {
            assetContainer.addAllToScene();
        }
        if (settings.loadingScreen == true) {
            loadingScreen.hide();
        }
        if (settings.ready) {
            try {
                settings.ready(assetContainer);
            }
            catch (e) {
                console.error("_r -> error in import scene : ready() thrown an exception", e);
                return Q.reject(e);
            }
            return assetContainer;
        }
    });
}
//# sourceMappingURL=scene.js.map