import { off, on, one, trigger } from "../events/core.js";
import { is } from "../is.js";

export let router = {
  hashChangedListener : [],
  set : function(hash : string) {
    window.removeEventListener("hashchange", hashChangeListener);
    window.location.hash = hash;
    this.trigger(hash);
    window.addEventListener("hashchange", hashChangeListener);
  },
  get : function() {
    if (window.location.hash.length > 1) {
      return window.location.hash.substr(1);
    }
  },
  on : function(event: string | Function, handler?: (...args: any[]) => void, repeat = true) {
    if (is.Function(event)) {
      this.hashChangedListener.push(event);
    }
    else {
      on(this, <string> event, handler, repeat);
    }
  },
  off : function(event: string, handler?: (...args: any[]) => void) {
    off(this, event, handler);
  },
  one : function(event: string, handler: (...args: any[]) => void) {
    one(this, event, handler);
  },
  trigger : function(event: string, extraParameters?: any) {
    if (!this.pause) {
      this.hashChangedListener.forEach((listener) => {
        listener(event);
      });
      trigger(this, event, extraParameters);
    }
  },
  pause : false
};

function hashChangeListener(evt) {
  router.trigger(router.get());
}

window.addEventListener("hashchange", hashChangeListener);