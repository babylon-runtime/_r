import * as e from "./core.js";
import { keys, offKeyEvent, oneKeyEvent, onKeyEvent } from "./keys.js";
import { onMesh, oneMesh, offMesh, meshes } from "./meshes.js";
import { global } from "../global.js";
import { is } from "../is.js";
export function on(event, handler, repeat) {
    if (repeat === void 0) { repeat = true; }
    if (keys.indexOf(event) != -1) {
        onKeyEvent(event, handler, repeat);
    }
    else {
        e.on(this, event, handler, repeat);
    }
}
export function off(event, handler) {
    if (keys.indexOf(event) != -1) {
        offKeyEvent(event, handler);
    }
    else {
        e.off(this, event, handler);
    }
}
export function one(event, handler) {
    if (keys.indexOf(event) != -1) {
        oneKeyEvent(event, handler);
    }
    else {
        e.one(this, event, handler);
    }
}
export function trigger(event) {
    var extraParameters = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        extraParameters[_i - 1] = arguments[_i];
    }
    e.trigger.apply(e, [this, event].concat(extraParameters));
}
/**
 * Attach an event handler function for one or more e to the selected elements.
 * @param events One or more space-separated event types
 * @param handler A handler function previously attached for the event(s)
 * @returns {Elements}
 */
global.fn["on"] = function (events, handler) {
    this.each(function (item) {
        if (is.Mesh(item) && meshes.indexOf(events) !== -1) {
            onMesh(item, events, handler);
        }
        else {
            e.on(item, events, handler);
        }
    });
};
/**
 * Attach a handler to an event for the elements. The handler is executed at most once per element per event type.
 * @param events One or more space-separated event types
 * @param handler A handler function previously attached for the event(s)
 * @returns {Elements}
 */
global.fn["one"] = function (events, handler) {
    this.each(function (item) {
        if (is.Mesh(item) && meshes.indexOf(events) !== -1) {
            oneMesh(item, events, handler);
        }
        else {
            e.one(item, events, handler);
        }
    });
};
/**
 * Remove an event handler that were attached with .on()
 * @param events
 * @param handler A handler function previously attached for the event(s) or null to remove all handler attached for the event(s)
 * @returns {Elements}
 */
global.fn["off"] = function (events, handler) {
    this.each(function (item) {
        if (is.Mesh(item) && meshes.indexOf(events) !== -1) {
            offMesh(item, events, handler);
        }
        else {
            e.off(item, events, handler);
        }
    });
};
/**
 * Execute all handlers and behaviors attached to the matched elements for the given event type.
 * @param events One or more space-separated event types
 * @param extraParameters Additional parameters to pass along to the event handler.
 * @returns {Elements}
 */
global.fn["trigger"] = function (events) {
    var extraParameters = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        extraParameters[_i - 1] = arguments[_i];
    }
    this.each(function (item) {
        e.trigger.apply(e, [item, events].concat(extraParameters));
    });
};
//# sourceMappingURL=index.js.map