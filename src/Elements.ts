import { global } from "./global.js";
import { is } from "./is.js";
import { Selector } from "./Selector.js";

export class Elements {
  length : number;
  constructor(...elements : any) {
    this.length = 0;
    for (let i = 0; i < elements.length; i++) {
      this.add(elements[i]);
    }
  }

  add(element : any) {
    if (is.Array(element)) {
      for (let i = 0; i < element.length; i++) {
        this.add(element[i]);
      }
      return;
    }
    if (is.AssetContainer(element)) {
      for (let i = 0; i < element.meshes.length; i++) {
        this[this.length++] = element.meshes[i];
      }
      for (let i = 0; i < element.lights.length; i++) {
        this[this.length++] = element.lights[i];
      }
      for (let i = 0; i < element.materials.length; i++) {
        this[this.length++] = element.materials[i];
      }
      for (let i = 0; i < element.textures.length; i++) {
        this[this.length++] = element.textures[i];
      }
      for (let i = 0; i < element.cameras.length; i++) {
        this[this.length++] = element.cameras[i];
      }
      return;
    }
    this[this.length++] = element;
  }

  contains(element : any) : boolean {
    return this.toArray().indexOf(element) !== -1;
  }

  /**
   * Iterate over elements and executing a function for each element.
   * @param callback A function to execute for each element.
   * @returns {_r.Elements}
   */
  each(callback: Function) : Elements {
    for (let i = 0; i < this.length; i++) {
      /** We can break the .each() loop at a particular iteration by making the callback function return false. Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration. **/
      if (callback.call(this[i], this[i], i) == false) {
        return;
      }
    }
    return this;
  }
  forEach(callback : Function) : Elements {
    return this.each(callback);
  }
  /**
   * Pass each element in the current matched set through a function, producing a new jQuery object containing the return values.
   * @param func A function object that will be invoked for each element in the current set.
   * @returns {_r.Elements}
   */
  map(func : (obj : any) => any) : Elements {
    let result = new Elements();
    let length = 0;
    this.each(function(element) {
      result[length++] = func(element);
    });
    result.length = length;
    return result;
  }

  /**
   * Reduce the set of matched elements to those that match the selector or pass the function’s test.
   * @param func A function used as a test for each element in the set. this is the current element.
   * @returns {_r.Elements}
   */
  filter(func : (obj : any) => boolean) : Elements {
    let result = new Elements();
    this.each(function(element) {
      if (func(element)) {
        result.add(element);
      }
    });
    return result;
  }

  /**
   * Retrieve all the elements contained in the set, as an array.
   * @returns {Array}
   */
  toArray() {
    let result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(this[i]);
    }
    return result;
  }

  /**
   * Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.
   * @param attribute The name of the attribute to get.
   * @param value Optional value to set for the attribute.
   * @returns {any}
   */
  attr(attribute : string, value? : any) {
    if (value != null) {
      this.each(function(item) {
        item[attribute] = value;
      });
      return this;
    }
    else {
      return this[0][attribute];
    }
  }

  /**
   * Reduce the set of matched elements to the first in the set.
   * @returns {any}
   */
  first() : any {
    return this[0];
  }

  /**
   * @param property
   * @returns {_r.Elements}
   */
  log(property?: string) {
    this.each(function(item) {
      if (property) {
        console.log(item[property]);
      }
      else {
        console.log(item);
      }
    });
  }

  /**
   * Insert elements in the set
   * @param elements
   * @returns {_r.Elements}
   */
  concat(...elements : any[]) : Elements {
    elements.forEach((element) => {
      let base;
      if (element instanceof Elements) {
        base = element;
      }
      else {
        if (is.String(element)) {
          base = new Elements(element);
        }
        else {
          if (is.Array(element)) {
            base = new Elements();
            element.forEach(function(item) {
              base[base.length++] = item;
            });
          }
          else {
            base = new Elements(element);
          }
        }
      }
      base.each(function(item) {
        this[this.length++] = item;
      });
    });
    return this;
  }

  select(selector : string) {
    if (this.length === 1 && is.Scene(this[0])) {
      return find(selector, this[0]);
    }
    else {
      return find(selector, this);
    }
  }

  /**
   * Disposes all the assets in the container
   */
  dispose() {
    for (let i = 0; i < this.length; i++) {
      this[i].dispose();
      delete this[i];
    }
  }

  addToScene() {
    this.each(function(element) {
      if (is.Camera(element)) {
        global.scene.addCamera(element);
      }
      if (is.Mesh(element)) {
        global.scene.addMesh(element);
      }
      if (is.Material(element)) {
        global.scene.addMaterial(element);
      }
      if (is.MultiMaterial(element)) {
        global.scene.addMultiMaterial(element);
      }
      if (is.Texture(element)) {
        global.scene.addTexture(element);
      }
      if (is.Light(element)) {
        global.scene.addLight(element);
      }
    });
    return this;
  }

  removeFromScene() {
    this.each(function(element) {
      if (is.Camera(element)) {
        global.scene.removeCamera(element);
        return false;
      }
      if (is.Mesh(element)) {
        global.scene.removeMesh(element);
        return false;
      }
      if (is.Material(element)) {
        global.scene.removeMaterial(element);
        return false;
      }
      if (is.MultiMaterial(element)) {
        global.scene.removeMultiMaterial(element);
        return false;
      }
      if (is.Texture(element)) {
        global.scene.removeTexture(element);
        return false;
      }
      if (is.Light(element)) {
        global.scene.removeLight(element);
        return false;
      }
    });
    return this;
  }
  // TODO
  remove(element : any) {
    /**
     let index = this.toArray().indexOf(element);
     if(index) {

        }
     for (let property in PROPERTIES) {
            if(element instanceof BABYLON[property]) {
                this[this.length++] = element;
                super[PROPERTIES[property]].push(element);
                return;
            }
        }**/
  }
}

