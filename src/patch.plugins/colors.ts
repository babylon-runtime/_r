import { patch } from "../patch.js";
import { color } from "../util/color.js";

patch.registerPlugin({
  test(element, source, property) : boolean {
    return element[property] instanceof BABYLON.Color3 || element[property] instanceof BABYLON.Color4;
  },
  resolve(element, source, property) {
    return color(source[property]);
  }
});
