import { is } from "./is.js";
import { global } from "./global.js";

let cache = [];
let expando = '_r' + Date.now();

/**
 * Attach any data to any js object (inspired by {@link https://api.jquery.com/data/ |jQuery.data()}).
 * @param element
 * @param key
 * @param value
 */
export function data(element : any, key?: string, value?: any) {
    if (!element.hasOwnProperty(expando)) {
        element[expando] = cache.length;
        cache[element[expando]] = {};
    }
    if (key != null) {
        if (value != null) {
            cache[element[expando]][key] = value;
        }
        else {
            return cache[element[expando]][key];
        }
    }
    else {
        return cache[element[expando]];
    }
}

global.fn["data"] = function(key? : string, value? : any) {
    if (key != null && value != null) {
        for (let i = 0; i < this.length; i++) {
            data(this[i], key, value);
        }
    }
    else {
        return data(this[0], key, value);
    }
};