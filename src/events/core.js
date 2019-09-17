import { data } from "../data.js";
import { is } from "../is.js";
export function on(element, event, handler, repeat) {
    if (repeat === void 0) { repeat = true; }
    if (!data(element, '_r.e')) {
        data(element, '_r.e', {});
    }
    var events = data(element, '_r.e');
    if (!events[event]) {
        events[event] = [];
    }
    events[event].push({
        handler: handler,
        repeat: repeat
    });
}
export function one(element, event, handler) {
    on(element, event, handler, false);
}
export function trigger(element, event) {
    var extraParameters = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        extraParameters[_i - 2] = arguments[_i];
    }
    var events = data(element, '_r.e');
    if (!events) {
        return;
    }
    var handlers = events[event];
    if (is.Array(handlers)) {
        handlers.forEach(function (callback) {
            var _a;
            try {
                (_a = callback.handler).call.apply(_a, [element].concat(extraParameters));
                if (!callback.repeat) {
                    off(element, event, callback.handler);
                }
            }
            catch (ex) {
                console.error("_r.trigger exception", ex);
            }
        });
    }
}
export function off(element, event, handler) {
    var events = data(element, '_r.e');
    if (events[event]) {
        if (handler) {
            events[event] = events[event].filter(function (_handler) {
                if (_handler.handler.toString() == handler.toString()) {
                    events[event].splice(events[event].indexOf(_handler), 1);
                }
            });
        }
        else {
            events[event] = [];
        }
    }
}
//# sourceMappingURL=core.js.map