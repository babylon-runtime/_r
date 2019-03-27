import { importScene } from "./scene.js";
import { is } from "../is.js";
var texturesExtensions = ["png", "jpg", "jpeg", "gif", "dds", "env", "tga"];
var videosExtensions = ["mp4", "ogv", "webm"];
var scenesExtensions = ["babylon", "gltf", "glb", "obj", "stl"];
function getExtension(url) {
    return url.split('.').pop();
}
function isScene(url) {
    var extension;
    return !isCube(url) && (extension = getExtension(url) && scenesExtensions.indexOf(extension) != -1);
}
function isTexture(url) {
    var extension;
    return !isCube(url) && (extension = getExtension(url) && texturesExtensions.indexOf(extension) != -1);
}
function isVideo(url) {
    var extension;
    return !isCube(url) && (extension = getExtension(url) && videosExtensions.indexOf(extension) != -1);
}
function isCube(url) {
    return url.slice(-1) === '/';
}
function _loadMedia(url, settings) {
    if (isScene(url)) {
        // return loadS
    }
    else {
        if (isTexture(url)) {
        }
        else {
            if (isCube(url)) {
            }
        }
    }
}
// import is a reserved word
export function _import(content, settings) {
    if (is.String(content)) {
        if (isScene(content)) {
        }
        else {
            if (isTexture(content)) {
            }
            else {
                if (isCube(content)) {
                }
            }
        }
    }
    else {
        if (content["scene"]) {
        }
        else {
            if (content["url"]) {
                if (isScene(content)) {
                }
                else {
                    if (isTexture(content)) {
                    }
                    else {
                        if (isCube(content)) {
                        }
                    }
                }
            }
        }
    }
}
(function (_import) {
    _import.scene = importScene;
})(_import || (_import = {}));
//# sourceMappingURL=index.js.map