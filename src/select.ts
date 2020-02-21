import { is } from "./is.js";
import { Elements, find } from "./Elements.js";
import { global } from "./global.js";

export function select(arg) {
  let elements;
  if (is.String(arg)) {
    if ((<string> arg).toLowerCase() === "scene") {
      return new Elements(global.scene);
    }
    elements = find(arg, global.scene);
    if (global.TRACE === true && elements.length == 0) {
      console.warn('BABYLON.Runtime::no object(s) found for selector "' + arg + '"');
    }
  }
  else {
    elements = new Elements(arg);
  }
  // plugins
  for (let plugin in global.fn) {
    Elements.prototype[plugin] = (...args) => {
      return global.fn[plugin].call(elements, ...args);
    };
  }
  return elements;
}