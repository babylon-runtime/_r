import { registerPlugin } from "../patchPlugin.js";
import { is } from "../../is.js";
import { global } from "../../global.js";

registerPlugin({
  test(element, source, property) : boolean {
    return property === "execute" || property === "exec";
  },
  resolve(element, source, property, context) {
    try {
      let func = source[property];
      if (element) {
        return func.apply(element, context);
      }
      else {
        return func.apply(global.scene, context);
      }
    }
    catch (ex) {
      console.error(ex);
    }
  }
});