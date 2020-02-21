import { registerPlugin } from "../patchPlugin.js";
import { is } from "../../is.js";
import { global } from "../../global.js";
import { globalPatch } from "../patchElement.js";
import { select } from "../../select.js";

registerPlugin({
  test(element, source, property) : boolean {
    return property === "data";
  },
  resolve(element, source, property, context) {
    let data = source[property];
    let properties = Object.getOwnPropertyNames(data);
    let x = {};
    properties.forEach((property) => {
      let _patch = data[property];
      if (is.Function(_patch)) {
        x[property] = function() {
          return _patch.apply(element, context);
        };
        select(element).data(property, x[property]);
      }
      else {
        x[property] = _patch;
        select(element).data(property, _patch);
      }
    });
  }
});