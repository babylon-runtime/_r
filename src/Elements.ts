import {BABYLON} from "./BABYLON.js";
import {global} from "./global.js";
import {is} from "./is.js";

const PROPERTIES = {
    ActionManager : "actionManagers",
    AnimationGroup: "animationGroups",
    Animation: "animations",
    Camera : "cameras",
    EffectLayer: "effectLayers",
    Geometry: "geometries",
    Layer: "layers",
    LensFlareSystem: "lensFlareSystems",
    Light: "lights",
    Mesh: "meshes",
    Material: "materials",
    MorphTargetManager: "morphTargetManagers",
    MultiMaterial: "multiMaterials",
    ParticleSystem: "particleSystems",
    ProceduralTexture: "proceduralTextures",
    ReflectionProbe: "reflectionProbes",
    Skeleton: "skeletons",
    Sound: "sounds",
    Texture: "textures"
};

export class Elements extends BABYLON.AssetContainer {
    length : number;
    constructor(...elements : any) {
        super(global.scene);
        this.length = 0;
        for(let i = 0; i < elements.length; i++) {
            this.add(elements[i])
        }
    }

    add(element : any) {
        if(is.AssetContainer(element) || is.Scene(element)) {
            for(let property in PROPERTIES) {
                let member = element[PROPERTIES[property]];
                if(member) {
                    this.add(member);
                }
            }
            return;
        }
        if(is.Array(element)) {
            for(let i = 0; i < element.length;i++) {
                this.add(element[i]);
            }
            return;
        }
        for (let property in PROPERTIES) {
            if(element instanceof BABYLON[property]) {
                this[this.length++] = element;
                this[PROPERTIES[property]].push(element);
                return;
            }
        }
        console.error("_r.elements unrecognized item : ", element);
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

    // TODO
    contains(element : any) {

    }

    //TODO
    fadeIn() {

    }

    // TODO
    fadeOut() {

    }

    /**
     * Attach an event handler function for one or more events to the selected elements.
     * @param events One or more space-separated event types
     * @param handler A handler function previously attached for the event(s)
     * @returns {Elements}
     */
    on(events : string, handler : (args : any) => void) {
        // TODO
    }

    /**
     * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
     * @param events One or more space-separated event types
     * @param handler A handler function previously attached for the event(s)
     * @returns {Elements}
     */
    one(events : string, handler : (args : any) => void) {
        // TODO
    }

    /**
     * Remove an event handler that were attached with .on()
     * @param events
     * @param handler A handler function previously attached for the event(s) or null to remove all handler attached for the event(s)
     * @returns {Elements}
     */
    off(events : string, handler? : (args : any) => void) {
       // TODO
    }

    /**
     * Execute all handlers and behaviors attached to the matched elements for the given event type.
     * @param events One or more space-separated event types
     * @param extraParameters Additional parameters to pass along to the event handler.
     * @returns {Elements}
     */
    trigger(events : string, extraParameters? : any) {
       // TODO
    }

    show() {
        super.addAllToScene();
    }

    hide() {
        super.removeAllFromScene();
    }

    dispose() {
        super.dispose();
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
    log(property?: string) : Elements{
        this.each(function (item) {
            if (property) {
                console.log(item[property]);
            }
            else {
                console.log(item);
            }
        });
        return this;
    }


    // TODO
    select(selector : string) {

    }

    // TODO
    patch(item : any) {

    }

}