import { registerPlugin } from "../patchPlugin.js";
import { is } from "../../is.js";
import { global } from "../../global.js";
import { select } from "../../select.js";

registerPlugin({
  test(element, source, property) : boolean {
    return false;
    //return source[property] && is.String(source[property]) && (is.Material(element) || is.Texture(element));
  },
  resolve(element, source, property, context) {
    /**
    if (is.Material(element)) {
      let elements = select(source[property] + ':material');
      if (elements.length != 0) {
        element = elements[0];
      }
    }
    if (is.Texture(element)) {
      let elements = select(source[property] + ':texture');
      if (elements.length != 0) {
        element = elements[0];
      }
    }**/
  }
});