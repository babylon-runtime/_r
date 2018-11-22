import {extend} from "./extend.js";

export function merge(target: any, source: any, excluded? : Array<string>): any {
    var others = {};
    Object.getOwnPropertyNames(source).forEach(function(property) {
        if(!excluded || excluded.indexOf(property) == -1) {
            others[property] = source[property];
        }
    });
    target = extend(target, others);
    return target;
}