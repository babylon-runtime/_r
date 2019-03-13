import { patch, patchElements, patchElement } from "../patch.js";
import { is } from "../is.js";

patch.registerPlugin({
  test(element, source, property) : boolean {
    return property.trim() === "*";
  },
  resolve(element, source, property) {
    if (is.MultiMaterial(element)) {
      return patchElements(element.subMaterials, source[property], element);
    }
    else {
      if (is.Array(element)) {
        return patchElements(element, source[property]);
      }
      else {
        return patchElement(element, source[property]);
      }
    }
  }
});
