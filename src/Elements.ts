import {BABYLON} from "./BABYLON.js";
import {global} from "./global.js";
import {is} from "./is.js";
import {on, one, off, trigger} from "./events.js";
import {data} from "./data.js";
import {onMesh, oneMesh, offMesh, meshTriggers} from "./meshTriggers.js";


export class Elements {
    length : number;
    constructor(...elements : any) {
        this.length = 0;
        for(let i = 0; i < elements.length; i++) {
            this.add(elements[i])
        }
    }

    add(element : any) {
        if(is.Array(element)) {
            for(let i = 0; i < element.length; i++) {
                this.add(element[i]);
            }
            return;
        }
        if(is.AssetContainer(element) || is.Scene(element)) {
            for(let i = 0; i < element.meshes.length; i++) {
                this[this.length++] = element.meshes[i];
            }
            for(let i = 0; i < element.lights.length; i++) {
                this[this.length++] = element.lights[i];
            }
            for(let i = 0; i < element.materials.length; i++) {
                this[this.length++] = element.materials[i];
            }
            for(let i = 0; i < element.textures.length; i++) {
                this[this.length++] = element.textures[i];
            }
            for(let i = 0; i < element.cameras.length; i++) {
                this[this.length++] = element.cameras[i];
            }
            return;
        }
        this[this.length++] = element;
    }

    contains(element : any) {
        return this.toArray().indexOf(element) !== -1;
    }

    /**
     * Attach an event handler function for one or more events to the selected elements.
     * @param events One or more space-separated event types
     * @param handler A handler function previously attached for the event(s)
     * @returns {Elements}
     */
    on(events : string, handler : (args : any) => void) {
        this.each(function(item) {
            if(is.Mesh(item) && meshTriggers.indexOf(events) !== -1) {
                onMesh(item, events, handler);
            }
            else {
                on(item, events, handler);
            }
        });
    }

    /**
     * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
     * @param events One or more space-separated event types
     * @param handler A handler function previously attached for the event(s)
     * @returns {Elements}
     */
    one(events : string, handler : (args : any) => void) {
        this.each(function(item) {
            if(is.Mesh(item) && meshTriggers.indexOf(events) !== -1) {
                oneMesh(item, events, handler);
            }
            else {
                one(item, events, handler);
            }
        });
    }

    /**
     * Remove an event handler that were attached with .on()
     * @param events
     * @param handler A handler function previously attached for the event(s) or null to remove all handler attached for the event(s)
     * @returns {Elements}
     */
    off(events : string, handler? : (args : any) => void) {
        this.each(function(item) {
            if(is.Mesh(item) && meshTriggers.indexOf(events) !== -1) {
                offMesh(item, events, handler);
            }
            else {
                off(item, events, handler);
            }
        });
    }

    /**
     * Execute all handlers and behaviors attached to the matched elements for the given event type.
     * @param events One or more space-separated event types
     * @param extraParameters Additional parameters to pass along to the event handler.
     * @returns {Elements}
     */
    trigger(events : string, extraParameters? : any) {
        this.each(function(item) {
            trigger(item, events, extraParameters);
        });
    }

    data(key? : string, value? : any) {
        if(key != null && value != null) {
            for(let i = 0; i < this.length; i++) {
                data(this[i], key, value);
            }
        }
        else {
            return data(this[0], key, value);
        }
    }

    show() {
        for(let i = 0; i < this.length; i++) {
            if(is.Mesh(this[i])) {
                global.scene.addMesh(this[i]);
                continue;
            }
            if(is.Material(this[i])) {
                global.scene.addMaterial(this[i]);
                continue;
            }
            if(is.Light(this[i])) {
                global.scene.addMaterial(this[i]);
                continue;
            }
            if(is.Texture(this[i])) {
                global.scene.addTexture(this[i]);
                continue;
            }
            if(is.Camera(this[i])) {
                global.scene.addCamera(this[i]);
                continue;
            }
        }
    }

    hide() {
        for(let i = 0; i < this.length; i++) {
            if(is.Mesh(this[i])) {
                global.scene.removeMesh(this[i]);
                continue;
            }
            if(is.Material(this[i])) {
                global.scene.removeMaterial(this[i]);
                continue;
            }
            if(is.Light(this[i])) {
                global.scene.removeMaterial(this[i]);
                continue;
            }
            if(is.Texture(this[i])) {
                global.scene.removeTexture(this[i]);
                continue;
            }
            if(is.Camera(this[i])) {
                global.scene.removeCamera(this[i]);
                continue;
            }
        }
    }

    dispose() {
        for(let i = 0; i < this.length; i++) {
            this[i].dispose();
            delete this[i];
        }
    }

