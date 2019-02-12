import {is} from "./is.js";
import {Elements, find} from "./Elements.js";
import {libraries} from "./library.js";
import {global} from "./global.js";

export function select(arg) {
    if(is.String(arg)) {
        if((<string> arg).toLowerCase() === "scene") {
            let elements = new Elements();
            elements[0] = global.scene;
            elements.length = 1;
            return elements;
        }
        let elements = find(arg, global.scene);
        // elements could be in a library not attached to the scene

        for(let lib in libraries) {
            let selection = libraries[lib].select(arg);
            selection.each(function(item) {
                // item could be in multiple libraries
                if(!elements.contains(item)) {
                    elements.add(item);
                }
            });
        }
        if(global.TRACE === true && elements.length == 0) {
            console.warn('BABYLON.Runtime::no object(s) found for selector "' + arg + '"')
        }
        return elements;
    }
    else {
        return new Elements(arg);
    }
}