(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global._r = factory());
}(this, (function () { 'use strict';

  console.log("babylon runtime v0.1.11")

  var is;
  (function (is) {
      function Function(functionToCheck) {
          var getType = {};
          return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
      }
      is.Function = Function;
      function Number(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
      }
      is.Number = Number;
      function PlainObject(n) {
          // Basic check for Type object that's not null
          if (typeof n == 'object' && n !== null) {
              // If Object.getPrototypeOf supported, use it
              if (typeof Object.getPrototypeOf == 'function') {
                  var proto = Object.getPrototypeOf(n);
                  return proto === Object.prototype || proto === null;
              }
              // Otherwise, use internal class
              // This should be reliable as if getPrototypeOf not supported, is pre-ES5
              return Object.prototype.toString.call(n) == '[object Object]';
          }
          // Not an object
          return false;
      }
      is.PlainObject = PlainObject;
      function AssetContainer(x) {
          return x instanceof BABYLON.AssetContainer;
      }
      is.AssetContainer = AssetContainer;
      function Scene(x) {
          return x instanceof BABYLON.Scene;
      }
      is.Scene = Scene;
      function TransformNode(x) {
          return x instanceof BABYLON.TransformNode;
      }
      is.TransformNode = TransformNode;
      function Array(x) {
          return window['Array'].isArray(x);
      }
      is.Array = Array;
      function Mesh(x) {
          return x instanceof BABYLON.AbstractMesh;
      }
      is.Mesh = Mesh;
      function Material(x) {
          return x instanceof BABYLON.Material;
      }
      is.Material = Material;
      function MultiMaterial(x) {
          return x instanceof BABYLON.MultiMaterial;
      }
      is.MultiMaterial = MultiMaterial;
      function Texture(x) {
          return x instanceof BABYLON.Texture;
      }
      is.Texture = Texture;
      function Light(x) {
          return x instanceof BABYLON.Light;
      }
      is.Light = Light;
      function Camera(x) {
          return x instanceof BABYLON.Camera;
      }
      is.Camera = Camera;
      function Vector3(x) {
          return x instanceof BABYLON.Vector3 || (is.Array(x) && x.length == 3);
      }
      is.Vector3 = Vector3;
      function Vector2(x) {
          return x instanceof BABYLON.Vector2;
      }
      is.Vector2 = Vector2;
      function Color(x) {
          //TODO
          //return HexColor(x) || x instanceof BABYLON.Color3 || x instanceof BABYLON.Color4 || _r.colorNames[x] != null || (is.String(x) && (x.trim().indexOf('rgb(') == 0 ||  x.trim().indexOf('rgba(') == 0));
          return HexColor(x) || x instanceof BABYLON.Color3 || x instanceof BABYLON.Color4 || (is.String(x) && (x.trim().indexOf('rgb(') == 0 || x.trim().indexOf('rgba(') == 0));
      }
      is.Color = Color;
      function HexColor(x) {
          return String(x) && x[0] == '#';
      }
      is.HexColor = HexColor;
      function Float(n) {
          return Number(n) === n && n % 1 !== 0;
      }
      is.Float = Float;
      function Int(n) {
          return Number(n) === n && n % 1 === 0;
      }
      is.Int = Int;
      function Quaternion(n) {
          return n instanceof BABYLON.Quaternion;
      }
      is.Quaternion = Quaternion;
      function Matrix(n) {
          return n instanceof BABYLON.Matrix;
      }
      is.Matrix = Matrix;
      function String(x) {
          return typeof x === "string";
      }
      is.String = String;
      function Size(n) {
          return n instanceof BABYLON.Size;
      }
      is.Size = Size;
      function PatchFile(expr) {
          return FileWithExtension(expr, ["runtime", "patch", "js"]);
      }
      is.PatchFile = PatchFile;
      function Boolean(expr) {
          return typeof expr == 'boolean';
      }
      is.Boolean = Boolean;
      /**
       * Camera || Light || Material || Mesh || Texture ||
       * @param x
       * @constructor
       */
      function BabylonNode(x) {
          return is.Camera(x) || is.Light(x) || is.Material(x) || is.Mesh(x) || is.Texture(x);
      }
      is.BabylonNode = BabylonNode;
      /**
       * Check is a javascript Object is a DOM Object
       * @param expr
       * @constructor
       */
      function DOM(expr) {
          // from https://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
          return (typeof HTMLElement === "object" ? expr instanceof HTMLElement : //DOM2
              expr && typeof expr === "object" && expr !== null && expr.nodeType === 1 && typeof expr.nodeName === "string");
      }
      is.DOM = DOM;
      DOM.canvas = function (expr) {
          return expr instanceof HTMLCanvasElement;
      };
      DOM.div = function (expr) {
          return expr instanceof HTMLDivElement;
      };
      DOM.image = function (expr) {
          return expr instanceof HTMLImageElement;
      };
      /**
       * Test for any Primitive
       * @param x
       * @returns {boolean}
       * @constructor
       */
      function Primitive(x) {
          return x !== Object(x);
      }
      is.Primitive = Primitive;
      function Promise(x) {
          return x && typeof x["then"] == 'function';
      }
      is.Promise = Promise;
      function FileWithExtension(file, ext) {
          if (typeof file !== 'string') {
              return false;
          }
          var split = file.split('.');
          if (split.length === 1) {
              return false;
          }
          var extension = split.pop().trim();
          if (is.Array(ext)) {
              ext = ext;
              for (var i = 0; i < ext.length; i++) {
                  var _ext = ext[i].trim();
                  if (_ext === extension || _ext === ('.' + extension)) {
                      return true;
                  }
              }
              return false;
          }
          else {
              return ext === extension || ext === ('.' + extension);
          }
      }
      is.FileWithExtension = FileWithExtension;
      function ImageFile(file) {
          return FileWithExtension(file, ["jpg", "jpeg", "png", "gif"]);
      }
      is.ImageFile = ImageFile;
  })(is || (is = {}));

  var _scene, _engine, _canvas;
  var global = /** @class */ (function () {
      function global() {
      }
      Object.defineProperty(global, "canvas", {
          get: function () {
              if (!_canvas) {
                  if (BABYLON.Engine.LastCreatedEngine) {
                      var canvas = BABYLON.Engine.LastCreatedEngine.getRenderingCanvas();
                      if (canvas) {
                          _canvas = canvas;
                          return _canvas;
                      }
                  }
                  _canvas = document.createElement('canvas');
                  _canvas.setAttribute('touch-action', 'none');
                  _canvas.style.width = "100%";
                  _canvas.style.height = "100%";
                  return _canvas;
              }
              return _canvas;
          },
          set: function (value) {
              if (is.String(value)) {
                  _canvas = document.getElementById(value);
              }
              else {
                  _canvas = value;
              }
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(global, "engine", {
          get: function () {
              if (!_engine) {
                  if (BABYLON.Engine.LastCreatedEngine) {
                      _engine = BABYLON.Engine.LastCreatedEngine;
                  }
                  else {
                      _engine = new BABYLON.Engine(global.canvas, true);
                  }
              }
              return _engine;
          },
          set: function (value) {
              _engine = value;
              // the canvas/window resize event handler
              window.addEventListener('resize', function () {
                  _engine.resize();
              });
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(global, "scene", {
          get: function () {
              if (!_scene) {
                  if (BABYLON.Engine.LastCreatedScene) {
                      _scene = BABYLON.Engine.LastCreatedScene;
                  }
                  else {
                      _scene = new BABYLON.Scene(global.engine);
                  }
              }
              return _scene;
          },
          set: function (value) {
              _scene = value;
          },
          enumerable: true,
          configurable: true
      });
      global.fn = {};
      global.TRACE = false;
      return global;
  }());

  var cache = [];
  var expando = '_r' + Date.now();
  /**
   * Attach any data to any js object (inspired by {@link https://api.jquery.com/data/ |jQuery.data()}).
   * @param element
   * @param key
   * @param value
   */
  function data(element, key, value) {
      if (!element.hasOwnProperty(expando)) {
          element[expando] = cache.length;
          cache[element[expando]] = {};
      }
      if (key != null) {
          if (value !== undefined) {
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
  global.fn["data"] = function (key, value) {
      if (key != null && value != null) {
          for (var i = 0; i < this.length; i++) {
              data(this[i], key, value);
          }
      }
      else {
          return data(this[0], key, value);
      }
  };

  function on(element, event, handler, repeat) {
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
  function one(element, event, handler) {
      on(element, event, handler, false);
  }
  function trigger(element, event) {
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
  function off(element, event, handler) {
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

  var e = /*#__PURE__*/Object.freeze({
    __proto__: null,
    on: on,
    one: one,
    trigger: trigger,
    off: off
  });

  function getQueryStringParameter(name, url) {
      if (!url) {
          url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
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
      var i = uri.indexOf('#');
      var hash = i === -1 ? '' : uri.substr(i);
      uri = i === -1 ? uri : uri.substr(0, i);
      var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
      var separator = uri.indexOf('?') !== -1 ? "&" : "?";
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
      }
      else if (uri.match(re)) {
          uri = uri.replace(re, '$1' + key + "=" + value + '$2');
      }
      else {
          uri = uri + separator + key + "=" + value;
      }
      return uri + hash;
  }
  var queryString = {
      get: function (name) {
          return getQueryStringParameter(name);
      },
      set: function (name, value) {
          if (history.pushState) {
              var newurl = updateUrlParameter(window.location.href, name, value);
              window.history.pushState({ path: newurl }, '', newurl);
          }
          this.trigger(name, value);
      },
      on: function (event, handler, repeat) {
          if (repeat === void 0) { repeat = true; }
          on(this, event, handler, repeat);
      },
      off: function (event, handler) {
          off(this, event, handler);
      },
      one: function (event, handler) {
          one(this, event, handler);
      },
      trigger: function (event, extraParameters) {
          trigger(this, event, extraParameters);
      },
  };

  /**
   * Merge the contents of two or more objects together into the first object.
   *
   * - If first parameter is equal to true, the merge becomes recursive (aka. deep copy). Passing false for this argument is not supported.
   * - When two or more object arguments are supplied to _r.extend(), properties from all of the objects are added to the target object. Arguments that are null or undefined are ignored.
   *
   * @param args
   * @returns {any}
   */
  function extend() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      /**
       * inspired by https://j11y.io/jquery/#v=1.11.2&fn=jQuery.extend
       * (https://github.com/jquery/jquery/blob/master/src/core.js)
       */
      var options, name, src, copy, isArray, clone, target = args[0], i = 1, length = args.length, deep = false;
      // Handle a deep copy situation
      if (typeof target === "boolean") {
          deep = target;
          target = arguments[1] || {};
          // skip the boolean and the target
          i++;
      }
      // Handle case when target is a string or something (possible in deep copy)
      if (typeof target !== "object" && !is.Function(target)) {
          target = {};
      }
      for (; i < length; i++) {
          // Only deal with non-null/undefined values
          if ((options = arguments[i]) != null) {
              // Extend the base object
              for (name in options) {
                  src = target[name];
                  copy = options[name];
                  // Prevent never-ending loop
                  if (target == copy) {
                      continue;
                  }
                  // Recurse if we're merging plain objects or arrays
                  if (deep && copy && (is.PlainObject(copy) || (isArray = is.Array(copy)))) {
                      if (isArray) {
                          isArray = false;
                          clone = src && is.Array(src) ? src : [];
                      }
                      else {
                          clone = src && is.PlainObject(src) ? src : {};
                      }
                      // Never move original objects, clone them
                      target[name] = extend(deep, clone, copy);
                  }
                  else {
                      // Don't bring in undefined values
                      if (copy !== undefined) {
                          target[name] = copy;
                      }
                  }
              }
          }
      }
      return target;
  }

  function activateCamera(camera) {
      if (global.scene.activeCamera) {
          global.scene.activeCamera.detachControl();
      }
      if (is.String(camera)) {
          global.scene.setActiveCameraByName(camera);
      }
      else {
          global.scene.activeCamera = camera;
      }
      global.scene.activeCamera.attachControl(global.canvas);
  }

  var plugins = [];
  function registerPlugin(plugin) {
      plugins.push(plugin);
  }
  function getPlugin(element, source, property) {
      var plugin = null;
      for (var i = 0; i < plugins.length; i++) {
          if (plugins[i].test(element, source, property)) {
              plugin = plugins[i];
          }
      }
      return plugin;
  }

  var Selector = /** @class */ (function () {
      function Selector(selector) {
          this.type = "all";
          var filters = [];
          var type = "all";
          var item = selector.trim();
          if (item.indexOf(":mesh") !== -1) {
              type = "mesh";
          }
          if (item.indexOf(":material") !== -1) {
              type = "material";
          }
          if (item.indexOf(":light") !== -1) {
              type = "light";
          }
          if (item.indexOf(":camera") !== -1) {
              type = "camera";
          }
          if (item.indexOf(":texture") !== -1) {
              type = "texture";
          }
          if (item.indexOf(":multimaterial") !== -1) {
              type = "multimaterial";
          }
          if (item.indexOf(':transformNode') !== -1) {
              type = "transformNode";
          }
          [":mesh", ":material", ":multimaterial", ":camera", ":light", ":texture", ":transformNode"].forEach(function (type) {
              item = item.replace(type, '');
          });
          // [isVisible][alpha!= 0.1]
          var regExpAttribute = /\[(.*?)\]/;
          var matches = [];
          var match;
          while (match = regExpAttribute.exec(selector)) {
              matches.push(match[1]);
              selector = selector.replace(regExpAttribute, '');
          }
          // TODO [material.diffuseTexture.name=texture*.jpg]
          matches.forEach(function (expr) {
              if (expr.indexOf('!=') !== -1) {
                  var split = expr.split('!=');
                  var left_1 = split[0].trim();
                  var right_1 = split[1].trim();
                  try {
                      right_1 = JSON.parse(right_1);
                  }
                  catch (_a) {
                      try {
                          right_1 = JSON.parse(JSON.stringify(right_1));
                      }
                      catch (_b) {
                          console.error("_r.select - incorrect parameter : " + right_1);
                      }
                  }
                  var func = function (element) {
                      var _split = left_1.split('.');
                      var _element = element;
                      for (var i = 0; i < _split.length; i++) {
                          if (_element != null && _element[_split[i]] != null) {
                              _element = _element[_split[i]];
                          }
                          else {
                              _element = null;
                          }
                      }
                      return _element != null && _element != right_1;
                  };
                  filters.push(func);
              }
              else {
                  if (expr.indexOf('=') !== -1) {
                      var split = expr.split('=');
                      var left_2 = split[0].trim();
                      var right_2 = split[1].trim();
                      try {
                          right_2 = JSON.parse(right_2);
                      }
                      catch (_c) {
                          try {
                              right_2 = JSON.parse(JSON.stringify(right_2));
                          }
                          catch (_d) {
                              console.error("_r.select - incorrect parameter : " + right_2);
                          }
                      }
                      var func = function (element) {
                          var _split = left_2.split('.');
                          var _element = element;
                          for (var i = 0; i < _split.length; i++) {
                              if (_element != null && _element[_split[i]] != null) {
                                  _element = _element[_split[i]];
                              }
                              else {
                                  _element = null;
                              }
                          }
                          return _element != null && _element == right_2;
                      };
                      filters.push(func);
                  }
                  else {
                      var func = function (element) {
                          var left = expr.trim();
                          var _split = left.split('.');
                          var _element = element;
                          for (var i = 0; i < _split.length; i++) {
                              if (_element != null && _element[_split[i]] != null) {
                                  _element = _element[_split[i]];
                              }
                              else {
                                  _element = null;
                              }
                          }
                          return _element != null;
                      };
                      filters.push(func);
                  }
              }
          });
          item = item.replace(regExpAttribute, '');
          // Here item only contains name selector i.e mesh.00*
          item = item.replace(/\./g, "\\.");
          var exp = item.replace(/\*/g, '.*');
          var regExp = new RegExp('^' + exp + '$');
          filters.push(function (element) {
              return element.hasOwnProperty('name') && regExp.test(element.name);
          });
          // TODO :not(selector)
          this.filters = filters;
          this.type = type;
      }
      Selector.prototype.matchFilters = function (element) {
          for (var i = 0; i < this.filters.length; i++) {
              if (!this.filters[i](element)) {
                  return false;
              }
          }
          return true;
      };
      Selector.prototype.matchType = function (element) {
          if (this.type == "all") {
              return true;
          }
          if (this.type == "mesh") {
              return is.Mesh(element);
          }
          if (this.type == "light") {
              return is.Light(element);
          }
          if (this.type == "material") {
              return is.Material(element);
          }
          if (this.type == "multimaterial") {
              return is.MultiMaterial(element);
          }
          if (this.type == "texture") {
              return is.Texture(element);
          }
          if (this.type == "camera") {
              return is.Camera(element);
          }
          if (this.type == "transformNode") {
              return is.TransformNode(element);
          }
      };
      return Selector;
  }());

  var Elements = /** @class */ (function () {
      function Elements() {
          var elements = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              elements[_i] = arguments[_i];
          }
          this.length = 0;
          for (var i = 0; i < elements.length; i++) {
              this.add(elements[i]);
          }
      }
      Elements.prototype.add = function (element) {
          if (is.Array(element)) {
              for (var i = 0; i < element.length; i++) {
                  this.add(element[i]);
              }
              return;
          }
          if (is.AssetContainer(element)) {
              for (var i = 0; i < element.meshes.length; i++) {
                  this[this.length++] = element.meshes[i];
              }
              for (var i = 0; i < element.lights.length; i++) {
                  this[this.length++] = element.lights[i];
              }
              for (var i = 0; i < element.materials.length; i++) {
                  this[this.length++] = element.materials[i];
              }
              for (var i = 0; i < element.textures.length; i++) {
                  this[this.length++] = element.textures[i];
              }
              for (var i = 0; i < element.cameras.length; i++) {
                  this[this.length++] = element.cameras[i];
              }
              return;
          }
          this[this.length++] = element;
      };
      Elements.prototype.contains = function (element) {
          return this.toArray().indexOf(element) !== -1;
      };
      /**
       * Iterate over elements and executing a function for each element.
       * @param callback A function to execute for each element.
       * @returns {_r.Elements}
       */
      Elements.prototype.each = function (callback) {
          for (var i = 0; i < this.length; i++) {
              /** We can break the .each() loop at a particular iteration by making the callback function return false. Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration. **/
              if (callback.call(this[i], this[i], i) == false) {
                  return;
              }
          }
          return this;
      };
      Elements.prototype.forEach = function (callback) {
          return this.each(callback);
      };
      /**
       * Pass each element in the current matched set through a function, producing a new jQuery object containing the return values.
       * @param func A function object that will be invoked for each element in the current set.
       * @returns {_r.Elements}
       */
      Elements.prototype.map = function (func) {
          var result = new Elements();
          var length = 0;
          this.each(function (element) {
              result[length++] = func(element);
          });
          result.length = length;
          return result;
      };
      /**
       * Reduce the set of matched elements to those that match the selector or pass the function’s test.
       * @param func A function used as a test for each element in the set. this is the current element.
       * @returns {_r.Elements}
       */
      Elements.prototype.filter = function (func) {
          var result = new Elements();
          this.each(function (element) {
              if (func(element)) {
                  result.add(element);
              }
          });
          return result;
      };
      /**
       * Retrieve all the elements contained in the set, as an array.
       * @returns {Array}
       */
      Elements.prototype.toArray = function () {
          var result = [];
          for (var i = 0; i < this.length; i++) {
              result.push(this[i]);
          }
          return result;
      };
      /**
       * Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.
       * @param attribute The name of the attribute to get.
       * @param value Optional value to set for the attribute.
       * @returns {any}
       */
      Elements.prototype.attr = function (attribute, value) {
          if (value != null) {
              this.each(function (item) {
                  item[attribute] = value;
              });
              return this;
          }
          else {
              return this[0][attribute];
          }
      };
      /**
       * Reduce the set of matched elements to the first in the set.
       * @returns {any}
       */
      Elements.prototype.first = function () {
          return this[0];
      };
      /**
       * @param property
       * @returns {_r.Elements}
       */
      Elements.prototype.log = function (property) {
          this.each(function (item) {
              if (property) {
                  console.log(item[property]);
              }
              else {
                  console.log(item);
              }
          });
      };
      /**
       * Insert elements in the set
       * @param elements
       * @returns {_r.Elements}
       */
      Elements.prototype.concat = function () {
          var elements = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              elements[_i] = arguments[_i];
          }
          elements.forEach(function (element) {
              var base;
              if (element instanceof Elements) {
                  base = element;
              }
              else {
                  if (is.String(element)) {
                      base = new Elements(element);
                  }
                  else {
                      if (is.Array(element)) {
                          base = new Elements();
                          element.forEach(function (item) {
                              base[base.length++] = item;
                          });
                      }
                      else {
                          base = new Elements(element);
                      }
                  }
              }
              base.each(function (item) {
                  this[this.length++] = item;
              });
          });
          return this;
      };
      Elements.prototype.select = function (selector) {
          if (this.length === 1 && is.Scene(this[0])) {
              return find(selector, this[0]);
          }
          else {
              return find(selector, this);
          }
      };
      /**
       * Disposes all the assets in the container
       */
      Elements.prototype.dispose = function () {
          for (var i = 0; i < this.length; i++) {
              this[i].dispose();
              delete this[i];
          }
      };
      Elements.prototype.addToScene = function () {
          this.each(function (element) {
              if (is.Camera(element)) {
                  global.scene.addCamera(element);
              }
              if (is.Mesh(element)) {
                  global.scene.addMesh(element);
              }
              if (is.Material(element)) {
                  global.scene.addMaterial(element);
              }
              if (is.MultiMaterial(element)) {
                  global.scene.addMultiMaterial(element);
              }
              if (is.Texture(element)) {
                  global.scene.addTexture(element);
              }
              if (is.Light(element)) {
                  global.scene.addLight(element);
              }
          });
          return this;
      };
      Elements.prototype.removeFromScene = function () {
          this.each(function (element) {
              if (is.Camera(element)) {
                  global.scene.removeCamera(element);
                  return false;
              }
              if (is.Mesh(element)) {
                  global.scene.removeMesh(element, true);
                  return false;
              }
              if (is.Material(element)) {
                  global.scene.removeMaterial(element);
                  return false;
              }
              if (is.MultiMaterial(element)) {
                  global.scene.removeMultiMaterial(element);
                  return false;
              }
              if (is.Texture(element)) {
                  global.scene.removeTexture(element);
                  return false;
              }
              if (is.Light(element)) {
                  global.scene.removeLight(element);
                  return false;
              }
          });
          return this;
      };
      // TODO
      Elements.prototype.remove = function (element) {
          /**
           let index = this.toArray().indexOf(element);
           if(index) {
      
              }
           for (let property in PROPERTIES) {
                  if(element instanceof BABYLON[property]) {
                      this[this.length++] = element;
                      super[PROPERTIES[property]].push(element);
                      return;
                  }
              }**/
      };
      return Elements;
  }());
  /**
   * Helper to debug selector.
   * @param element
   * @param selector
   * @returns {boolean} true if element match the selector, false otherwise
   */
  function match(element, params) {
      var _selector = new Selector(params);
      return _selector.matchType(element) && _selector.matchFilters(element);
  }
  function find(params, container) {
      var elements = new Elements();
      params.split(',').forEach(function (item) {
          item = item.trim();
          var selector = new Selector(item);
          if (is.Scene(container) || is.AssetContainer(container)) {
              container = container;
              switch (selector.type) {
                  case "material":
                      container.materials.forEach(function (material) {
                          if (selector.matchFilters(material)) {
                              elements.add(material);
                          }
                      });
                      break;
                  case "mesh":
                      container.meshes.forEach(function (mesh) {
                          if (selector.matchFilters(mesh)) {
                              elements.add(mesh);
                          }
                      });
                      break;
                  case "light":
                      container.lights.forEach(function (light) {
                          if (selector.matchFilters(light)) {
                              elements.add(light);
                          }
                      });
                      break;
                  case "multimaterial":
                      container.multiMaterials.forEach(function (material) {
                          console.log(material.name);
                          if (is.MultiMaterial(material)) {
                              if (selector.matchFilters(material)) {
                                  elements.add(material);
                              }
                          }
                      });
                      break;
                  case "texture":
                      container.textures.forEach(function (texture) {
                          if (selector.matchFilters(texture)) {
                              elements.add(texture);
                          }
                      });
                      break;
                  case "camera":
                      container.cameras.forEach(function (camera) {
                          if (selector.matchFilters(camera)) {
                              elements.add(camera);
                          }
                      });
                      break;
                  case "transformNode":
                      container.transformNodes.forEach(function (camera) {
                          if (selector.matchFilters(camera)) {
                              elements.add(camera);
                          }
                      });
                      break;
                  case "all":
                      container.materials.forEach(function (material) {
                          if (selector.matchFilters(material)) {
                              elements.add(material);
                          }
                      });
                      container.meshes.forEach(function (mesh) {
                          if (selector.matchFilters(mesh)) {
                              elements.add(mesh);
                          }
                      });
                      container.lights.forEach(function (light) {
                          if (selector.matchFilters(light)) {
                              elements.add(light);
                          }
                      });
                      container.textures.forEach(function (texture) {
                          if (selector.matchFilters(texture)) {
                              elements.add(texture);
                          }
                      });
                      container.cameras.forEach(function (camera) {
                          if (selector.matchFilters(camera)) {
                              elements.add(camera);
                          }
                      });
                      container.transformNodes.forEach(function (camera) {
                          if (selector.matchFilters(camera)) {
                              elements.add(camera);
                          }
                      });
              }
          }
          else {
              container = container;
              container.forEach(function (element) {
                  if (selector.matchType(element) && selector.matchFilters(element)) {
                      elements.add(element);
                  }
              });
          }
      });
      return elements;
  }

  function select(arg) {
      var elements;
      if (is.String(arg)) {
          if (arg.toLowerCase() === "scene") {
              return new Elements(global.scene);
          }
          elements = find(arg, global.scene);
          if (global.TRACE === true && elements.length == 0) {
              console.warn('BABYLON.Runtime::no object(s) found for selector "' + arg + '"');
          }
      }
      else {
          elements = new Elements(arg);
      }
      var _loop_1 = function (plugin) {
          Elements.prototype[plugin] = function () {
              var _a;
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              return (_a = global.fn[plugin]).call.apply(_a, [elements].concat(args));
          };
      };
      // plugins
      for (var plugin in global.fn) {
          _loop_1(plugin);
      }
      return elements;
  }

  var counter = 0;
  function load(resource, patch) {
      if (is.Array(resource)) {
          var promises_1 = [];
          resource = resource;
          resource.forEach(function (item) {
              promises_1.push(load(item));
          });
          return Promise.all(promises_1);
      }
      else {
          resource = resource;
          if (is.ImageFile(resource)) {
              return load.image(resource, patch);
          }
          if (is.FileWithExtension(resource, ['babylon', 'gltf', 'glb'])) {
              return load.assets(resource, patch);
          }
          if (is.FileWithExtension(resource, ['json'])) {
              return load.JSON(resource);
          }
          if (is.FileWithExtension(resource, ['js'])) {
              return load.script(resource);
          }
          if (is.FileWithExtension(resource, ['css'])) {
              return load.css(resource);
          }
          if (is.FileWithExtension(resource, ['patch'])) {
              return load.patch(resource);
          }
          if (is.FileWithExtension(resource, ['txt'])) {
              return load.ajax(resource);
          }
      }
  }
  load.image = function (image, patch) {
      return new Promise(function (resolve, reject) {
          var assetsManager = new BABYLON.AssetsManager(global.scene);
          var task = assetsManager.addImageTask('_r.preload.task' + counter++, image);
          task.onSuccess = function (task) {
              if (patch) {
                  return select(task.image).patch(patch).then(function () {
                      resolve(task.image);
                  });
              }
              else {
                  resolve(task.image);
              }
          };
          task.onError = function (task, message, exception) {
              console.error(message, exception);
              reject(message);
          };
          assetsManager.load();
      });
  };
  load.assets = function (scene, patch, progress) {
      var fileName = scene.split('/').pop();
      var root = scene.replace(fileName, '');
      BABYLON.SceneLoader.ShowLoadingScreen = false;
      return BABYLON.SceneLoader.LoadAssetContainerAsync(root, fileName, global.scene, progress).then(function (assetsContainer) {
          if (patch) {
              return select(assetsContainer).globalPatch(patch).then(function () {
                  BABYLON.SceneLoader.ShowLoadingScreen = true;
                  return assetsContainer;
              });
          }
          else {
              BABYLON.SceneLoader.ShowLoadingScreen = true;
              return assetsContainer;
          }
      });
  };
  load.material = function (name, patch) {
      var material = new BABYLON.StandardMaterial(name, global.scene);
      return select(material).patch(patch).then(function () {
          return material;
      });
  };
  load.pbr = function (name, patch) {
      var material = new BABYLON.PBRMaterial(name, global.scene);
      return select(material).patch(patch).then(function () {
          return material;
      });
  };
  load.texture = function (image, patch) {
      return load(image).then(function (img) {
          var texture = new BABYLON.Texture(image, global.scene);
          if (patch) {
              return select(texture).patch(patch).then(function () {
                  return texture;
              });
          }
          else {
              return texture;
          }
      }, function (err) {
          console.error(err);
      });
  };
  var cubeCounter = 0;
  load.cubeTexture = function (url, patch) {
      return new Promise(function (resolve, reject) {
          var assetsManager = new BABYLON.AssetsManager(global.scene);
          var task = assetsManager.addCubeTextureTask('_r.load.cubeTexture.' + cubeCounter++, url);
          task.onSuccess = function (task) {
              if (patch) {
                  select(task.texture).patch(patch).then(function () {
                      resolve(task.texture);
                  });
              }
              else {
                  resolve(task.texture);
              }
          };
          task.onError = function (reason) {
              reject(reason);
          };
          assetsManager.load();
      });
  };
  load.patch = function (file) {
      return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open("get", file, true);
          xhr.onload = function () {
              var status = xhr.status;
              if (status == 200) {
                  var data = void 0;
                  var isJson = false;
                  try {
                      data = JSON.parse(xhr.response);
                      isJson = true;
                  }
                  catch (error) {
                      isJson = false;
                  }
                  if (!isJson) {
                      try {
                          data = window["eval"].call(window, xhr.response);
                      }
                      catch (error) {
                          var __patch = void 0;
                          eval('var __patch = ' + xhr.response);
                          data = __patch;
                      }
                  }
                  if (data) {
                      resolve(data);
                  }
                  else {
                      console.warn('BABYLON.Runtime::no data found in ' + file);
                      resolve([{}]);
                  }
              }
              else {
                  reject(status);
              }
          };
          xhr.send();
      });
  };
  var ajaxCounter = 0;
  load.ajax = function (file) {
      return new Promise(function (resolve, reject) {
          var assetsManager = new BABYLON.AssetsManager(global.scene);
          var task = assetsManager.addTextFileTask('_r.load.ajax.' + ajaxCounter++, file);
          task.onSuccess = function (task) {
              resolve(task.text);
          };
          task.onError = function (reason) {
              reject(reason);
          };
          assetsManager.load();
      });
  };
  load.JSON = function (file) {
      return new Promise(function (resolve, reject) {
          load.ajax(file).then(function (text) {
              try {
                  var data = JSON.parse(text);
                  resolve(data);
              }
              catch (e) {
                  reject(e);
              }
          });
      });
  };
  load.script = function (file) {
      return new Promise(function (resolve, reject) {
          // Adding the script tag to the head as suggested before
          var script = document.createElement('script');
          // script.type = 'text/javascript';
          script.src = file;
          // Then bind the event to the callback function.
          // There are several events for cross browser compatibility.
          var resolved = false;
          script['onreadystatechange'] = function () {
              if (this.readyState === 'complete') {
                  if (resolved) {
                      return;
                  }
                  resolve();
                  resolved = true;
              }
          };
          script.onload = function () {
              if (resolved) {
                  return;
              }
              resolve();
              resolved = true;
          };
          // Fire the loading
          document.body.appendChild(script);
      });
  };
  load.css = function (file) {
      return new Promise(function (resolve, reject) {
          // Adding the script tag to the head as suggested before
          var link = document.createElement('link');
          link.type = 'text/css';
          link.href = file;
          link.rel = 'stylesheet';
          // Then bind the event to the callback function.
          // There are several events for cross browser compatibility.
          var resolved = false;
          link['onreadystatechange'] = function () {
              if (this.readyState === 'complete') {
                  if (resolved) {
                      return;
                  }
                  resolve();
                  resolved = true;
              }
          };
          link.onload = function () {
              if (resolved) {
                  return;
              }
              resolve();
              resolved = true;
          };
          // Fire the loading
          document.head.appendChild(link);
      });
  };

  function recursive(elements, func, promisify) {
      if (promisify === void 0) { promisify = true; }
      var index = 0;
      function recurse() {
          if (index === elements.length) {
              return;
          }
          else {
              var item = elements[index++];
              try {
                  var res_1 = func(item);
                  if (is.Promise(res_1)) {
                      return res_1.then(function () {
                          return recurse();
                      });
                  }
                  else {
                      return recurse();
                  }
              }
              catch (ex) {
                  return recurse();
              }
          }
      }
      var res = recurse();
      if (is.Promise(res)) {
          return res;
      }
      else {
          // Promisify
          if (promisify) {
              return new Promise(function (resolve) {
                  resolve();
              });
          }
          else {
              return res;
          }
      }
  }
  function globalPatchItem(patch, elements) {
      if (is.PatchFile(patch)) {
          return load.patch(patch).then(function (data) {
              return globalPatch(data, elements);
          });
      }
      else {
          var selectors = Object.getOwnPropertyNames(patch);
          var res = recursive(selectors, function (selector) {
              if (elements) {
                  var plugin = getPlugin(elements, patch, selector);
                  if (plugin) {
                      return plugin.resolve(elements, patch, selector);
                  }
              }
              else {
                  var plugin = getPlugin(global.scene, patch, selector);
                  if (plugin) {
                      return plugin.resolve(global.scene, patch, selector);
                  }
              }
              //console.log("call to find", selector, elements);
              var _elements;
              if (elements) {
                  _elements = find(selector, elements);
              }
              else {
                  _elements = find(selector, global.scene);
              }
              return patchElements(_elements.toArray(), patch[selector]);
          }, false);
          return res;
      }
  }
  function globalPatch(patch, elements) {
      if (!is.Array(patch)) {
          patch = [patch];
      }
      return recursive(patch, function (_patch) {
          return globalPatchItem(_patch, elements);
      }, false);
  }
  function patchElements(elements, patch, context) {
      return recursive(elements, function (element) {
          return patchElement(element, patch, context);
      }, false);
  }
  function patchElement(element, patch, context) {
      var properties = Object.getOwnPropertyNames(patch);
      if (context) {
          context.push(element);
      }
      else {
          context = [element];
      }
      return recursive(properties, function (property) {
          return patchProperty(element, patch, property, context);
      }, false);
  }
  function patchProperty(element, source, property, context) {
      var plugin = getPlugin(element, source, property);
      if (plugin) {
          return plugin.resolve(element, source, property, context);
      }
      else {
          if (is.Primitive(source[property])) {
              element[property] = source[property];
              return element[property];
          }
          if (is.Function(source[property])) {
              if (is.Function(element[property])) {
                  element[property] = source[property];
                  return element[property];
              }
              else {
                  var res = source[property].apply(element, context);
                  if (is.Promise(res)) {
                      return res.then(function (value) {
                          if (value) {
                              element[property] = value;
                          }
                      });
                  }
                  else {
                      element[property] = res;
                      return element[property];
                  }
              }
          }
          else {
              if (is.Promise(source[property])) {
                  return source[property].then(function (result) {
                      element[property] = result;
                  });
              }
              else {
                  if (is.PlainObject(source[property])) {
                      if (!element[property]) {
                          element[property] = {};
                      }
                      return patchElement(element[property], source[property], context);
                  }
              }
          }
      }
  }

  function patch(patch, promisify) {
      if (promisify === void 0) { promisify = true; }
      if (is.PatchFile(patch)) {
          return load.patch(patch).then(function (data) {
              var res = globalPatch(data);
              if (promisify && !is.Promise(res)) {
                  return new Promise(function (resolve) {
                      resolve(res);
                  });
              }
              else {
                  return res;
              }
          });
      }
      else {
          if (!is.Array(patch)) {
              patch = [patch];
          }
          var res_1 = globalPatch(patch);
          if (promisify && !is.Promise(res_1)) {
              return new Promise(function (resolve) {
                  resolve(res_1);
              });
          }
          else {
              return res_1;
          }
      }
  }
  patch.registerPlugin = registerPlugin;
  global.fn["patch"] = function (options, promisify) {
      if (promisify === void 0) { promisify = true; }
      var res = patchElements(this.toArray(), options);
      if (promisify && !is.Promise(res)) {
          return new Promise(function (resolve) {
              resolve(res);
          });
      }
      else {
          return res;
      }
  };
  global.fn["globalPatch"] = function (options, promisify) {
      if (promisify === void 0) { promisify = true; }
      var res = globalPatch(options, this.toArray());
      if (promisify && !is.Promise(res)) {
          return new Promise(function (resolve) {
              resolve(res);
          });
      }
      else {
          return res;
      }
  };

  var iFrameLoadingScreen = /** @class */ (function () {
      function iFrameLoadingScreen(url, id) {
          var _this = this;
          this._attached = false;
          this.iframe = document.createElement('iframe');
          this.iframe.src = url;
          if (id) {
              this.iframe.id = id;
          }
          this.iframe.addEventListener('transitionend', function () {
              if (!_this.isVisible) {
                  _this.parentNode.removeChild(_this.iframe);
                  _this._attached = false;
              }
          });
          this.iframe.classList.add('runtime-loadingScreen');
      }
      Object.defineProperty(iFrameLoadingScreen.prototype, "parentNode", {
          get: function () {
              return global.canvas.parentNode;
          },
          enumerable: true,
          configurable: true
      });
      iFrameLoadingScreen.prototype.displayLoadingUI = function () {
          var _this = this;
          if (!this._attached) {
              this.iframe.onload = function () {
                  if (_this.iframe.contentDocument) {
                      _this._contentDocument = _this.iframe.contentDocument;
                  }
                  else {
                      _this._contentDocument = _this.iframe.contentWindow.document;
                  }
                  _this.message = _this._message;
                  if (_this._progress) {
                      _this.progress = _this._progress;
                  }
              };
              this.parentNode.appendChild(this.iframe);
              this._attached = true;
          }
          this.iframe.classList.add('visible');
      };
      iFrameLoadingScreen.prototype.hideLoadingUI = function () {
          this.iframe.classList.remove('visible');
      };
      Object.defineProperty(iFrameLoadingScreen.prototype, "isVisible", {
          get: function () {
              return this.iframe.classList.contains('visible');
          },
          set: function (value) {
              if (value) {
                  this.displayLoadingUI();
              }
              else {
                  this.hideLoadingUI();
              }
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(iFrameLoadingScreen.prototype, "message", {
          get: function () {
              return this._message;
          },
          set: function (value) {
              this._message = value;
              if (this._contentDocument) {
                  var elements = this._contentDocument.getElementsByClassName('runtime-loading-message');
                  for (var i = 0; i < elements.length; i++) {
                      elements.item(i).innerHTML = value;
                  }
                  this.postMessage({
                      type: "message",
                      value: value
                  });
              }
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(iFrameLoadingScreen.prototype, "progress", {
          get: function () {
              return this._progress;
          },
          set: function (value) {
              this._progress = value;
              if (this._contentDocument) {
                  var elements = this._contentDocument.getElementsByClassName('runtime-loading-progress');
                  for (var i = 0; i < elements.length; i++) {
                      elements.item(i).innerHTML = value.toString() + '%';
                  }
                  this.postMessage({
                      type: "progress",
                      value: value
                  });
              }
          },
          enumerable: true,
          configurable: true
      });
      iFrameLoadingScreen.prototype.postMessage = function (data) {
          var _this = this;
          setTimeout(function () {
              var json = JSON.stringify(data);
              _this.iframe.contentWindow.postMessage(json.toString(), location.origin);
          }, 100);
      };
      return iFrameLoadingScreen;
  }());
  var loadingScreen = /** @class */ (function () {
      function loadingScreen() {
      }
      Object.defineProperty(loadingScreen, "instance", {
          get: function () {
              return this._instance;
          },
          enumerable: true,
          configurable: true
      });
      loadingScreen.iframe = function (url, id) {
          this.activate(new iFrameLoadingScreen(url, id));
          global.engine.loadingScreen = this._instance;
          return this._instance;
      };
      loadingScreen.activate = function (loadingScreen) {
          this._instance = loadingScreen;
      };
      Object.defineProperty(loadingScreen, "isVisible", {
          get: function () {
              if (this._instance) {
                  return this._instance.isVisible;
              }
              else {
                  var div = document.getElementById('babylonjsLoadingDiv');
                  if (div) {
                      return div.style.opacity === '1';
                  }
                  else {
                      return false;
                  }
              }
          },
          set: function (value) {
              if (this._instance) {
                  this._instance.isVisible = value;
              }
              else {
                  if (value) {
                      var div = document.getElementById('babylonjsLoadingDiv');
                      if (div && div.style.opacity === '0') {
                          div.style.opacity = '1';
                      }
                      global.engine.displayLoadingUI();
                  }
                  else {
                      global.engine.hideLoadingUI();
                  }
              }
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(loadingScreen, "message", {
          get: function () {
              if (this._instance) {
                  return this._instance.message;
              }
              else {
                  return global.engine.loadingScreen.loadingUIText;
              }
          },
          set: function (value) {
              if (this._instance) {
                  this.instance.message = value;
              }
              else {
                  global.engine.loadingScreen.loadingUIText = value;
              }
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(loadingScreen, "progress", {
          get: function () {
              if (this._instance) {
                  return this.instance.progress;
              }
              else {
                  console.error("TODO _r.loadingScreen");
              }
          },
          set: function (value) {
              if (this._instance) {
                  this.instance.progress = value;
              }
              else {
                  this.message += ' ' + value + '%';
              }
          },
          enumerable: true,
          configurable: true
      });
      loadingScreen.postMessage = function (key, value) {
          if (this._instance.postMessage) {
              this._instance.postMessage(key, value);
          }
          else {
              console.error('loadingScreen is not an iframe');
          }
      };
      return loadingScreen;
  }());

  var isReady = false;
  var callbacks = [];
  var options = {
      container: null,
      canvas: null,
      assets: null,
      scene: null,
      activeCamera: null,
      patch: null,
      ktx: false,
      enableOfflineSupport: false,
      progress: null,
      loadingScreen: null,
      load: null,
      babylon: null
  };
  function launch(obj) {
      isReady = false;
      options = extend(options, obj);
      return new Promise(function (resolve, reject) {
          _setup().then(function () {
              _createScene().then(function () {
                  _load().then(function () {
                      _patch().then(function () {
                          _checkActiveCamera();
                          _beforeFirstRender();
                          // RESIZE
                          window.addEventListener('resize', function () {
                              global.engine.resize();
                          });
                          global.engine.resize();
                          start();
                          isReady = true;
                          loadingScreen.isVisible = false;
                          callbacks.forEach(function (callback) {
                              try {
                                  callback.call(global.scene);
                              }
                              catch (ex) {
                                  console.error(ex);
                              }
                          });
                          callbacks.length = 0;
                          resolve(global.scene);
                      });
                  });
              }, function (err) {
                  reject(err);
              });
          });
      });
  }
  function _setup() {
      return _babylon().then(function () {
          // CANVAS
          if (options.canvas) {
              if (is.String(options.canvas)) {
                  var element = document.getElementById(options.canvas);
                  if (is.DOM.canvas(element)) {
                      global.canvas = element;
                  }
                  else {
                      console.error("_r.launch - " + options.canvas + "is not a valid HTMLCanvasElement");
                  }
              }
              else {
                  if (is.DOM.canvas(options.canvas)) {
                      global.canvas = options.canvas;
                  }
                  else {
                      console.error("_r.launch - canvas parameter should be a string or a HTMLCanvasElement");
                  }
              }
          }
          if (options.container) {
              if (is.String(options.container)) {
                  var parent_1 = document.getElementById(options.container);
                  parent_1.appendChild(global.canvas);
              }
              else {
                  options.container.appendChild(global.canvas);
              }
          }
          else {
              document.body.appendChild(global.canvas);
          }
          // KTX
          if (options.ktx) {
              if (is.Array(options.ktx)) {
                  global.engine.setTextureFormatToUse(options.ktx);
              }
              else {
                  if (options.ktx === true) {
                      global.engine.setTextureFormatToUse(['-astc.ktx', '-dxt.ktx', '-pvrtc.ktx', '-etc2.ktx']);
                  }
              }
          }
          // ENABLE OFFLINE SUPPORT
          if (options.enableOfflineSupport) {
              global.engine.enableOfflineSupport = options.enableOfflineSupport;
          }
          else {
              global.engine.enableOfflineSupport = false;
          }
          // LOADING SCREEN
          if (options.loadingScreen) {
              global.engine.loadingScreen = options.loadingScreen;
          }
          loadingScreen.isVisible = true;
      });
  }
  function _babylon() {
      if (options.babylon) {
          switch (options.babylon) {
              case 'preview':
                  return load('https://preview.babylonjs.com/babylon.js');
              case 'stable':
                  return load('https://cdn.babylonjs.com/babylon.js');
              default:
                  return load(options.babylon);
          }
      }
      else {
          return new Promise(function (resolve, reject) { resolve(); });
      }
  }
  function _createScene() {
      if (options.scene) {
          if (is.String(options.scene)) {
              // scene is a filename
              if (options.assets) {
                  return load.assets(options.assets + options.scene, null, function (evt) {
                      if (options.progress) {
                          options.progress(evt);
                      }
                  }).then(function (assetsContainer) {
                      assetsContainer.addAllToScene();
                  });
              }
              else {
                  return load.assets(options.scene, null, function (evt) {
                      if (options.progress) {
                          options.progress(evt);
                      }
                  }).then(function (assetsContainer) {
                      assetsContainer.addAllToScene();
                  });
              }
          }
          else {
              return new Promise(function (resolve, reject) {
                  if (is.Function(options.scene)) {
                      try {
                          var result = eval("var canvas=_r.canvas; var engine = _r.engine; var scene=_r.scene; var createScene=" + options.scene + ';createScene()');
                          if (BABYLON.Engine.LastCreatedEngine.scenes.length == 2) {
                              BABYLON.Engine.LastCreatedEngine.scenes[0].dispose();
                          }
                          if (is.Scene(result)) {
                              global.scene = result;
                          }
                          resolve();
                      }
                      catch (ex) {
                          reject(ex);
                          throw ex;
                      }
                  }
                  else {
                      if (is.Scene(options.scene)) {
                          global.scene = options.scene;
                          resolve();
                      }
                      else {
                          reject("invalid scene parameter in _r.launch");
                          throw new Error("invalid scene parameter in _r.launch");
                      }
                  }
              });
          }
      }
  }
  function _patch() {
      if (options.patch) {
          return patch(options.patch);
      }
      else {
          return new Promise(function (resolve) {
              resolve();
          });
      }
  }
  function _load() {
      if (options.load) {
          return load(options.load);
      }
      else {
          return new Promise(function (resolve) {
              resolve();
          });
      }
  }
  function _beforeFirstRender() {
      if (options.beforeFirstRender && is.Function(options.beforeFirstRender)) {
          options.beforeFirstRender();
      }
  }
  function _checkActiveCamera() {
      if (is.String(options.activeCamera)) {
          activateCamera(options.activeCamera);
      }
      else {
          if (is.Function(options.activeCamera)) {
              try {
                  var camera = options.activeCamera.call(global.scene);
                  activateCamera(camera.name);
              }
              catch (ex) {
                  console.error("_r.launch() error on activeCamera", ex);
              }
          }
          else {
              if (is.Camera(options.activeCamera)) {
                  activateCamera(options.activeCamera.name);
              }
          }
      }
      if (!global.scene.activeCamera && global.scene.cameras.length > 0) {
          activateCamera(global.scene.cameras[0].name);
      }
      if (global.scene.activeCamera && global.scene.activeCamera.inputs && !global.scene.activeCamera.inputs.attachedElement) {
          global.scene.activeCamera.attachControl(global.canvas);
      }
  }
  function loop() {
      global.scene.render();
  }
  function start() {
      global.engine.runRenderLoop(loop);
  }
  function ready(callback) {
      if (isReady) {
          callback.call(global.scene);
      }
      else {
          callbacks.push(callback);
      }
  }

  function loop$1() {
      global.scene.render();
  }
  function start$1() {
      global.engine.runRenderLoop(loop$1);
  }
  function pause() {
      global.engine.stopRenderLoop(loop$1);
  }

  var keys = [
      'OnKeyDownTrigger',
      'OnKeyUpTrigger'
  ];
  // see https://api.jquery.com/category/events/keyboard-events/
  function onKeyEvent(event, handler, repeat) {
      if (repeat === void 0) { repeat = true; }
      if (!global.scene.actionManager) {
          global.scene.actionManager = new BABYLON.ActionManager(global.scene);
      }
      var action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager[event], function (evt) {
          trigger(global.scene, event, evt);
      });
      global.scene.actionManager.registerAction(action);
      var events = data(global.scene, "_r.e");
      if (!events) {
          data(global.scene, "_r.e", []);
          events = data(global.scene, "_r.e");
      }
      if (!events[event]) {
          events[event] = [];
      }
      events[event].push({
          handler: handler,
          repeat: repeat,
          action: action
      });
  }
  function oneKeyEvent(event, handler) {
      onKeyEvent(event, handler, false);
  }
  function offKeyEvent(event, handler) {
      var events = data(global.scene, '_r.e');
      if (events[event]) {
          if (handler) {
              events[event] = events[event].filter(function (_event) {
                  if (_event.handler.toString() == handler.toString()) {
                      if (_event.action) {
                          var index = global.scene.actionManager.actions.indexOf(_event.action);
                          global.scene.actionManager.actions.splice(index, 1);
                      }
                      if (_event.listener) {
                          global.scene.removeEventListener(_event, _event.listener);
                      }
                  }
                  return _event.handler.toString() !== handler.toString();
              });
          }
          else {
              events[event] = [];
          }
      }
  }

  var meshes = [
      'OnDoublePickTrigger',
      'OnPickTrigger',
      'OnLeftPickTrigger',
      'OnRightPickTrigger',
      'OnCenterPickTrigger',
      'OnPickDownTrigger',
      'OnPickUpTrigger',
      'OnPickOutTrigger',
      'OnLongPressTrigger',
      'OnPointerOverTrigger',
      'OnPointerOutTrigger'
  ];
  function onMesh(mesh, event, handler, repeat) {
      if (repeat === void 0) { repeat = true; }
      if (!mesh.actionManager) {
          mesh.actionManager = new BABYLON.ActionManager(global.scene);
      }
      var action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager[event], function (evt) {
          trigger(mesh, event, evt);
      });
      if (!mesh.actionManager.hasSpecificTrigger(BABYLON.ActionManager[event])) {
          mesh.actionManager.registerAction(action);
      }
      var events = data(mesh, "_r.e");
      if (!events) {
          data(mesh, "_r.e", []);
          events = data(mesh, "_r.e");
      }
      if (!events[event]) {
          events[event] = [];
      }
      events[event].push({
          handler: handler,
          repeat: repeat,
          action: action
      });
  }
  function oneMesh(mesh, event, handler) {
      onMesh(mesh, event, handler, false);
  }
  function offMesh(mesh, event, handler) {
      var events = data(mesh, '_r.e');
      if (events && events[event]) {
          if (handler) {
              events[event] = events[event].filter(function (_event) {
                  if (_event.handler.toString() == handler.toString()) {
                      if (_event.action) {
                          var index = mesh.actionManager.actions.indexOf(_event.action);
                          mesh.actionManager.actions.splice(index, 1);
                      }
                      /** ??
                      if (_event.listener) {
                        mesh.removeEventListener(_event, _event.listener);
                      }**/
                  }
                  return _event.handler.toString() !== handler.toString();
              });
          }
          else {
              events[event] = [];
          }
      }
  }

  function on$1(event, handler, repeat) {
      if (repeat === void 0) { repeat = true; }
      if (keys.indexOf(event) != -1) {
          onKeyEvent(event, handler, repeat);
      }
      else {
          on(this, event, handler, repeat);
      }
  }
  function off$1(event, handler) {
      if (keys.indexOf(event) != -1) {
          offKeyEvent(event, handler);
      }
      else {
          off(this, event, handler);
      }
  }
  function one$1(event, handler) {
      if (keys.indexOf(event) != -1) {
          oneKeyEvent(event, handler);
      }
      else {
          one(this, event, handler);
      }
  }
  function trigger$1(event) {
      var extraParameters = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          extraParameters[_i - 1] = arguments[_i];
      }
      trigger.apply(e, [this, event].concat(extraParameters));
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
              on(item, events, handler);
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
              one(item, events, handler);
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
              off(item, events, handler);
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
          trigger.apply(e, [item, events].concat(extraParameters));
      });
  };

  function color(expr) {
      if (expr instanceof BABYLON.Color3 || expr instanceof BABYLON.Color4) {
          return expr;
      }
      if (is.HexColor(expr)) {
          return BABYLON.Color3.FromHexString(expr);
      }
      if (is.PlainObject(expr)) {
          if (expr.hasOwnProperty("r") || expr.hasOwnProperty("g") || expr.hasOwnProperty("b") || expr.hasOwnProperty("a")) {
              var r = expr["r"] || 0;
              var g = expr["g"] || 0;
              var b = expr["b"] || 0;
              if (expr["a"]) {
                  return new BABYLON.Color4(r, g, b, expr["a"]);
              }
              else {
                  return new BABYLON.Color3(r, g, b);
              }
          }
          else {
              console.error("_r.to.Color - invalid color : ", expr);
              return new BABYLON.Color3(0, 0, 0);
          }
      }
      if (is.Array(expr)) {
          if (expr.length == 3) {
              return BABYLON.Color3.FromArray(expr);
          }
          if (expr.length == 4) {
              return BABYLON.Color4.FromArray(expr);
          }
          console.error("_r.to.Color - invalid color : ", expr);
          return new BABYLON.Color3(0, 0, 0);
      }
      if (is.String(expr)) {
          expr = expr.trim().toLocaleLowerCase();
          if (expr.indexOf('rgb(') == 0) {
              var rgb = expr.substring(expr.indexOf('(') + 1, expr.lastIndexOf(')')).split(/,\s*/);
              var r = parseFloat(rgb[0]);
              var g = parseFloat(rgb[1]);
              var b = parseFloat(rgb[2]);
              return new BABYLON.Color3(!isNaN(r) ? (r / 255) : 0, !isNaN(g) ? (g / 255) : 0, !isNaN(b) ? (b / 255) : 0);
          }
          else {
              if (expr.indexOf('rgba(') == 0) {
                  var rgba = expr.substring(expr.indexOf('(') + 1, expr.lastIndexOf(')')).split(/,\s*/);
                  var r = parseFloat(rgba[0]);
                  var g = parseFloat(rgba[1]);
                  var b = parseFloat(rgba[2]);
                  var a = parseFloat(rgba[3]);
                  return new BABYLON.Color4(!isNaN(r) ? (r / 255) : 0, !isNaN(g) ? (g / 255) : 0, !isNaN(b) ? (b / 255) : 0, !isNaN(a) ? (a / 255) : 0);
              }
              else {
                  switch (expr) {
                      case 'red':
                          return BABYLON.Color3.Red();
                      case 'green':
                          return BABYLON.Color3.Green();
                      case 'blue':
                          return BABYLON.Color3.Blue();
                      case 'black':
                          return BABYLON.Color3.Black();
                      case 'white':
                          return BABYLON.Color3.White();
                      case 'purple':
                          return BABYLON.Color3.Purple();
                      case 'magenta':
                      case 'pink':
                          return BABYLON.Color3.Magenta();
                      case 'yellow':
                          return BABYLON.Color3.Yellow();
                      case 'teal':
                      case 'cyan':
                          return BABYLON.Color3.Teal();
                      case 'gray':
                      case 'grey':
                          return BABYLON.Color3.Gray();
                      case 'random':
                          return BABYLON.Color3.Random();
                      default:
                          console.error("_r.to.Color - invalid color : ", expr);
                          return new BABYLON.Color3(0, 0, 0);
                  }
              }
          }
      }
  }
  function color4(expr) {
      var _color = color(expr);
      return new BABYLON.Color4(_color.r, _color.g, _color.b, 1);
  }

  registerPlugin({
      test: function (element, source, property) {
          return !is.Function(source[property]) && element[property] instanceof BABYLON.Color3 || element[property] instanceof BABYLON.Color4;
      },
      resolve: function (element, source, property) {
          element[property] = color(source[property]);
          return element[property];
      }
  });

  registerPlugin({
      test: function (element, source, property) {
          return property === "forEach" || property === "*" || property === "each";
      },
      resolve: function (element, source, property, context) {
          //console.log("here is the context", property, context)
          //context.pop();
          var keyword;
          if (source["forEach"]) {
              keyword = "forEach";
          }
          else {
              if (source["*"]) {
                  keyword = "*";
              }
              else {
                  if (source["each"]) {
                      keyword = "each";
                  }
              }
          }
          var promises = [];
          if (is.Array(element)) {
              element.forEach(function (item) {
                  // clone context
                  var _context = context.slice();
                  _context.push(item);
                  promises.push(patchElement(item, source[keyword], _context));
              });
          }
          // Here Promises are parallel :/
          return Promise.all(promises);
      }
  });

  registerPlugin({
      test: function (element, source, property) {
          return ["diffuseFresnelParameters", "opacityFresnelParameters", "emissiveFresnelParameters", "refractionFresnelParameters", "reflectionFresnelParameters"].indexOf(property) !== -1
              && !element.target[property];
      },
      resolve: function (element, source, property) {
          return new BABYLON.FresnelParameters();
      }
  });

  registerPlugin({
      test: function (element, source, property) {
          return property === "execute" || property === "exec";
      },
      resolve: function (element, source, property, context) {
          try {
              var func = source[property];
              if (element) {
                  return func.apply(element, context);
              }
              else {
                  return func.apply(global.scene, context);
              }
          }
          catch (ex) {
              console.error(ex);
          }
      }
  });

  registerPlugin({
      test: function (element, source, property) {
          return property === "scene";
      },
      resolve: function (element, source, property) {
          if (is.Function(source[property])) {
              try {
                  global.scene = source[property]();
              }
              catch (ex) {
                  console.error(ex);
              }
          }
          else {
              return patchElement(global.scene, source[property]);
          }
      }
  });

  registerPlugin({
      test: function (element, source, property) {
          return property === "data";
      },
      resolve: function (element, source, property, context) {
          var data = source[property];
          var properties = Object.getOwnPropertyNames(data);
          var x = {};
          properties.forEach(function (property) {
              var _patch = data[property];
              if (is.Function(_patch)) {
                  x[property] = function () {
                      return _patch.apply(element, context);
                  };
                  select(element).data(property, x[property]);
              }
              else {
                  x[property] = _patch;
                  select(element).data(property, _patch);
              }
          });
      }
  });

  registerPlugin({
      test: function (element, source, property) {
          return ["on", "off", "trigger", "one"].indexOf(property) != -1;
      },
      resolve: function (element, source, property, context) {
          switch (property) {
              case "on":
                  Object.getOwnPropertyNames(source[property]).forEach(function (event) {
                      var handler = source[property][event];
                      if (is.Function(handler)) {
                          return select(element).on(event, handler);
                      }
                      else {
                          select(element).on(event, function () {
                              return select(element).patch(source[property][event]);
                          });
                      }
                  });
                  break;
              case "off":
                  if (is.String(source[property])) {
                      return select(element).off(source[property]);
                  }
                  else {
                      Object.getOwnPropertyNames(source[property]).forEach(function (event) {
                          select(element).off(event, source[property][event]);
                      });
                  }
                  break;
              case "trigger":
                  if (is.String(source[property])) {
                      return select(element).trigger(source[property]);
                  }
                  else {
                      Object.getOwnPropertyNames(source[property]).forEach(function (event) {
                          return select(element).trigger(event, source[property][event]);
                      });
                  }
                  break;
              case "one":
                  Object.getOwnPropertyNames(source[property]).forEach(function (event) {
                      var handler = source[property][event];
                      if (is.Function(handler)) {
                          return select(element).one(event, handler);
                      }
                      else {
                          select(element).one(event, function () {
                              return select(element).patch(source[property][event]);
                          });
                      }
                  });
                  break;
          }
      }
  });

  registerPlugin({
      test: function (element, source, property) {
          return false;
          //return source[property] && is.String(source[property]) && (is.Material(element) || is.Texture(element));
      },
      resolve: function (element, source, property, context) {
          /**
          if (is.Material(element)) {
            let elements = select(source[property] + ':material');
            if (elements.length != 0) {
              element = elements[0];
            }
          }
          if (is.Texture(element)) {
            let elements = select(source[property] + ':texture');
            if (elements.length != 0) {
              element = elements[0];
            }
          }**/
      }
  });

  registerPlugin({
      test: function (element, source, property) {
          return property === "patchParallel";
      },
      resolve: function (element, source, property, context) {
          var promises = [];
          if (element) {
              source[property].forEach(function (_patch) {
                  promises.push(select(element).patch(_patch));
              });
          }
          else {
              source[property].forEach(function (_patch) {
                  promises.push(patch(_patch));
              });
          }
          return Promise.all(promises);
      }
  });

  function getEasingFunction(easing) {
      var mode;
      // rtec
      var func;
      if (easing.indexOf("easeInOut") != -1) {
          mode = BABYLON.EasingFunction.EASINGMODE_EASEINOUT;
          func = easing.replace("easeInOut", "");
      }
      else {
          if (easing.indexOf("easeIn") != -1) {
              mode = BABYLON.EasingFunction.EASINGMODE_EASEIN;
              func = easing.replace("easeIn", "");
          }
          else {
              if (easing.indexOf("easeOut") != -1) {
                  mode = BABYLON.EasingFunction.EASINGMODE_EASEOUT;
                  func = easing.replace("easeOut", "");
              }
              else {
                  console.warn("_r.animate - unrecognized easing function : " + easing + '. Please use something from https://easings.net/');
                  return null;
              }
          }
      }
      var easingFunction;
      switch (func) {
          case "Sine":
              easingFunction = new BABYLON.SineEase();
              easingFunction.setEasingMode(mode);
              return easingFunction;
          case "Quad":
              easingFunction = new BABYLON.QuadraticEase();
              easingFunction.setEasingMode(mode);
              return easingFunction;
          case "Cubic":
              easingFunction = new BABYLON.CubicEase();
              easingFunction.setEasingMode(mode);
              return easingFunction;
          case "Quart":
              easingFunction = new BABYLON.QuarticEase();
              easingFunction.setEasingMode(mode);
              return easingFunction;
          case "Quint":
              easingFunction = new BABYLON.QuinticEase();
              easingFunction.setEasingMode(mode);
              return easingFunction;
          case "Expo":
              easingFunction = new BABYLON.ExponentialEase();
              easingFunction.setEasingMode(mode);
              return easingFunction;
          case "Circ":
              easingFunction = new BABYLON.CircleEase();
              easingFunction.setEasingMode(mode);
              return easingFunction;
          case "Back":
              easingFunction = new BABYLON.BackEase();
              easingFunction.setEasingMode(mode);
              return easingFunction;
          case "Elastic":
              easingFunction = new BABYLON.ElasticEase();
              easingFunction.setEasingMode(mode);
              return easingFunction;
          case "Bounce":
              easingFunction = new BABYLON.BounceEase();
              easingFunction.setEasingMode(mode);
              return easingFunction;
          default:
              console.warn("_r.animate - unrecognized easing function " + easing + '.Please use something from https://easings.net/');
              return null;
      }
  }
  function getLoopMode(options) {
      if (is.Boolean(options.loop)) {
          if (options.loop) {
              return BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT;
          }
      }
      if (is.String(options.loop)) {
          if (options.loop.toLowerCase() == "cycle") {
              return BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE;
          }
          if (options.loop.toLocaleLowerCase() == "relative" || this.loop.toLocaleLowerCase() == "pingpong") {
              return BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE;
          }
      }
      else {
          if (is.Number(options.loop)) {
              return options.loop;
          }
      }
      return BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT;
  }
  function getAnimationType(element, property) {
      if (is.Vector2(element[property])) {
          return BABYLON.Animation.ANIMATIONTYPE_VECTOR2;
      }
      if (is.Vector3(element[property])) {
          return BABYLON.Animation.ANIMATIONTYPE_VECTOR3;
      }
      if (is.Number(element[property])) {
          return BABYLON.Animation.ANIMATIONTYPE_FLOAT;
      }
      if (is.Color(element[property])) {
          return BABYLON.Animation.ANIMATIONTYPE_COLOR3;
      }
      if (is.Quaternion(element[property])) {
          return BABYLON.Animation.ANIMATIONTYPE_QUATERNION;
      }
      if (is.Matrix(element[property])) {
          return BABYLON.Animation.ANIMATIONTYPE_MATRIX;
      }
      if (is.Size(element[property])) {
          return BABYLON.Animation.ANIMATIONTYPE_SIZE;
      }
      return null;
  }
  function isAnimatable(element, property) {
      return getAnimationType(element, property) !== null;
  }
  function getKeys(element, property, newValue, options) {
      if (options.keys) {
          return options.keys;
      }
      var initial = element[property];
      var final;
      switch (getAnimationType(element, property)) {
          case BABYLON.Animation.ANIMATIONTYPE_COLOR3:
              final = initial.clone();
              select(final).patch(color(newValue));
              break;
          case BABYLON.Animation.ANIMATIONTYPE_FLOAT:
              final = newValue;
              break;
          case BABYLON.Animation.ANIMATIONTYPE_MATRIX:
              final = initial.clone();
              select(final).patch(newValue);
              break;
          default:
              final = initial.clone();
              var properties = Object.getOwnPropertyNames(newValue);
              properties.forEach(function (property) {
                  final[property] = newValue[property];
              });
              break;
      }
      return [
          {
              frame: 0,
              value: initial
          },
          {
              frame: options.fps * options.duration,
              value: final
          }
      ];
  }
  function getAnimationsForElement(element, patch, options) {
      var animations = [];
      var properties = Object.getOwnPropertyNames(patch);
      if (!element.animations) {
          element.animations = [];
      }
      properties.forEach(function (property) {
          if (!isAnimatable(element, property)) {
              console.error(property + " is not animatable");
          }
          else {
              var animation = new BABYLON.Animation("_r.animation" + element.animations.length, property, options.fps, getAnimationType(element, property), getLoopMode(options));
              var keys = getKeys(element, property, patch[property], options);
              animation.setKeys(keys);
              if (options.easing) {
                  animation.setEasingFunction(getEasingFunction(options.easing));
              }
              // element.animations.push(animation);
              animations.push(animation);
          }
      });
      return animations;
  }
  function findSomethingToAnimate(element, patch) {
      var properties = Object.getOwnPropertyNames(patch);
      var animatables = [];
      properties.forEach(function (property) {
          if (isAnimatable(element, property)) {
              animatables.push({
                  element: element,
                  property: property,
                  patch: patch[property]
              });
          }
          else {
              if (!is.Primitive(patch[property])) {
                  var _animatables = findSomethingToAnimate(element[property], patch[property]);
                  animatables = animatables.concat(_animatables);
              }
              else {
                  return [];
              }
          }
      });
      return animatables;
  }
  var defaultOptions = {
      fps: 30,
      duration: 0.4,
      speedRatio: 1,
      loopMode: false
  };
  function getOptions(options) {
      var _options = {};
      if (!options) {
          options = 0.4;
      }
      if (is.Number(options)) {
          _options.duration = options;
          _options.loop = false;
      }
      else {
          _options = options;
          if (_options.loop) {
              if (is.Boolean(_options.loop) && _options.loop) {
                  _options.loop = 'cycle';
              }
          }
          else {
              _options.loop = false;
          }
      }
      _options = extend({}, defaultOptions, _options);
      return _options;
  }
  var count = 0;
  function animate(elements, patch, options) {
      var _elements = select(elements);
      var _options = getOptions(options);
      var group = new BABYLON.AnimationGroup("_r.animate.AnimationsGroup" + count++);
      _elements.each(function (item) {
          var _animatables = findSomethingToAnimate(item, patch);
          _animatables.forEach(function (animatable) {
              var _element = animatable.element;
              var _patch = {};
              _patch[animatable.property] = animatable.patch;
              var animations = getAnimationsForElement(_element, _patch, _options);
              animations.forEach(function (animation) {
                  group.addTargetedAnimation(animation, _element);
              });
          });
      });
      group.speedRatio = _options.speedRatio;
      if (_options.complete) {
          group.onAnimationGroupEndObservable.add(_options.complete);
      }
      group.onAnimationEndObservable.add(function (targetedAnimation) {
          var index = targetedAnimation.target.animations.indexOf(targetedAnimation.animation);
          targetedAnimation.target.animations = targetedAnimation.target.animations.splice(index, 1);
      });
      if (_options.loop != false) {
          group.play(true);
      }
      else {
          group.play();
      }
      return group;
  }
  global.fn["animate"] = function (patch, options) {
      return animate(this.toArray(), patch, options);
  };
  global.fn["fadeOut"] = function (options) {
      var _options = getOptions(options);
      var group = new BABYLON.AnimationGroup("_r.animate.AnimationsGroup" + count++);
      this.each(function (item) {
          var animations = [];
          if (is.Mesh(item)) {
              animations = getAnimationsForElement(item, {
                  visibility: 0
              }, _options);
          }
          if (is.Material(item)) {
              animations = getAnimationsForElement(item, {
                  alpha: 0
              }, _options);
          }
          if (is.Texture(item)) {
              animations = getAnimationsForElement(item, {
                  level: 0
              }, _options);
          }
          if (is.Light(item)) {
              animations = getAnimationsForElement(item, {
                  intensity: 0
              }, _options);
          }
          animations.forEach(function (animation) {
              group.addTargetedAnimation(animation, item);
          });
      });
      group.speedRatio = _options.speedRatio;
      if (_options.complete) {
          group.onAnimationGroupEndObservable.add(_options.complete);
      }
      group.play();
      return group;
  };
  global.fn["fadeIn"] = function (options) {
      var _options = getOptions(options);
      var group = new BABYLON.AnimationGroup("_r.animate.AnimationsGroup" + count++);
      this.each(function (item) {
          var animations = [];
          if (is.Mesh(item)) {
              animations = getAnimationsForElement(item, {
                  visibility: 1
              }, _options);
          }
          if (is.Material(item)) {
              animations = getAnimationsForElement(item, {
                  alpha: 1
              }, _options);
          }
          if (is.Texture(item)) {
              animations = getAnimationsForElement(item, {
                  level: 1
              }, _options);
          }
          if (is.Light(item)) {
              animations = getAnimationsForElement(item, {
                  intensity: 1
              }, _options);
          }
          animations.forEach(function (animation) {
              group.addTargetedAnimation(animation, item);
          });
      });
      group.speedRatio = _options.speedRatio;
      if (_options.complete) {
          group.onAnimationGroupEndObservable.add(_options.complete);
      }
      group.play();
      return group;
  };
  /**
   * Stop the currently-running animation, remove all queued animations, and complete all animations for the matched elements.
   */
  global.fn["finish"] = function () {
      this.each(function (item) {
          var animatables = global.scene.getAllAnimatablesByTarget(item);
          animatables.forEach(function (animatable) {
              animatable.stop();
          });
          item.animations = [];
      });
  };

  // from https://doc.babylonjs.com/snippets/normals
  function showMeshNormals(mesh, size, _color) {
      hideMeshNormals(mesh);
      var normals = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
      var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
      _color = color(_color);
      size = size || 1;
      var lines = [];
      for (var i = 0; i < normals.length; i += 3) {
          var v1 = BABYLON.Vector3.FromArray(positions, i);
          var v2 = v1.add(BABYLON.Vector3.FromArray(normals, i).scaleInPlace(size));
          lines.push([v1.add(mesh.position), v2.add(mesh.position)]);
      }
      var normalLines = BABYLON.MeshBuilder.CreateLineSystem("_r.normals." + mesh.uniqueId, { lines: lines }, global.scene);
      normalLines.color = _color;
      data(mesh, '_r.normals', normalLines);
      return normalLines;
  }
  function hideMeshNormals(mesh) {
      var normalLines = data(mesh, '_r.normals');
      if (normalLines) {
          normalLines.dispose();
      }
  }
  function showNormals(selector, size, color) {
      if (size === void 0) { size = 1; }
      if (color === void 0) { color = "red"; }
      if (selector) {
          select(selector).each(function (item) {
              if (is.Mesh(item)) {
                  showMeshNormals(item, size, color);
              }
          });
      }
      else {
          global.scene.meshes.forEach(function (mesh) {
              showMeshNormals(mesh, size, color);
          });
      }
  }
  function hideNormals(selector) {
      if (selector) {
          select(selector).each(function (item) {
              if (is.Mesh(item)) {
                  hideMeshNormals(item);
              }
          });
      }
      else {
          global.scene.meshes.forEach(function (mesh) {
              hideMeshNormals(mesh);
          });
      }
  }

  function showMeshWireframe(mesh, epsilon, width, color) {
      if (mesh.edgesRenderer == undefined) {
          mesh.enableEdgesRendering(epsilon);
          mesh.edgesColor = color;
          mesh.edgesWidth = width;
      }
      else {
          mesh.enableEdgesRendering(epsilon);
          mesh.edgesColor = color;
          mesh.edgesWidth = width;
          mesh.edgesRenderer.isEnabled = true;
      }
  }
  function hideMeshWireframe(mesh) {
      if (mesh.edgesRenderer) {
          mesh.edgesRenderer.isEnabled = false;
      }
  }
  function showWireframe(selector, epsilon, width, _color) {
      if (epsilon === void 0) { epsilon = 1; }
      if (width === void 0) { width = 1; }
      if (_color === void 0) { _color = new BABYLON.Color4(130 / 255, 230 / 255, 1, 0.85); }
      if (selector) {
          select(selector).each(function (item) {
              if (is.Mesh(item)) {
                  showMeshWireframe(item, epsilon, width, color(_color));
              }
          });
      }
      else {
          global.scene.meshes.forEach(function (mesh) {
              showMeshWireframe(mesh, epsilon, width, color(_color));
          });
      }
  }
  function hideWireframe(selector) {
      if (selector) {
          select(selector).each(function (item) {
              if (is.Mesh(item)) {
                  hideMeshWireframe(item);
              }
          });
      }
      else {
          global.scene.meshes.forEach(function (mesh) {
              hideMeshWireframe(mesh);
          });
      }
  }

  // Create utility layer the gizmo will be rendered on
  var utilLayer;
  function initUtilLayer() {
      if (!utilLayer) {
          utilLayer = new BABYLON.UtilityLayerRenderer(global.scene);
      }
  }
  function showMeshGizmo(mesh, gizmoType, axis, color) {
      var gizmo;
      gizmoType = (typeof gizmoType === 'string') ? gizmoType.toLowerCase() : gizmoType;
      axis = (typeof axis === 'string') ? axis.toLowerCase() : axis;
      hideMeshGizmo(mesh);
      switch (gizmoType) {
          case 'position':
              gizmo = new BABYLON.PositionGizmo(utilLayer);
              break;
          case 'rotation':
              gizmo = new BABYLON.RotationGizmo(utilLayer);
              break;
          case 'scale':
              gizmo = new BABYLON.ScaleGizmo(utilLayer);
              break;
          case 'boundingbox':
          default:
              gizmo = new BABYLON.BoundingBoxGizmo(color, utilLayer);
              break;
      }
      gizmo.attachedMesh = mesh;
      if (axis && gizmo.xGizmo) {
          console.info('_r : gizmo axis works only with BABYLON > 4.0.3, actual is: ' + BABYLON.Engine.Version);
          gizmo.xGizmo.isEnabled = axis.indexOf('x') !== -1;
          gizmo.yGizmo.isEnabled = axis.indexOf('y') !== -1;
          gizmo.zGizmo.isEnabled = axis.indexOf('z') !== -1;
          // Keep the gizmo fixed to world rotation
          gizmo.updateGizmoRotationToMatchAttachedMesh = false;
          gizmo.updateGizmoPositionToMatchAttachedMesh = true;
      }
      select(mesh).data('runtime-gizmo', gizmo);
      return gizmo;
  }
  function hideMeshGizmo(mesh) {
      var gizmo = select(mesh).data('runtime-gizmo');
      if (gizmo) {
          gizmo.dispose();
          select(mesh).data('runtime-gizmo', null);
      }
  }
  function showGizmo(selector, gizmoType, axis, _color) {
      if (_color === void 0) { _color = new BABYLON.Color3(130 / 255, 230 / 255, 1); }
      var result = [];
      initUtilLayer();
      if (selector) {
          select(selector).each(function (item) {
              if (is.Mesh(item)) {
                  result.push(showMeshGizmo(item, gizmoType, axis, _color));
              }
          });
      }
      else {
          global.scene.meshes.forEach(function (mesh) {
              result.push(showMeshGizmo(mesh, gizmoType, axis, _color));
          });
      }
      return result;
  }
  function hideGizmo(selector) {
      if (selector) {
          select(selector).each(function (item) {
              if (is.Mesh(item)) {
                  hideMeshGizmo(item);
              }
          });
      }
      else {
          global.scene.meshes.forEach(function (mesh) {
              hideMeshGizmo(mesh);
          });
      }
  }

  function show(params, selector) {
      var split = params.split(',');
      split.forEach(function (param) {
          switch (param.trim()) {
              case "normals":
                  showNormals(selector);
                  break;
              case "wireframe":
                  showWireframe(selector);
                  break;
              case "gizmo":
                  showGizmo(selector);
                  break;
              default:
                  console.error(param + " is not supported by _r.show");
          }
      });
  }
  function hide(params, selector) {
      var split = params.split(',');
      split.forEach(function (param) {
          switch (param.trim()) {
              case "normals":
                  hideNormals(selector);
                  break;
              case "wireframe":
                  hideWireframe(selector);
                  break;
              case "gizmo":
                  hideGizmo(selector);
                  break;
              default:
                  console.error(param + " is not supported by _r.hide");
          }
      });
  }
  (function (show) {
      show.normals = showNormals;
      show.wireframe = showWireframe;
      show.gizmo = showGizmo;
  })(show || (show = {}));
  (function (hide) {
      hide.normals = hideNormals;
      hide.wireframe = hideWireframe;
      hide.gizmo = hideGizmo;
  })(hide || (hide = {}));

  var router = {
      hashChangedListener: [],
      set: function (hash) {
          window.location.hash = hash;
      },
      get: function () {
          if (window.location.hash.length > 1) {
              return window.location.hash.substr(1);
          }
      },
      on: function (event, handler, repeat) {
          if (repeat === void 0) { repeat = true; }
          if (is.Function(event)) {
              this.hashChangedListener.push(event);
          }
          else {
              on(this, event, handler, repeat);
          }
      },
      off: function (event, handler) {
          off(this, event, handler);
      },
      one: function (event, handler) {
          one(this, event, handler);
      },
      trigger: function (event, extraParameters) {
          if (!this.pause) {
              this.hashChangedListener.forEach(function (listener) {
                  listener(event);
              });
              trigger(this, event, extraParameters);
          }
      },
      pause: false
  };
  function hashChangeListener(evt) {
      router.trigger(router.get());
  }
  window.addEventListener("hashchange", hashChangeListener);

  function merge(target, source, excluded) {
      var others = {};
      Object.getOwnPropertyNames(source).forEach(function (property) {
          if (!excluded || excluded.indexOf(property) == -1) {
              others[property] = source[property];
          }
      });
      target = extend(target, others);
      return target;
  }

  global.fn['freeze'] = function () {
      this.forEach(function (item) {
          if (is.Mesh(item)) {
              item.freezeWorldMatrix();
          }
          if (is.Material(item)) {
              item.freeze();
          }
      });
  };
  global.fn['unfreeze'] = function () {
      this.forEach(function (item) {
          if (is.Mesh(item)) {
              item.unfreezeWorldMatrix();
          }
          if (is.Material(item)) {
              item.unfreeze();
          }
      });
  };

  var index = {
      get canvas() {
          return global.canvas;
      },
      set canvas(value) {
          global.canvas = value;
      },
      get scene() {
          return global.scene;
      },
      set scene(value) {
          global.scene = value;
      },
      get engine() {
          return global.engine;
      },
      set engine(value) {
          global.engine = value;
      },
      get TRACE() {
          return global.TRACE;
      },
      set TRACE(value) {
          global.TRACE = value;
      },
      activateCamera: activateCamera,
      launch: launch,
      ready: ready,
      start: start$1,
      pause: pause,
      data: data,
      on: on$1,
      off: off$1,
      one: one$1,
      trigger: trigger$1,
      select: select,
      patch: patch,
      match: match,
      is: is,
      color: color,
      color4: color4,
      animate: animate,
      activeCamera: activateCamera,
      fn: global.fn,
      queryString: queryString,
      router: router,
      show: show,
      hide: hide,
      loadingScreen: loadingScreen,
      extend: extend,
      merge: merge,
      load: load
  };

  return index;

})));
//# sourceMappingURL=_r.js.map
