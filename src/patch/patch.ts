import {is} from "../is.js";
import { select } from "../select.js";
import "../../node_modules/q/q.js";
declare const Q;

export function patch(...args) : Q.Promise<null> {

    let promises = [];
    if(args.length === 1) {
        args[0].forEach(function(item) {
            let selector = Object.getOwnPropertyNames(item)[0];
            select(selector).each(function(element) {
                promises.push(applyPatch(element, item[selector]));
            });
        })
    }
    else {
        console.error("not implemented");
    }
    return promises.reduce(Q.when, Q());
}

export function applyPatch(element : any, patch : any) : Q.Promise<null> {
    let properties = Object.getOwnPropertyNames(patch);
    let promises = [];
    properties.forEach(function(property) {
        promises.push(resolveProperty(element, property, patch));
    });
    return promises.reduce(Q.when, Q());
}

export function resolveProperty(element, property, source) : Q.Promise<any> {
    if(is.Primitive(source[property])) {
        element[property] = source[property];
        return Q();
    }
    else {
        if(is.Function(source[property])) {
            if(is.Function(element[property])) {
                element[property] = source[property];
                return Q();
            }
            else {
                element[property] = source[property].call(element);
            }
        }
        else {
            if(!element[property]) {
                element[property] = {};
            }
            return applyPatch(element[property], source[property]);
        }
    }
}