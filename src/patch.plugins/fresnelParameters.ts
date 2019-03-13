import { patch } from "../patch.js";
import { BABYLON } from "../BABYLON.js";

patch.registerPlugin({
  test(element, source, property) : boolean {
    return ["diffuseFresnelParameters", "opacityFresnelParameters", "emissiveFresnelParameters", "refractionFresnelParameters", "reflectionFresnelParameters"].indexOf(property) !== -1
      && !element.target[property];
  },
  resolve(element, source, property) {
    return new BABYLON.FresnelParameters();
  }
});