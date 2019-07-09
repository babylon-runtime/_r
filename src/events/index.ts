import * as e from "./core.js";
import { keys, offKeyEvent, oneKeyEvent, onKeyEvent } from "./keys.js";
import { onMesh, oneMesh, offMesh, meshes } from "./meshes.js";
import { global } from "../global.js";
import { is } from "../is.js";

export function on(event: string, handler: (...args: any[]) => void, repeat = true) {
  if (keys.indexOf(event) != -1) {
    onKeyEvent(event, handler, repeat);
  }
  else {
    e.on(this, event, handler, repeat);
  }
}

export function off(event: string, handler?: (...args: any[]) => void) {
  if (keys.indexOf(event) != -1) {
    offKeyEvent(event, handler);
  }
  else {
    e.off(this, event, handler);
  }
}

export function one(event: string, handler: (...args: any[]) => void) {
  if (keys.indexOf(event) != -1) {
    oneKeyEvent(event, handler);
  }
  else {
    e.one(this, event, handler);
  }
}
export function trigger(event: string, ...extraParameters: any[]) {
  e.trigger(this, event, ...extraParameters);
}

/**
 * Attach an event handler function for one or more e to the selected elements.
 * @param events One or more space-separated event types
 * @param handler A handler function previously attached for the event(s)
 * @returns {Elements}
 */
global.fn["on"] = function(events : string, handler : (args : any) => void) {
  this.each(function(item) {
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
global.fn["one"] = function(events : string, handler : (args : any) => void) {
  this.each(function(item) {
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
global.fn["off"] = function(events : string, handler? : (args : any) => void) {
  this.each(function(item) {
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
global.fn["trigger"] = function(events : string, ...extraParameters : any[]) {
  this.each(function(item) {
    e.trigger(item, events, ...extraParameters);
  });
};