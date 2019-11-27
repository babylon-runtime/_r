import { is } from "./is.js";
import { global } from "./global.js";
import { select } from "./select.js";

let counter = 0;

export function load(resource : string | Array<string>, patch? : any) : Promise<any> {
  if (is.Array(resource)) {
    let promises = [];
    resource = resource as Array<string>;
    resource.forEach((item) => {
      promises.push(load(item));
    });
    return Promise.all(promises);
  }
  else {
    resource = resource as string;
    if (is.ImageFile(resource)) {
      return load.image(resource, patch);
    }
    if (is.FileWithExtension(resource, ['babylon', 'gltf', 'glb'])) {
      return load.assets(resource, patch);
    }
    if (is.FileWithExtension(resource, ['json'])) {
      return load.JSON(resource);
    }
    if (is.FileWithExtension(resource, ['js'])) {
      return load.script(resource);
    }
     if (is.FileWithExtension(resource, ['css'])) {
      return load.css(resource);
    }
    if (is.FileWithExtension(resource, ['patch'])) {
      return load.patch(resource);
    }
    if (is.FileWithExtension(resource, ['txt'])) {
      return load.ajax(resource);
    }
  }
}

load.image = function(image : string, patch? : any) : Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    let assetsManager = new BABYLON.AssetsManager(global.scene);
    let task = assetsManager.addImageTask('_r.preload.task' + counter++, image);
    task.onSuccess = function(task) {
      if (patch) {
        return select(task.image).patch(patch).then(() => {
          resolve(task.image);
        });
      }
      else {
        resolve(task.image);
      }
    };
    task.onError = function(task, message, exception) {
      console.error(message, exception);
      reject(message);
    };
    assetsManager.load();
  });
};

load.assets = function(scene : string, patch? : any, progress? : (event : BABYLON.SceneLoaderProgressEvent) => any) : Promise<BABYLON.AssetContainer> {
  let fileName = scene.split('/').pop();
  let root = scene.replace(fileName, '');
  BABYLON.SceneLoader.ShowLoadingScreen = false;
  return BABYLON.SceneLoader.LoadAssetContainerAsync(root, fileName, global.scene, progress).then((assetsContainer) => {
    if (patch) {
      return select(assetsContainer).globalPatch(patch).then(() => {
        BABYLON.SceneLoader.ShowLoadingScreen = true;
        return assetsContainer;
      });
    }
    else {
      BABYLON.SceneLoader.ShowLoadingScreen = true;
      return assetsContainer;
    }
  });
};

load.texture = function(image : string, patch? : any) : Promise<BABYLON.Texture> {
  return load(image).then((img) => {
    let texture = new BABYLON.Texture(image, global.scene);
    if (patch) {
      return select(texture).patch(patch).then(() => {
        return texture;
      });
    }
    else {
      return texture;
    }
  }, (err) => {
    console.error(err);
  });
};

let cubeCounter = 0;
load.cubeTexture = function(url : string, patch? : any) : Promise<BABYLON.CubeTexture> {
  return new Promise((resolve, reject) => {
    let assetsManager = new BABYLON.AssetsManager(global.scene);
    let task = assetsManager.addCubeTextureTask('_r.load.cubeTexture.' + cubeCounter++, url);
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

load.patch = function(file : string) : Promise<any> {
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

let ajaxCounter = 0;
load.ajax = function(file : string) : Promise<string> {
  return new Promise((resolve, reject) => {
    let assetsManager = new BABYLON.AssetsManager(global.scene);
    let task = assetsManager.addTextFileTask('_r.load.ajax.' + ajaxCounter++, file);
    task.onSuccess = function(task) {
     resolve(task.text);
    };
    task.onError = function(reason) {
      reject(reason);
    };
    assetsManager.load();
  });
};

load.JSON = function(file : string) : Promise<any> {
  return new Promise((resolve, reject) => {
    load.ajax(file).then((text : string) => {
      try {
        let data = JSON.parse(text);
        resolve(data);
      }
      catch (e) {
        reject(e);
      }
    });
  });
};

load.script = function(file : string) : Promise<null> {
  return new Promise((resolve, reject) => {
    // Adding the script tag to the head as suggested before
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = file;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    let resolved = false;
    script['onreadystatechange'] = function() {
      if (this.readyState === 'complete') {
        if (resolved) {
          return;
        }
        resolve();
        resolved = true;
      }
    };
    script.onload = function() {
      if (resolved) {
        return;
      }
      resolve();
      resolved = true;
    };
    // Fire the loading
    document.body.appendChild(script);
  });
};

load.css = function(file : string) : Promise<null> {
  return new Promise((resolve, reject) => {
    // Adding the script tag to the head as suggested before
    let link = document.createElement('link');
    link.type = 'text/css';
    link.href = file;
    link.rel = 'stylesheet';

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    let resolved = false;
    link['onreadystatechange'] = function() {
      if (this.readyState === 'complete') {
        if (resolved) {
          return;
        }
        resolve();
        resolved = true;
      }
    };
    link.onload = function() {
      if (resolved) {
        return;
      }
      resolve();
      resolved = true;
    };
    // Fire the loading
    document.head.appendChild(link);
  });
};
