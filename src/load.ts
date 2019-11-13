import { is } from "./is.js";
import { global } from "./global.js";
import { select } from "./select.js";

let assetsManager;
let counter = 0;
let tasks = [];

export function load(resource : string | Array<string>) : Promise<any> {
  if (is.Array(resource)) {
    let _resources = resource as Array<string>;
    let promises = [];
    _resources.forEach((_resource) => {
      addTask(_resource);
      promises.push(tasks[_resource]);
    });
    return Promise.all(promises);
  }
  else {
    addTask(resource as string);
    return tasks[resource as string];
  }
}

function addTask(resource : string) {
  if (is.ImageFile(<string> resource)) {
    if (!assetsManager) {
      assetsManager = new BABYLON.AssetsManager(global.scene);
    }
    let task = assetsManager.addImageTask('_r.preload.task' + counter++, resource);
    tasks[resource] = new Promise((resolve, reject) => {
      task.onSuccess = function(task) {
        resolve(task.image);
      };
      task.onError = function(task, message, exception) {
        console.error(message, exception);
        reject(message);
      };
    });
    assetsManager.load();
  }
  if (is.FileWithExtension(resource, ['babylon', 'gltf', 'glb'])) {
    let fileName = resource.split('/').pop();
    let root = resource.replace(fileName, '');
    tasks[resource] = BABYLON.SceneLoader.LoadAssetContainerAsync(root, fileName, global.scene); // return a Promise
  }
}

load.scene = function(scene : string, patch? : any) {
  if (patch) {
    return load(scene).then((assetsContainer) => {
      let elements = select(assetsContainer);
      let promises = [];
      if (!is.Array(patch)) {
        console.error('_r.load.scene - patch parameter must be an array');
        return assetsContainer;
      }
      else {
        patch.forEach((_patch) => {
          let selector = _patch.getOwnPropertyNames(_patch)[0];
          let _elements = elements.select(selector);
          console.error("TODO !!");
        });
      }
    });
  }
  else {
    return load(scene);
  }
};

load.texture = function(image : string, patch? : any) {
  return load(image).then((img) => {
    let texture = new BABYLON.Texture(image, global.scene);
    if (patch) {
      return select(texture).patch(patch);
    }
    else {
      return texture;
    }
  });
};

let cubeCounter = 0;
load.cubeTexture = function(url : string, patch? : any) {
  return new Promise((resolve, reject) => {
    let assetsManager = new BABYLON.AssetsManager(global.scene);
    let task = assetsManager.addCubeTextureTask('cubeTexture' + cubeCounter++, url);
    task.onSuccess = function(task) {
      if (patch) {
        return select(task.texture).patch(patch);
      }
      else {
        return task.texture;
      }
    };
    task.onError = function(reason) {
      reject(reason);
    };
    assetsManager.load();
  });
};

load.patch = function(file : string) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("get", file, true);
    xhr.onload = function() {
      let status = xhr.status;
      if (status == 200) {
        let data;
        let isJson = false;
        try {
          data = JSON.parse(xhr.response);
          isJson = true;
        }
        catch (error) {
          isJson = false;
        }
        if (!isJson) {
          try {
            data = window["eval"].call(window, xhr.response);
          }
          catch (error) {
            let __patch;
            eval('var __patch = ' + xhr.response);
            data = __patch;
          }
        }
        if (data) {
          resolve(data);
        }
        else {
          console.warn('BABYLON.Runtime::no data found in ' + file);
          resolve([{}]);
        }

      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};
