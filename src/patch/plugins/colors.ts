import { registerPlugin } from "../patchPlugin.js";
import { color } from "../../util/color.js";
import { is } from "../../is.js";

registerPlugin({
  test(element, source, property) : boolean {
    return !is.Function(source[property]) && element[property] instanceof BABYLON.Color3 || element[property] instanceof BABYLON.Color4;
  },
  resolve(element, source, property) {
    element[property] = color(source[property]);
    return element[property];
  }
});
