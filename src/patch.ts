import { is } from "./is.js";
import { select } from "./select.js";
import "../node_modules/q/q.js";
import { global } from "./global.js";
import { start, isStarted } from "./renderLoop.js";

declare const Q;

export function patch(...args) : Q.Promise<any> {
  if (args.length == 1) {
    if (is.PatchFile(args[0])) {
      if (global.TRACE) {
          console.groupCollapsed(args[0]);
      }
      return downloadPatchFile(args[0]).then((data) => {
        return patch(data).then(() => {
          console.groupEnd();
        });
      });
    }
    else {
      // patch([...])
      if (is.Array(args[0])) {
        return patchChain(args[0]);
      }
      else {
        // patch({"*:mesh" : { isVisible : false }})
        if (is.PlainObject(args[0])) {
          let selector = Object.getOwnPropertyNames(args[0])[0];
          return patch(selector, args[0][selector]);
        }
      }
    }
  }
  else {
    if (is.String(args[0])) {
      if (global.TRACE) {
        console.groupCollapsed(args[0]);
      }
      // patch("*:mesh", { position : { x : 10}}
      switch (args[0]) {
        case "scene" :
          if (is.Function(args[1])) {
            let result = execute(args[1]);
            if (is.Scene(result)) {
              global.scene = result;
            }
            if (!isStarted) {
              start();
            }
            if (global.TRACE) {
              console.groupEnd();
            }
            return Q(global.scene);
          }
          else {
            return patchElement(global.scene, args[1]).then(() => {
              if (global.TRACE) {
                console.groupEnd();
              }
            });
          }
        case "exec":
          if (global.TRACE) {
            console.groupEnd();
          }
          return Q(execute(args[1]));
        default:
          let elements = select(args[0]).toArray();
          return patchElements(elements, args[1]).then(() => {
            if (global.TRACE) {
              console.groupEnd();
            }
          });
      }
    }
    else {
      // patch(mesh1, { isVisible : false })
      return patchElement(args[0], args[1]);
    }
  }
}

export function execute(func) : any {
  try {
    if (global.TRACE) {
      console.log(func);
    }
    let result = eval("var canvas=_r.canvas; var engine = _r.engine; var scene=_r.scene; var exec=" + func + ';exec()');
    return result;
  }
  catch (ex) {
    console.error(ex);
  }
}

export function patchChain(patches : Array<any>) : Q.Promise<null> {
  let index = 0;
  function patchItem() : Q.Promise<null> {
      if (index === patches.length) {
        return Q();
      }
      else {
        return patch(patches[index]).then(() => {
          index += 1;
          return patchItem();
        });
      }
  }
  return patchItem();
}

export function downloadPatchFile(file : string) : Q.Promise<Array<any>> {
  let deferred = Q.defer();
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
        deferred.resolve(data);
      }
      else {
        console.warn('BABYLON.Runtime::no data found in ' + file);
        deferred.resolve([{}]);
      }

    } else {
      deferred.reject(status);
    }
  };
  xhr.send();
  return deferred.promise;
}

export function patchElements(elements : Array<any>, _patch : any, context? : Array<any>) : Q.Promise<null> {
  let names = [];
  if (global.TRACE) {
    elements.forEach((element) => {
      names.push(element.name);
    });
    console.log(names.join(','));
    console.log(_patch);
  }

  let index = 0;
  function patchElementChain() : Q.Promise<null> {
    if (index === elements.length) {
      return Q();
    }
    else {
      return patchElement(elements[index], _patch, context).then(() => {
        index += 1;
        return patchElementChain();
      });
    }
  }
  return patchElementChain();
}

export function patchElement(element, patch, context? : Array<any>) : Q.Promise<any> {
  let properties = Object.getOwnPropertyNames(patch);
  let index = 0;
  function patchPropertyChain() : Q.Promise<null> {
    if (index === properties.length) {
      return Q();
    }
    else {
      return patchProperty(element, properties[index], patch, context).then(() => {
        index += 1;
        return patchPropertyChain();
      });
    }
  }
  return patchPropertyChain();
}

export function patchProperty(element, property, source, context? : Array<any>): Q.Promise<any> {
  if (is.Primitive(source[property])) {
    let plugin = patch.getPlugin(element, source, property);
    if (plugin) {
      let result = plugin.resolve(element, source, property);
      if (result) {
        if (is.Promise(result)) {
          return result.then((_result) => {
            element[property] = _result;
            return Q(element[property]);
          });
        }
        else {
          element[property] = result;
        }
        element[property] = result;
      }
      return Q(source[property]);
    }
    else {
      element[property] = source[property];
      return Q(source[property]);
    }
  }
  else {
    if (is.Function(source[property])) {
      if (is.Function(element[property])) {
        element[property] = source[property];
        return Q(source[property]);
      }
      else {
        try {
          if (context) {
            context.push(element);
          }
          else {
            context = [element];
          }
          let res = source[property].apply(element, context);
          if (is.Promise(res)) {
            return res.then(function(result) {
              element[property] = result;
            });
          }
          else {
            if (res) {
              element[property] = res;
            }
            return Q(res);
          }
        }
        catch (ex) {
          console.error(ex);
          return Q.reject(ex);
        }
      }
    }
    else {
      if (is.Promise(source[property])) {
        return source[property].then((_result) => {
          element[property] = _result;
          return Q(element[property]);
        });
      }
      if (!element[property]) {
        element[property] = {};
      }
      let plugin = patch.getPlugin(element, source, property);
      if (plugin) {
        let result = plugin.resolve(element, source, property);
        if (result) {
          if (is.Promise(result)) {
            return result.then((_result) => {
              element[property] = _result;
              return Q(element[property]);
            });
          }
          else {
            element[property] = result;
          }
          element[property] = result;
        }
        return Q(source[property]);
      }
      else {
        if (context) {
          context.push(element);
        }
        else {
          context = [element];
        }
        return patchElement(element[property], source[property], context);
      }
    }
  }
}

export namespace patch {
  export let plugins : Array<IPatchPlugin> = [];
  export interface IPatchPlugin {
    test : (element, source, property) => boolean;
    resolve : (element, source, property) => any;
  }
  export function registerPlugin(plugin : IPatchPlugin) {
    plugins.push(plugin);
  }
  export function getPlugin(element, source, property) : IPatchPlugin | null {
    let plugin = null;
    for (let i = 0; i < plugins.length; i++) {
      if (plugins[i].test(element, source, property)) {
        plugin = plugins[i];
      }
    }
    return plugin;
  }
}