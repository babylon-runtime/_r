import { Elements } from "./Elements.js";
import { global } from "./global.js";

export var libraries = [];

export function createLibrary(name: string, ...elements: Array<any> | any) {
  if (libraries[name]) {
    console.error("[_r] Error in _r.createLibrary : " + name + " already exists");
    return;
  }
  else {
    let _elements = new Elements(elements);
    libraries[name] = _elements;
    if (global.TRACE) {
      console.groupCollapsed("[_r] - create library " + name);
      _elements.log();
      console.groupEnd();
    }
  }
}

export function library(name: string): Elements {
  return libraries[name];
}
