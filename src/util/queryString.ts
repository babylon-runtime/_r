import { on, off, one, trigger } from "../events/core.js";

function getQueryStringParameter(name, url?) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function updateUrlParameter(uri, key, value) {
  // remove the hash part before operating on the uri
  let i = uri.indexOf('#');
  let hash = i === -1 ? ''  : uri.substr(i);
  uri = i === -1 ? uri : uri.substr(0, i);

  let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  let separator = uri.indexOf('?') !== -1 ? "&" : "?";

  if (!value) {
    // remove key-value pair if value is empty
    uri = uri.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), '');
    if (uri.slice(-1) === '?') {
      uri = uri.slice(0, -1);
    }
    // replace first occurrence of & by ? if no ? is present
    if (uri.indexOf('?') === -1) {
      uri = uri.replace(/&/, '?');
    }
  } else if (uri.match(re)) {
    uri = uri.replace(re, '$1' + key + "=" + value + '$2');
  } else {
    uri = uri + separator + key + "=" + value;
  }
  return uri + hash;
}

export let queryString = {
  get : function(name) {
    return getQueryStringParameter(name);
  },
  set : function(name, value) {
    if (history.pushState) {
      let newurl = updateUrlParameter(window.location.href, name, value);
      window.history.pushState(
        {path: newurl},
        '',
        newurl);
    }
    this.trigger(name, value);
  },
  on : function(event: string, handler: (...args: any[]) => void, repeat = true) {
    on(this, event, handler, repeat);
  },
  off : function(event: string, handler?: (...args: any[]) => void) {
    off(this, event, handler);
  },
  one : function(event: string, handler: (...args: any[]) => void) {
    one(this, event, handler);
  },
  trigger : function(event: string, extraParameters?: any) {
    trigger(this, event, extraParameters);
  },
};