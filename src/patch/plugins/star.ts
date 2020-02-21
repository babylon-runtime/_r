import { registerPlugin } from "../patchPlugin.js";
import { patch, patchElements, patchElement } from "../patch.js";
import { is } from "../../is.js";

registerPlugin({
  test(element, source, property) : boolean {
    return property.trim() === "*" || property.trim() === "forEach" || property.trim() === "each";
  },
  resolve(element, source, property, context) {
    return patchElement(element, source[property], context);
  }
});
