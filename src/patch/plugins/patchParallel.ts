import { registerPlugin } from "../patchPlugin.js";
import { is } from "../../is.js";
import { global } from "../../global.js";
import { patch } from "../patch.js";
import { select } from "../../select.js";
registerPlugin({
  test(element, source, property) : boolean {
    return property === "patchParallel";
  },
  resolve(element, source, property, context) {
    let promises = [];
    if (element) {
      source[property].forEach((_patch) => {
        promises.push(select(element).patch(_patch));
      });
    }
    else {
      source[property].forEach((_patch) => {
        promises.push(patch(_patch));
      });
    }
    return Promise.all(promises);
  }
});