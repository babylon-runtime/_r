import { data } from "../data.js";
import { is } from "../is.js";

export function on(element: any, event: string, handler: (...args: any[]) => void, repeat = true) {
  if (!data(element, '_r.e')) {
    data(element, '_r.e', {});
  }
  let events = data(element, '_r.e');
  if (!events[event]) {
    events[event] = [];
  }
  events[event].push({
    handler: handler,
    repeat: repeat
  });
}

export function one(element: any, event: string, handler: (...args: any[]) => void) {
  on(element, event, handler, false);
}

export function trigger(element: any, event: string, ...extraParameters: any[]) {
  let events = data(element, '_r.e');
  if (!events) {
    return;
  }
  let handlers = events[event];
  if (is.Array(handlers)) {
    handlers.forEach(function(callback) {
      try {
        callback.handler.call(element, ...extraParameters);
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

export function off(element: any, event: string, handler?: (...args: any[]) => void) {
  let events = data(element, '_r.e');
  if (events[event]) {
    if (handler) {
      events[event] = events[event].filter(function(_handler) {
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