/**
 * Helper to debug selector.
 * @param element
 * @param selector
 * @returns {boolean} true if element match the selector, false otherwise
 */
export function match(element : any, params : string) {
  let _selector = new Selector(params);
  return _selector.matchType(element) && _selector.matchFilters(element);
}

export function find(params : string, container : BABYLON.Scene | Elements | BABYLON.AssetContainer) : Elements {
  let elements = new Elements();
  params.split(',').forEach(function(item) {
    item = item.trim();
    let selector = new Selector(item);
    if (is.Scene(container) || is.AssetContainer(container)) {
      container = <BABYLON.AssetContainer> container;
      switch (selector.type) {
        case "material" :
          container.materials.forEach(function(material) {
            if (selector.matchFilters(material)) {
              elements.add(material);
            }
          });
          break;
        case "mesh" :
          container.meshes.forEach(function(mesh) {
            if (selector.matchFilters(mesh)) {
              elements.add(mesh);
            }
          });
          break;
        case "light":
          container.lights.forEach(function(light) {
            if (selector.matchFilters(light)) {
              elements.add(light);
            }
          });
          break;
        case "multimaterial":
          container.materials.forEach(function(material) {
            if (is.MultiMaterial(material)) {
              if (selector.matchFilters(material)) {
                elements.add(material);
              }
            }
          });
          break;
        case "texture":
          container.textures.forEach(function(texture) {
            if (selector.matchFilters(texture)) {
              elements.add(texture);
            }
          });
          break;
        case "camera":
          container.cameras.forEach(function(camera) {
            if (selector.matchFilters(camera)) {
              elements.add(camera);
            }
          });
          break;
        case "transformNode":
          container.transformNodes.forEach(function(camera) {
            if (selector.matchFilters(camera)) {
              elements.add(camera);
            }
          });
          break;
        case "all":
          container.materials.forEach(function(material) {
            if (selector.matchFilters(material)) {
              elements.add(material);
            }
          });
          container.meshes.forEach(function(mesh) {
            if (selector.matchFilters(mesh)) {
              elements.add(mesh);
            }
          });
          container.lights.forEach(function(light) {
            if (selector.matchFilters(light)) {
              elements.add(light);
            }
          });
          container.textures.forEach(function(texture) {
            if (selector.matchFilters(texture)) {
              elements.add(texture);
            }
          });
          container.cameras.forEach(function(camera) {
            if (selector.matchFilters(camera)) {
              elements.add(camera);
            }
          });
          container.transformNodes.forEach(function(camera) {
            if (selector.matchFilters(camera)) {
              elements.add(camera);
            }
          });
      }
    }
    else {
      container = <Elements> container;
      container.forEach(function(element) {
        if (selector.matchType(element) && selector.matchFilters(element)) {
          elements.add(element);
        }
      });
    }
  });
  return elements;
}