import { is } from "../is.js";
import { select } from "../select.js";
import { global } from "../global.js";
import { start, isStarted } from "../renderLoop.js";
import { patchElements, patchElement, globalPatch } from "./patchElement.js";
import { registerPlugin } from "./patchPlugin.js";
import "./plugins/index.js";
import { load } from "../load.js";

export function patch(patch : any) : Promise<any> {
  if (is.PatchFile(patch)) {
    return load.patch(patch).then((data) => {
      let res = globalPatch(patch);
      if (!is.Promise(res)) {
        return new Promise((resolve) => {
          resolve(res);
        });
      }
      else {
        return res;
      }
    });
  }
  else {
    if (!is.Array(patch)) {
      patch = [patch];
    }
    let res = globalPatch(patch);
    if (!is.Promise(res)) {
      return new Promise((resolve) => {
        resolve(res);
      });
    }
    else {
      return res;
    }
  }
}
patch.registerPlugin = registerPlugin;

export { patchElement, patchElements };

global.fn["patch"] = function(options) {
  let res = patchElements(this.toArray(), options);
  if (!is.Promise(res)) {
    return new Promise((resolve) => {
      resolve(res);
    });
  }
  else {
    return res;
  }
};

global.fn["globalPatch"] = function(options) {
  let res = globalPatch(options, this.toArray());
  if (!is.Promise(res)) {
    return new Promise((resolve) => {
      resolve(res);
    });
  }
  else {
    return res;
  }
};