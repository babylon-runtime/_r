
import {Elements} from "./Elements.js";

var libraries = [];

export function createLibrary(name : string, ...elements : Array<any> | any) {
    if(libraries[name]) {
        console.error("Error in _r.createLibrary : " + name + " already exists");
        return;
    }
    else {
        libraries[name] = new Elements(elements);
    }
}

export function library(name : string) : Elements {
    return libraries[name];
}