    /**
     * Iterate over elements and executing a function for each element.
     * @param callback A function to execute for each element.
     * @returns {_r.Elements}
     */
    each(callback: Function) : Elements{
        for (let i = 0; i < this.length; i++) {
            /** We can break the .each() loop at a particular iteration by making the callback function return false. Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration. **/
            if(callback.call(this[i], this[i], i) == false) {
                return;
            }
        }
        return this;
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
        })
        result.length = length;
        return result;
    }

    /**
     * Reduce the set of matched elements to those that match the selector or pass the function’s test.
     * @param func A function used as a test for each element in the set. this is the current element.
     * @returns {_r.Elements}
     */
    filter(func : (obj : any) => boolean) : Elements{
        let result = new Elements();
        this.each(function(element) {
            if(func(element)) {
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
    attr(attribute : string, value?:any) {
        if (value != null) {
            this.each(function (item) {
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
        this.each(function (item) {
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
        var self = this;
        elements.forEach(function(element) {
            let base;
            if(element instanceof Elements) {
                base = element;
            }
            else {
                if(is.String(element)) {
                    base = new Elements(element);
                }
                else {
                    if(is.Array(element)) {
                        base = new Elements();
                        element.forEach(function(item) {
                            base[base.length++] = item;
                        })
                    }
                    else {
                        base = new Elements(element);
                    }
                }
            }
            base.each(function(item) {
                self[self.length++] = item;
            })
        });
        return this;
    }

    select(selector : string) {
        return find(selector, this);
    }

    // TODO
    patch(item : any) {

    }

    //TODO
    /**
     ready(callback : Function) {
        if(this.isReady) {
            callback.call(this, this);
        }
        else {

        }
    }**/

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

    //TODO
    fadeIn() {

    }

    // TODO
    fadeOut() {

    }

}

export function match(element : any, params : String) {

}

export function find(params : String, container : BABYLON.Scene | Elements | BABYLON.AssetContainer) : Elements {
        let i = 0;
        let res = [];
        // TODO : refactor this shit :
        params.split(',').forEach(function (selector) {
            selector = selector.trim();
            let types = [];
            if (selector.indexOf(':mesh') !== -1) {
                selector = selector.replace(':mesh', '');
                types.push("meshes");
            }
            if (selector.indexOf(':material') !== -1) {
                selector = selector.replace(':material', '');
                types.push("materials");
            }
            if (selector.indexOf(':light') !== -1) {
                selector = selector.replace(':light', '');
                types.push("lights");
            }
            if (selector.indexOf(':camera') !== -1) {
                selector = selector.replace(':camera', '');
                types.push("cameras");
            }
            if (selector.indexOf(':texture') !== -1) {
                selector = selector.replace(':texture', '');
                types.push("textures");
            }
            if (types.length == 0) {
                types = ["meshes", "materials", "lights", "cameras", "textures"];
            }
            var attributes = [];
            var regExpAttribute = /\[(.*?)\]/;
            var matched = regExpAttribute.exec(selector);
            if (matched) {
                selector = selector.replace(matched[0], '');
                var expr = matched[1];
                var operator;
                if (expr.indexOf('!=') != -1) {
                    operator = '!=';
                }
                else {
                    if (expr.indexOf('=') != -1) {
                        operator = '=';
                    }
                }

                if (operator) {
                    var split = expr.split(operator);
                    attributes.push({
                        'property': split[0],
                        'operator': operator,
                        'value': split[1].replace(/[""]/g, '')
                    })
                }
                else {
                    attributes.push({
                        'property': expr
                    })
                }
            };

        var exp = selector.replace(/\*/g, '.*'),
            regExp = new RegExp('^' + exp + '$');

        types.forEach(function (_type) {
            container[_type].forEach(function (_item) {
                if (regExp.test(_item.name)) {
                    if (attributes.length > 0) {
                        attributes.forEach(function (attribute) {
                            if (attribute.hasOwnProperty('operator')) {
                                if (_item.hasOwnProperty(attribute.property)) {
                                    switch (attribute.operator) {
                                        case '=':
                                            if (_item[attribute.property].toString() == attribute.value) {
                                                res[i++] = _item;
                                            }
                                            break;
                                        case '!=':
                                            if (_item[attribute.property].toString() != attribute.value) {
                                                res[i++] = _item;
                                            }
                                            break;
                                        default :
                                            console.error('BABYLON.Runtime._r : unrecognized operator ' + attribute.operator);
                                    }
                                }
                            }
                            else {
                                if (_item.hasOwnProperty(attribute.property)) {
                                    res[i++] = _item;
                                }
                            }
                        })
                    }
                    else {
                        res[i++] = _item;
                    }
                }
            });
        });
    });

    return new Elements(res);
}

