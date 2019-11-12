import { registerPlugin } from "../patchPlugin.js";
import { is } from "../../is.js";
import { global } from "../../global.js";
import { globalPatch } from "../patchElement.js";

registerPlugin({
  test(element, source, property) : boolean {
    return property === "scene";
  },
  resolve(element, source, property) {
    return globalPatch(source[property], element);
  }
});