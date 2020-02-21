import * as plugins from './patchPlugin.js';
import { is } from '../is.js';
import { Elements, find } from "../Elements.js";
import { global } from "../global.js";
import { load } from "../load.js";

export function recursive(elements, func, promisify = true) : any {
  let index = 0;
  function recurse() {
    if (index === elements.length) {
      return;
    }
    else {
      let item = elements[index++];
      try {
        let res = func(item);
        if (is.Promise(res)) {
          return res.then(() => {
            return recurse();
          });
        }
        else {
          return recurse();
        }
      }
      catch (ex) {
        return recurse();
      }
    }
  }
  let res = recurse();
  if (is.Promise(res)) {
    return res;
  }
  else {
    // Promisify
    if (promisify) {
      return new Promise((resolve) => {
        resolve();
      });
    }
    else {
      return res;
    }
  }
}

function globalPatchItem(patch : any, elements? : any) {
  if (is.PatchFile(patch)) {
    return load.patch(patch).then((data) => {
      return globalPatch(data);
    });
  }
  else {
    let selectors = Object.getOwnPropertyNames(patch);
    let res = recursive(selectors, (selector) => {
      if (elements) {
        let plugin = plugins.getPlugin(elements, patch, selector);
        if (plugin) {
          return plugin.resolve(elements, patch, selector);
        }
      }
      else {
        let plugin = plugins.getPlugin(global.scene, patch, selector);
        if (plugin) {
          return plugin.resolve(global.scene, patch, selector);
        }
      }
      //console.log("call to find", selector, elements);
      let _elements;
      if (elements) {
        _elements = find(selector, elements);
      }
      else {
        _elements = find(selector, global.scene);
      }
      return patchElements(_elements.toArray(), patch[selector]);
    }, false);
    return res;
  }
}

export function globalPatch(patch : any, elements? : any) {
  if (!elements) {
    //elements = global.scene;
  }
  if (!is.Array(patch)) {
    patch = [patch];
  }
  return recursive(patch, (_patch) => {
   return globalPatchItem(_patch, elements);
  }, false);
}

export function patchElements(elements : Array<any>, patch : any, context? : Array<any>) {
  return recursive(elements, (element) => {
    return patchElement(element, patch, context);
  }, false);
}

export function patchElement(element : any, patch : any, context? : Array<any>) : any {
  let properties = Object.getOwnPropertyNames(patch);
  if (context) {
    context.push(element);
  }
  else {
    context = [element];
  }
  return recursive(properties, (property) => {
    return patchProperty(element, patch, property, context);
  }, false);
}

export function patchProperty(element, source, property, context? : Array<any>) : any {
  let plugin = plugins.getPlugin(element, source, property);
  if (plugin) {
    return plugin.resolve(element, source, property, context);
  }
  else {
    if (is.Primitive(source[property])) {
      element[property] = source[property];
      return element[property];
    }
    if (is.Function(source[property])) {
      if (is.Function(element[property])) {
        element[property] = source[property];
        return element[property];
      }
      else {
        let res = source[property].apply(element, context);
        if (is.Promise(res)) {
          return res.then((value) => {
            if (value) {
              element[property] = value;
            }
          });
        }
        else {
          element[property] = res;
          return element[property];
        }
      }
    }
    else {
      if (is.Promise(source[property])) {
        return source[property].then((result) => {
          element[property] = result;
        });
      }
      else {
        if (is.PlainObject(source[property])) {
          if (!element[property]) {
            element[property] = {};
          }
          if (is.Array(element[property])) {
            return patchElements(element[property], source[property], context);
          }
          else {
            return patchElement(element[property], source[property], context);
          }
        }
      }

    }
  }
}