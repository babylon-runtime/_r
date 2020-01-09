import { registerPlugin } from "../patchPlugin.js";
import { is } from "../../is.js";
import { global } from "../../global.js";
import { patchElement } from "../patchElement.js";

registerPlugin({
  test(element, source, property) : boolean {
    return property === "scene";
  },
  resolve(element, source, property) {
    if (is.Function(source[property])) {
      try {
       global.scene = source[property]();
      }
      catch (ex) {
        console.error(ex);
      }
    }
    else {
      return patchElement(global.scene, source[property]);
    }
  }
});