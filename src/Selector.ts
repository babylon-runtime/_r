import {is} from "./is.js";

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
            let exp = item.replace(/\*/g, '.*');
            let regExp = new RegExp('^' + exp + '$');
            filters.push(function(element) {
                console.log(regExp, element.name,element.hasOwnProperty('name') && regExp.test(element.name));
                return element.hasOwnProperty('name') && regExp.test(element.name);
            });
        });
        // TODO :not(selector)
        this.filters = filters;
        this.type = type;
    }

    matchFilters(element) {
        for(let i = 0; i < this.filters.length; i++) {
            if(!this.filters[i](element)) {
                return false;
            }
        }
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
}