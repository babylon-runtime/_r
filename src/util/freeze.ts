import { global } from "../global.js";
import { is } from "../is.js";

global.fn['freeze'] = function() {
  this.forEach((item) => {
    if (is.Mesh(item)) {
      item.freezeWorldMatrix();
    }
    if (is.Material(item)) {
      item.freeze();
    }
  });
};

global.fn['unfreeze'] = function() {
  this.forEach((item) => {
    if (is.Mesh(item)) {
      item.unfreezeWorldMatrix();
    }
    if (is.Material(item)) {
      item.unfreeze();
    }
  });
};