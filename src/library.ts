import {is} from "./is.js";
import {BABYLON} from "./BABYLON.js";
import {global} from "./global.js";

export class Library {
    assetContainer : BABYLON.AssetContainer;
    private PROPERTIES = {
        ActionManager : "actionManagers",
        AnimationGroup: "animationGroups",
        Animation: "animations",
        Camera : "cameras",
        EffectLayer: "effectLayers",
        Geometry: "geometries",
        Layer: "layers",
        LensFlareSystem: "lensFlareSystems",
        Light: "lights",
        ShadowLight : "lights",
        Material: "materials",
        Mesh: "meshes",
        MorphTargetManager: "morphTargetManagers",
        MultiMaterial: "multiMaterials",
        ParticleSystem: "particleSystems",
        ProceduralTexture: "proceduralTextures",
        ReflectionProbe: "reflectionProbes",
        Skeleton: "skeletons",
        Sound: "sounds",
        Texture: "textures"
    };

    constructor(public name : string, ...elements : any) {
        if(elements.length == 1 && is.AssetContainer(elements[0])) {
            this.assetContainer = elements[0];
        }
        else {
            this.assetContainer = new BABYLON.AssetContainer(global.scene);
            for(let i = 0; i < elements.length; i++) {
                this.add(elements[i])
            }
        }
    }

    add(element : any) {
        if(is.Array(element)) {
            var self = this;
            element.forEach(function(_element) {
                self.add(_element);
            });
            return;
        }
        for (let property in this.PROPERTIES) {
            if(element instanceof BABYLON[property]) {
                this.assetContainer[this.PROPERTIES[property]].push(element);
                return;
            }
        }

        console.error("_r.library accepts only mesh, camera, light and material", element);
    }

    show() {
        this.assetContainer.addAllToScene();
    }

    hide() {
        this.assetContainer.removeAllFromScene();
    }

    // TODO
    select(selector : string) {

    }

    // TODO
    dispose() {

    }
}


var libraries = [];

export function createLibrary(name : string, ...elements : Array<any> | any) {
    if(libraries[name]) {
        console.error("Error in _r.createLibrary : " + name + " already exists");
        return;
    }
    else {
        libraries[name] = new Library(name, ...elements);

    }
}

export function library(name : string) : Library {
    return libraries[name];
}
