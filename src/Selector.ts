import {BABYLON} from "./BABYLON.js";
import {is} from "./is.js";
import {Elements} from "./Elements.js";

export class Selector {
    type = "all";
    filters : Array<any>;
    constructor(selector: string) {
        let filters = [];
        let type = "all";
        selector.split(',').forEach(function (item) {
            item = item.trim();
            if (item.indexOf(":mesh") !== -1) {
                type = "mesh";
            }
            if (item.indexOf(":material") !== -1) {
                type = "material"
            }
            if (item.indexOf(":light") !== -1) {
                type = "light"
            }
            if (item.indexOf(":camera") !== -1) {
                type = "camera"
            }
            if (item.indexOf(":texture") !== -1) {
                type = "texture"
            }
            if (item.indexOf(":multimaterial") !== -1) {
                type = "multimaterial";
            }
            [":mesh", ":material", ":multimaterial", ":camera", ":light", ":texture"].forEach(function (type) {
                item = item.replace(type, '');
            });

            // [isVisible][alpha!= 0.1]
            let regExpAttribute = /\[(.*?)\]/;
            let matches = [];
            let match;
            while(match = regExpAttribute.exec(selector)) {
                matches.push(match[1])
            }
            // TODO [material.diffuseTexture.name=texture*.jpg]
            matches.forEach(function(expr) {
                if(expr.indexOf('!=')!== -1) {
                    var split = expr.split('!=');
                    filters.push(function(element) {
                        if(element.hasOwnProperty(split[0])) {
                            return element[split[0]] != split[1];
                        }
                        return false;
                    });
                }
                else {
                    if(expr.indexOf('=') !== -1) {
                        filters.push(function(element){
                            if(element.hasOwnProperty(split[0])) {
                                return element[split[0]] == split[1];
                            }
                            return false;
                        });
                    }
                    else {
                       filters.push(function(element){
                           return element.hasOwnProperty(expr);
                       })
                    }
                }
            });
            item = item.replace(regExpAttribute, '');
            // Here item only contains name selector i.e mesh.00*
            let exp = selector.replace(/\*/g, '.*');
            let regExp = new RegExp('^' + exp + '$');
            filters.push(function(element) {
                return element.hasOwnProperty('name') && regExp.test(element.name);
            });
        });
        // TODO :not(selector)
        this.filters = filters;
        this.type = type;
    }

    matchFilters(element) {
        this.filters.forEach(function(filter) {
            if(!filter(element)) {
                return false;
            }
        });
        return true;
    }

    matchType(element) {
        if(this.type == "all") {
            return true;
        }
        if(this.type == "mesh") {
            return is.Mesh(element);
        }
        if(this.type == "light") {
            return is.Light(element);
        }
        if(this.type == "material") {
            return is.Material(element);
        }
        if(this.type == "multimaterial") {
            return is.MultiMaterial(element);
        }
        if(this.type == "texture") {
            return is.Texture(element);
        }
    }

    find(container : BABYLON.Scene | Elements | BABYLON.AssetContainer) : Elements {
        let elements = new Elements();
        let selector = this;
        if(is.Scene(container) || is.AssetContainer(container)) {
            switch(this.type) {
              case "material" :
                  container.materials.forEach(function(material) {
                     if(selector.matchFilters(material)) {
                         elements.add(material);
                     }
                  });
                  break;
              case "mesh" :
                  container.meshes.forEach(function(mesh){
                     if(selector.matchFilters(mesh)) {
                         elements.add(mesh);
                     }
                  });
                  break;
              case "light":
                  container.lights.forEach(function(light){
                      if(selector.matchFilters(light)) {
                          elements.add(light);
                      }
                  });
                  break;
              case "multimaterial":
                  container.material.forEach(function(material) {
                      if(is.MultiMaterial(material)) {
                          if(selector.matchFilters(material)) {
                              elements.add(material);
                          }
                      }
                  });
              case "texture":
                  container.textures.forEach(function(texture){
                      if(selector.matchFilters(texture)) {
                          elements.add(texture);
                      }
                  });
              case "all":
                container.materials.forEach(function(material) {
                  if(selector.matchFilters(material)) {
                    elements.add(material);
                  }
                });
                container.meshes.forEach(function(mesh){
                  if(selector.matchFilters(mesh)) {
                    elements.add(mesh);
                  }
                });
                container.lights.forEach(function(light){
                  if(selector.matchFilters(light)) {
                    elements.add(light);
                  }
                });
                container.textures.forEach(function(texture){
                  if(selector.matchFilters(texture)) {
                    elements.add(texture);
                  }
                });
            }
        }
        else {
            container.each(function(element) {
                if(selector.matchType(element) && selector.matchFilters(element)) {
                    elements.add(element);
                }
            })
        }
        return elements;
    }
}

/**
 * Helper to debug selector.
 * @param element
 * @param selector
 * @returns {boolean} true if element match the selector, false otherwise
 */
export function match(element : any, selector : string) {
    let _selector = new Selector(selector);
    return _selector.matchType(element) && _selector.matchFilters(element);
}