import { registerPlugin } from "../patchPlugin.js";
import { patch, patchElements, patchElement } from "../patch.js";
import { is } from "../../is.js";
import { select } from "../../select.js";

registerPlugin({
  test(element, source, property) : boolean {
    return property === "forEach" || property === "*" || property === "each";
  },
  resolve(element, source, property, context) {
    context.pop();
    let keyword;
    if (source["forEach"]) {
      keyword = "forEach";
    }
    else {
      if (source["*"]) {
        keyword = "*";
      }
      else {
        if (source["each"]) {
          keyword = "each";
        }
      }
    }
    let promises = [];
    if (is.Array(element)) {
      element = [element];
    }
    element.forEach((item) => {
      // clone context
      let _context = context.slice();
      promises.push(patchElement(item, source[keyword], _context));
    });
    // Here Promises are parallel :/
    return Promise.all(promises);
  }
});
