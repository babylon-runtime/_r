import {is} from "./is.js";

/**
 * Merge the contents of two or more objects together into the first object.
 *
 * - If first parameter is equal to true, the merge becomes recursive (aka. deep copy). Passing false for this argument is not supported.
 * - When two or more object arguments are supplied to _r.extend(), properties from all of the objects are added to the target object. Arguments that are null or undefined are ignored.
 *
 * @param args
 * @returns {any}
 */
export function extend(...args : any[]) : any {
    /**
     * inspired by https://j11y.io/jquery/#v=1.11.2&fn=jQuery.extend
     * (https://github.com/jquery/jquery/blob/master/src/core.js)
     */
    var options, name, src, copy, isArray, clone,
        target = args[0],
        i = 1,
        length = args.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i++;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !is.Function(target) ) {
        target = {};
    }

    for(; i < length; i++) {
        // Only deal with non-null/undefined values
        if((options = arguments[i]) != null) {
            // Extend the base object
            for(name in options) {
                src = target[name];
                copy = options[name];
                // Prevent never-ending loop
                if(target == copy) {
                    continue;
                }
                // Recurse if we're merging plain objects or arrays
                if(deep && copy && (is.PlainObject(copy) || (isArray = is.Array(copy)))) {
                    if(isArray) {
                        isArray = false;
                        clone = src && is.Array(src) ? src : [];
                    }
                    else {
                        clone = src && is.PlainObject(src) ? src : {}
                    }
                    // Never move original objects, clone them
                    target[name] = extend(deep, clone, copy)
                }
                else {
                    // Don't bring in undefined values
                    if(copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
    }
    return target;
}