var _r = (function (BABYLON) {
  'use strict';

  console.log("babylon runtime v0.0.5")

  // this will let us :

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
          if (typeof expr !== 'string') {
              return false;
          }
          var split = expr.split('.');
          var extension = split[split.length - 1].trim();
          return extension == 'runtime' || extension == 'patch' || extension == 'js';
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
                  document.body.appendChild(_canvas);
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
      global.TRACE = false;
      return global;
  }());

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
      global.scene.setActiveCameraByName(camera);
      global.scene.activeCamera.attachControl(global.canvas);
      if (global.TRACE) {
          console.groupCollapsed("[_r] - activate camera " + global.scene.activeCamera.name);
          console.log(global.scene.activeCamera);
          console.groupEnd();
      }
  }

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

  function on(element, event, handler, repeat) {
      if (repeat === void 0) { repeat = true; }
      if (!data(element, '_r.events')) {
          data(element, '_r.events', {});
      }
      var events = data(element, '_r.events');
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
  function trigger(element, event, extraParameters) {
      var events = data(element, '_r.events');
      if (!events) {
          return;
      }
      var handlers = events[event];
      if (is.Array(handlers)) {
          handlers.forEach(function (callback) {
              try {
                  callback.handler.call(element, extraParameters);
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
      var events = data(element, '_r.events');
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

  var meshEvents = [
      'NothingTrigger ',
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
      'OnPointerOutTrigger',
      'OnEveryFrameTrigger',
      'OnIntersectionEnterTrigger',
      'OnIntersectionExitTrigger',
      'OnKeyDownTrigger',
      'OnKeyUpTrigger'
  ];
  function onMesh(mesh, event, handler, repeat) {
      if (repeat === void 0) { repeat = true; }
      if (!mesh.actionManager) {
          mesh.actionManager = new BABYLON.ActionManager(global.scene);
      }
      var action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager[event], function (evt) {
          trigger(mesh, event, evt);
      });
      mesh.actionManager.registerAction(action);
      var events = data(mesh, "_r.events");
      if (!events) {
          data(mesh, "_r.events", []);
          events = data(mesh, "_r.events");
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
      var events = data(mesh, '_r.events');
      if (events[event]) {
          if (handler) {
              events[event] = events[event].filter(function (_event) {
                  if (_event.handler.toString() == handler.toString()) {
                      if (_event.action) {
                          var index = mesh.actionManager.actions.indexOf(_event.action);
                          mesh.actionManager.actions.splice(index, 1);
                      }
                      if (_event.listener) {
                          mesh.removeEventListener(_event, _event.listener);
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
          [":mesh", ":material", ":multimaterial", ":camera", ":light", ":texture"].forEach(function (type) {
              item = item.replace(type, '');
          });
          // [isVisible][alpha!= 0.1]
          var regExpAttribute = /\[(.*?)\]/;
          var matches = [];
          var match;
          while (match = regExpAttribute.exec(selector)) {
              matches.push(match[1]);
          }
          // TODO [material.diffuseTexture.name=texture*.jpg]
          matches.forEach(function (expr) {
              if (expr.indexOf('!=') !== -1) {
                  var split = expr.split('!=');
                  filters.push(function (element) {
                      if (element.hasOwnProperty(split[0])) {
                          return element[split[0]] != split[1];
                      }
                      return false;
                  });
              }
              else {
                  if (expr.indexOf('=') !== -1) {
                      filters.push(function (element) {
                          if (element.hasOwnProperty(split[0])) {
                              return element[split[0]] == split[1];
                          }
                          return false;
                      });
                  }
                  else {
                      filters.push(function (element) {
                          return element.hasOwnProperty(expr);
                      });
                  }
              }
          });
          item = item.replace(regExpAttribute, '');
          // Here item only contains name selector i.e mesh.00*
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
          if (is.AssetContainer(element) /**|| is.Scene(element)**/) {
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
       * Attach an event handler function for one or more events to the selected elements.
       * @param events One or more space-separated event types
       * @param handler A handler function previously attached for the event(s)
       * @returns {Elements}
       */
      Elements.prototype.on = function (events, handler) {
          this.each(function (item) {
              if (is.Mesh(item) && meshEvents.indexOf(events) !== -1) {
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
      Elements.prototype.one = function (events, handler) {
          this.each(function (item) {
              if (is.Mesh(item) && meshEvents.indexOf(events) !== -1) {
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
      Elements.prototype.off = function (events, handler) {
          this.each(function (item) {
              if (is.Mesh(item) && meshEvents.indexOf(events) !== -1) {
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
      Elements.prototype.trigger = function (events, extraParameters) {
          this.each(function (item) {
              trigger(item, events, extraParameters);
          });
      };
      Elements.prototype.data = function (key, value) {
          if (key != null && value != null) {
              for (var i = 0; i < this.length; i++) {
                  data(this[i], key, value);
              }
          }
          else {
              return data(this[0], key, value);
          }
      };
      Elements.prototype.show = function () {
          for (var i = 0; i < this.length; i++) {
              if (is.Mesh(this[i])) {
                  global.scene.addMesh(this[i]);
                  continue;
              }
              if (is.Material(this[i])) {
                  global.scene.addMaterial(this[i]);
                  continue;
              }
              if (is.Light(this[i])) {
                  global.scene.addMaterial(this[i]);
                  continue;
              }
              if (is.Texture(this[i])) {
                  global.scene.addTexture(this[i]);
                  continue;
              }
              if (is.Camera(this[i])) {
                  global.scene.addCamera(this[i]);
                  continue;
              }
          }
      };
      Elements.prototype.hide = function () {
          for (var i = 0; i < this.length; i++) {
              if (is.Mesh(this[i])) {
                  global.scene.removeMesh(this[i]);
                  continue;
              }
              if (is.Material(this[i])) {
                  global.scene.removeMaterial(this[i]);
                  continue;
              }
              if (is.Light(this[i])) {
                  global.scene.removeMaterial(this[i]);
                  continue;
              }
              if (is.Texture(this[i])) {
                  global.scene.removeTexture(this[i]);
                  continue;
              }
              if (is.Camera(this[i])) {
                  global.scene.removeCamera(this[i]);
                  continue;
              }
          }
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
      };
      Elements.prototype.removeFromScene = function () {
          this.each(function (element) {
              if (is.Camera(element)) {
                  global.scene.removeCamera(element);
                  return false;
              }
              if (is.Mesh(element)) {
                  global.scene.removeMesh(element);
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
      };
      // TODO
      Elements.prototype.patch = function (item) {
      };
      //TODO
      /**
       ready(callback : Function) {
            if(this.isReady) {
                callback.call(this, this);
            }
            else {
    
            }
        }**/
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
      //TODO
      Elements.prototype.fadeIn = function () {
      };
      // TODO
      Elements.prototype.fadeOut = function () {
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
                      container.materials.forEach(function (material) {
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
              }
          }
          else {
              container.each(function (element) {
                  if (selector.matchType(element) && selector.matchFilters(element)) {
                      elements.add(element);
                  }
              });
          }
      });
      return elements;
  }

  var libraries = [];
  function createLibrary(name) {
      var elements = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          elements[_i - 1] = arguments[_i];
      }
      if (libraries[name]) {
          console.error("[_r] Error in _r.createLibrary : " + name + " already exists");
          return;
      }
      else {
          var _elements = new Elements(elements);
          libraries[name] = _elements;
          if (global.TRACE) {
              console.groupCollapsed("[_r] - create library " + name);
              _elements.log();
              console.groupEnd();
          }
      }
  }
  function library(name) {
      return libraries[name];
  }

  function select(arg) {
      if (is.String(arg)) {
          if (arg.toLowerCase() === "scene") {
              return new Elements(global.scene);
          }
          var elements_1 = find(arg, global.scene);
          // elements could be in a library not attached to the scene
          for (var lib in libraries) {
              var selection = libraries[lib].select(arg);
              selection.each(function (item) {
                  // item could be in multiple libraries
                  if (!elements_1.contains(item)) {
                      elements_1.add(item);
                  }
              });
          }
          if (global.TRACE === true && elements_1.length == 0) {
              console.warn('BABYLON.Runtime::no object(s) found for selector "' + arg + '"');
          }
          return elements_1;
      }
      else {
          return new Elements(arg);
      }
  }

  // vim:ts=4:sts=4:sw=4:
  /*!
   *
   * Copyright 2009-2017 Kris Kowal under the terms of the MIT
   * license found at https://github.com/kriskowal/q/blob/v1/LICENSE
   *
   * With parts by Tyler Close
   * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
   * at http://www.opensource.org/licenses/mit-license.html
   * Forked at ref_send.js version: 2009-05-11
   *
   * With parts by Mark Miller
   * Copyright (C) 2011 Google Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   */

  (function (definition) {

      // This file will function properly as a <script> tag, or a module
      // using CommonJS and NodeJS or RequireJS module formats.  In
      // Common/Node/RequireJS, the module exports the Q API and when
      // executed as a simple <script>, it creates a Q global instead.

      // Montage Require
      if (typeof bootstrap === "function") {
          bootstrap("promise", definition);

      // CommonJS
      } else if (typeof exports === "object" && typeof module === "object") {
          module.exports = definition();

      // RequireJS
      } else if (typeof define === "function" && define.amd) {
          define(definition);

      // SES (Secure EcmaScript)
      } else if (typeof ses !== "undefined") {
          if (!ses.ok()) {
              return;
          } else {
              ses.makeQ = definition;
          }

      // <script>
      } else if (typeof window !== "undefined" || typeof self !== "undefined") {
          // Prefer window over self for add-on scripts. Use self for
          // non-windowed contexts.
          var global = typeof window !== "undefined" ? window : self;

          // Get the `window` object, save the previous Q global
          // and initialize Q as a global.
          var previousQ = global.Q;
          global.Q = definition();

          // Add a noConflict function so Q can be removed from the
          // global namespace.
          global.Q.noConflict = function () {
              global.Q = previousQ;
              return this;
          };

      } else {
          throw new Error("This environment was not anticipated by Q. Please file a bug.");
      }

  })(function () {

  var hasStacks = false;
  try {
      throw new Error();
  } catch (e) {
      hasStacks = !!e.stack;
  }

  // All code after this point will be filtered from stack traces reported
  // by Q.
  var qStartingLine = captureLine();
  var qFileName;

  // shims

  // used for fallback in "allResolved"
  var noop = function () {};

  // Use the fastest possible means to execute a task in a future turn
  // of the event loop.
  var nextTick =(function () {
      // linked list of tasks (single, with head node)
      var head = {task: void 0, next: null};
      var tail = head;
      var flushing = false;
      var requestTick = void 0;
      var isNodeJS = false;
      // queue for late tasks, used by unhandled rejection tracking
      var laterQueue = [];

      function flush() {
          /* jshint loopfunc: true */
          var task, domain;

          while (head.next) {
              head = head.next;
              task = head.task;
              head.task = void 0;
              domain = head.domain;

              if (domain) {
                  head.domain = void 0;
                  domain.enter();
              }
              runSingle(task, domain);

          }
          while (laterQueue.length) {
              task = laterQueue.pop();
              runSingle(task);
          }
          flushing = false;
      }
      // runs a single function in the async queue
      function runSingle(task, domain) {
          try {
              task();

          } catch (e) {
              if (isNodeJS) {
                  // In node, uncaught exceptions are considered fatal errors.
                  // Re-throw them synchronously to interrupt flushing!

                  // Ensure continuation if the uncaught exception is suppressed
                  // listening "uncaughtException" events (as domains does).
                  // Continue in next event to avoid tick recursion.
                  if (domain) {
                      domain.exit();
                  }
                  setTimeout(flush, 0);
                  if (domain) {
                      domain.enter();
                  }

                  throw e;

              } else {
                  // In browsers, uncaught exceptions are not fatal.
                  // Re-throw them asynchronously to avoid slow-downs.
                  setTimeout(function () {
                      throw e;
                  }, 0);
              }
          }

          if (domain) {
              domain.exit();
          }
      }

      nextTick = function (task) {
          tail = tail.next = {
              task: task,
              domain: isNodeJS && process.domain,
              next: null
          };

          if (!flushing) {
              flushing = true;
              requestTick();
          }
      };

      if (typeof process === "object" &&
          process.toString() === "[object process]" && process.nextTick) {
          // Ensure Q is in a real Node environment, with a `process.nextTick`.
          // To see through fake Node environments:
          // * Mocha test runner - exposes a `process` global without a `nextTick`
          // * Browserify - exposes a `process.nexTick` function that uses
          //   `setTimeout`. In this case `setImmediate` is preferred because
          //    it is faster. Browserify's `process.toString()` yields
          //   "[object Object]", while in a real Node environment
          //   `process.toString()` yields "[object process]".
          isNodeJS = true;

          requestTick = function () {
              process.nextTick(flush);
          };

      } else if (typeof setImmediate === "function") {
          // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
          if (typeof window !== "undefined") {
              requestTick = setImmediate.bind(window, flush);
          } else {
              requestTick = function () {
                  setImmediate(flush);
              };
          }

      } else if (typeof MessageChannel !== "undefined") {
          // modern browsers
          // http://www.nonblocking.io/2011/06/windownexttick.html
          var channel = new MessageChannel();
          // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
          // working message ports the first time a page loads.
          channel.port1.onmessage = function () {
              requestTick = requestPortTick;
              channel.port1.onmessage = flush;
              flush();
          };
          var requestPortTick = function () {
              // Opera requires us to provide a message payload, regardless of
              // whether we use it.
              channel.port2.postMessage(0);
          };
          requestTick = function () {
              setTimeout(flush, 0);
              requestPortTick();
          };

      } else {
          // old browsers
          requestTick = function () {
              setTimeout(flush, 0);
          };
      }
      // runs a task after all other tasks have been run
      // this is useful for unhandled rejection tracking that needs to happen
      // after all `then`d tasks have been run.
      nextTick.runAfter = function (task) {
          laterQueue.push(task);
          if (!flushing) {
              flushing = true;
              requestTick();
          }
      };
      return nextTick;
  })();

  // Attempt to make generics safe in the face of downstream
  // modifications.
  // There is no situation where this is necessary.
  // If you need a security guarantee, these primordials need to be
  // deeply frozen anyway, and if you don’t need a security guarantee,
  // this is just plain paranoid.
  // However, this **might** have the nice side-effect of reducing the size of
  // the minified code by reducing x.call() to merely x()
  // See Mark Miller’s explanation of what this does.
  // http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
  var call = Function.call;
  function uncurryThis(f) {
      return function () {
          return call.apply(f, arguments);
      };
  }
  // This is equivalent, but slower:
  // uncurryThis = Function_bind.bind(Function_bind.call);
  // http://jsperf.com/uncurrythis

  var array_slice = uncurryThis(Array.prototype.slice);

  var array_reduce = uncurryThis(
      Array.prototype.reduce || function (callback, basis) {
          var index = 0,
              length = this.length;
          // concerning the initial value, if one is not provided
          if (arguments.length === 1) {
              // seek to the first value in the array, accounting
              // for the possibility that is is a sparse array
              do {
                  if (index in this) {
                      basis = this[index++];
                      break;
                  }
                  if (++index >= length) {
                      throw new TypeError();
                  }
              } while (1);
          }
          // reduce
          for (; index < length; index++) {
              // account for the possibility that the array is sparse
              if (index in this) {
                  basis = callback(basis, this[index], index);
              }
          }
          return basis;
      }
  );

  var array_indexOf = uncurryThis(
      Array.prototype.indexOf || function (value) {
          // not a very good shim, but good enough for our one use of it
          for (var i = 0; i < this.length; i++) {
              if (this[i] === value) {
                  return i;
              }
          }
          return -1;
      }
  );

  var array_map = uncurryThis(
      Array.prototype.map || function (callback, thisp) {
          var self = this;
          var collect = [];
          array_reduce(self, function (undefined$1, value, index) {
              collect.push(callback.call(thisp, value, index, self));
          }, void 0);
          return collect;
      }
  );

  var object_create = Object.create || function (prototype) {
      function Type() { }
      Type.prototype = prototype;
      return new Type();
  };

  var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
      obj[prop] = descriptor.value;
      return obj;
  };

  var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

  var object_keys = Object.keys || function (object) {
      var keys = [];
      for (var key in object) {
          if (object_hasOwnProperty(object, key)) {
              keys.push(key);
          }
      }
      return keys;
  };

  var object_toString = uncurryThis(Object.prototype.toString);

  function isObject(value) {
      return value === Object(value);
  }

  // generator related shims

  // FIXME: Remove this function once ES6 generators are in SpiderMonkey.
  function isStopIteration(exception) {
      return (
          object_toString(exception) === "[object StopIteration]" ||
          exception instanceof QReturnValue
      );
  }

  // FIXME: Remove this helper and Q.return once ES6 generators are in
  // SpiderMonkey.
  var QReturnValue;
  if (typeof ReturnValue !== "undefined") {
      QReturnValue = ReturnValue;
  } else {
      QReturnValue = function (value) {
          this.value = value;
      };
  }

  // long stack traces

  var STACK_JUMP_SEPARATOR = "From previous event:";

  function makeStackTraceLong(error, promise) {
      // If possible, transform the error stack trace by removing Node and Q
      // cruft, then concatenating with the stack trace of `promise`. See #57.
      if (hasStacks &&
          promise.stack &&
          typeof error === "object" &&
          error !== null &&
          error.stack
      ) {
          var stacks = [];
          for (var p = promise; !!p; p = p.source) {
              if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                  object_defineProperty(error, "__minimumStackCounter__", {value: p.stackCounter, configurable: true});
                  stacks.unshift(p.stack);
              }
          }
          stacks.unshift(error.stack);

          var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
          var stack = filterStackString(concatedStacks);
          object_defineProperty(error, "stack", {value: stack, configurable: true});
      }
  }

  function filterStackString(stackString) {
      var lines = stackString.split("\n");
      var desiredLines = [];
      for (var i = 0; i < lines.length; ++i) {
          var line = lines[i];

          if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
              desiredLines.push(line);
          }
      }
      return desiredLines.join("\n");
  }

  function isNodeFrame(stackLine) {
      return stackLine.indexOf("(module.js:") !== -1 ||
             stackLine.indexOf("(node.js:") !== -1;
  }

  function getFileNameAndLineNumber(stackLine) {
      // Named functions: "at functionName (filename:lineNumber:columnNumber)"
      // In IE10 function name can have spaces ("Anonymous function") O_o
      var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
      if (attempt1) {
          return [attempt1[1], Number(attempt1[2])];
      }

      // Anonymous functions: "at filename:lineNumber:columnNumber"
      var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
      if (attempt2) {
          return [attempt2[1], Number(attempt2[2])];
      }

      // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
      var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
      if (attempt3) {
          return [attempt3[1], Number(attempt3[2])];
      }
  }

  function isInternalFrame(stackLine) {
      var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

      if (!fileNameAndLineNumber) {
          return false;
      }

      var fileName = fileNameAndLineNumber[0];
      var lineNumber = fileNameAndLineNumber[1];

      return fileName === qFileName &&
          lineNumber >= qStartingLine &&
          lineNumber <= qEndingLine;
  }

  // discover own file name and line number range for filtering stack
  // traces
  function captureLine() {
      if (!hasStacks) {
          return;
      }

      try {
          throw new Error();
      } catch (e) {
          var lines = e.stack.split("\n");
          var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
          var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
          if (!fileNameAndLineNumber) {
              return;
          }

          qFileName = fileNameAndLineNumber[0];
          return fileNameAndLineNumber[1];
      }
  }

  function deprecate(callback, name, alternative) {
      return function () {
          if (typeof console !== "undefined" &&
              typeof console.warn === "function") {
              console.warn(name + " is deprecated, use " + alternative +
                           " instead.", new Error("").stack);
          }
          return callback.apply(callback, arguments);
      };
  }

  // end of shims
  // beginning of real work

  /**
   * Constructs a promise for an immediate reference, passes promises through, or
   * coerces promises from different systems.
   * @param value immediate reference or promise
   */
  function Q(value) {
      // If the object is already a Promise, return it directly.  This enables
      // the resolve function to both be used to created references from objects,
      // but to tolerably coerce non-promises to promises.
      if (value instanceof Promise) {
          return value;
      }

      // assimilate thenables
      if (isPromiseAlike(value)) {
          return coerce(value);
      } else {
          return fulfill(value);
      }
  }
  Q.resolve = Q;

  /**
   * Performs a task in a future turn of the event loop.
   * @param {Function} task
   */
  Q.nextTick = nextTick;

  /**
   * Controls whether or not long stack traces will be on
   */
  Q.longStackSupport = false;

  /**
   * The counter is used to determine the stopping point for building
   * long stack traces. In makeStackTraceLong we walk backwards through
   * the linked list of promises, only stacks which were created before
   * the rejection are concatenated.
   */
  var longStackCounter = 1;

  // enable long stacks if Q_DEBUG is set
  if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
      Q.longStackSupport = true;
  }

  /**
   * Constructs a {promise, resolve, reject} object.
   *
   * `resolve` is a callback to invoke with a more resolved value for the
   * promise. To fulfill the promise, invoke `resolve` with any value that is
   * not a thenable. To reject the promise, invoke `resolve` with a rejected
   * thenable, or invoke `reject` with the reason directly. To resolve the
   * promise to another thenable, thus putting it in the same state, invoke
   * `resolve` with that other thenable.
   */
  Q.defer = defer;
  function defer() {
      // if "messages" is an "Array", that indicates that the promise has not yet
      // been resolved.  If it is "undefined", it has been resolved.  Each
      // element of the messages array is itself an array of complete arguments to
      // forward to the resolved promise.  We coerce the resolution value to a
      // promise using the `resolve` function because it handles both fully
      // non-thenable values and other thenables gracefully.
      var messages = [], progressListeners = [], resolvedPromise;

      var deferred = object_create(defer.prototype);
      var promise = object_create(Promise.prototype);

      promise.promiseDispatch = function (resolve, op, operands) {
          var args = array_slice(arguments);
          if (messages) {
              messages.push(args);
              if (op === "when" && operands[1]) { // progress operand
                  progressListeners.push(operands[1]);
              }
          } else {
              Q.nextTick(function () {
                  resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
              });
          }
      };

      // XXX deprecated
      promise.valueOf = function () {
          if (messages) {
              return promise;
          }
          var nearerValue = nearer(resolvedPromise);
          if (isPromise(nearerValue)) {
              resolvedPromise = nearerValue; // shorten chain
          }
          return nearerValue;
      };

      promise.inspect = function () {
          if (!resolvedPromise) {
              return { state: "pending" };
          }
          return resolvedPromise.inspect();
      };

      if (Q.longStackSupport && hasStacks) {
          try {
              throw new Error();
          } catch (e) {
              // NOTE: don't try to use `Error.captureStackTrace` or transfer the
              // accessor around; that causes memory leaks as per GH-111. Just
              // reify the stack trace as a string ASAP.
              //
              // At the same time, cut off the first line; it's always just
              // "[object Promise]\n", as per the `toString`.
              promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
              promise.stackCounter = longStackCounter++;
          }
      }

      // NOTE: we do the checks for `resolvedPromise` in each method, instead of
      // consolidating them into `become`, since otherwise we'd create new
      // promises with the lines `become(whatever(value))`. See e.g. GH-252.

      function become(newPromise) {
          resolvedPromise = newPromise;

          if (Q.longStackSupport && hasStacks) {
              // Only hold a reference to the new promise if long stacks
              // are enabled to reduce memory usage
              promise.source = newPromise;
          }

          array_reduce(messages, function (undefined$1, message) {
              Q.nextTick(function () {
                  newPromise.promiseDispatch.apply(newPromise, message);
              });
          }, void 0);

          messages = void 0;
          progressListeners = void 0;
      }

      deferred.promise = promise;
      deferred.resolve = function (value) {
          if (resolvedPromise) {
              return;
          }

          become(Q(value));
      };

      deferred.fulfill = function (value) {
          if (resolvedPromise) {
              return;
          }

          become(fulfill(value));
      };
      deferred.reject = function (reason) {
          if (resolvedPromise) {
              return;
          }

          become(reject(reason));
      };
      deferred.notify = function (progress) {
          if (resolvedPromise) {
              return;
          }

          array_reduce(progressListeners, function (undefined$1, progressListener) {
              Q.nextTick(function () {
                  progressListener(progress);
              });
          }, void 0);
      };

      return deferred;
  }

  /**
   * Creates a Node-style callback that will resolve or reject the deferred
   * promise.
   * @returns a nodeback
   */
  defer.prototype.makeNodeResolver = function () {
      var self = this;
      return function (error, value) {
          if (error) {
              self.reject(error);
          } else if (arguments.length > 2) {
              self.resolve(array_slice(arguments, 1));
          } else {
              self.resolve(value);
          }
      };
  };

  /**
   * @param resolver {Function} a function that returns nothing and accepts
   * the resolve, reject, and notify functions for a deferred.
   * @returns a promise that may be resolved with the given resolve and reject
   * functions, or rejected by a thrown exception in resolver
   */
  Q.Promise = promise; // ES6
  Q.promise = promise;
  function promise(resolver) {
      if (typeof resolver !== "function") {
          throw new TypeError("resolver must be a function.");
      }
      var deferred = defer();
      try {
          resolver(deferred.resolve, deferred.reject, deferred.notify);
      } catch (reason) {
          deferred.reject(reason);
      }
      return deferred.promise;
  }

  promise.race = race; // ES6
  promise.all = all; // ES6
  promise.reject = reject; // ES6
  promise.resolve = Q; // ES6

  // XXX experimental.  This method is a way to denote that a local value is
  // serializable and should be immediately dispatched to a remote upon request,
  // instead of passing a reference.
  Q.passByCopy = function (object) {
      //freeze(object);
      //passByCopies.set(object, true);
      return object;
  };

  Promise.prototype.passByCopy = function () {
      //freeze(object);
      //passByCopies.set(object, true);
      return this;
  };

  /**
   * If two promises eventually fulfill to the same value, promises that value,
   * but otherwise rejects.
   * @param x {Any*}
   * @param y {Any*}
   * @returns {Any*} a promise for x and y if they are the same, but a rejection
   * otherwise.
   *
   */
  Q.join = function (x, y) {
      return Q(x).join(y);
  };

  Promise.prototype.join = function (that) {
      return Q([this, that]).spread(function (x, y) {
          if (x === y) {
              // TODO: "===" should be Object.is or equiv
              return x;
          } else {
              throw new Error("Q can't join: not the same: " + x + " " + y);
          }
      });
  };

  /**
   * Returns a promise for the first of an array of promises to become settled.
   * @param answers {Array[Any*]} promises to race
   * @returns {Any*} the first promise to be settled
   */
  Q.race = race;
  function race(answerPs) {
      return promise(function (resolve, reject) {
          // Switch to this once we can assume at least ES5
          // answerPs.forEach(function (answerP) {
          //     Q(answerP).then(resolve, reject);
          // });
          // Use this in the meantime
          for (var i = 0, len = answerPs.length; i < len; i++) {
              Q(answerPs[i]).then(resolve, reject);
          }
      });
  }

  Promise.prototype.race = function () {
      return this.then(Q.race);
  };

  /**
   * Constructs a Promise with a promise descriptor object and optional fallback
   * function.  The descriptor contains methods like when(rejected), get(name),
   * set(name, value), post(name, args), and delete(name), which all
   * return either a value, a promise for a value, or a rejection.  The fallback
   * accepts the operation name, a resolver, and any further arguments that would
   * have been forwarded to the appropriate method above had a method been
   * provided with the proper name.  The API makes no guarantees about the nature
   * of the returned object, apart from that it is usable whereever promises are
   * bought and sold.
   */
  Q.makePromise = Promise;
  function Promise(descriptor, fallback, inspect) {
      if (fallback === void 0) {
          fallback = function (op) {
              return reject(new Error(
                  "Promise does not support operation: " + op
              ));
          };
      }
      if (inspect === void 0) {
          inspect = function () {
              return {state: "unknown"};
          };
      }

      var promise = object_create(Promise.prototype);

      promise.promiseDispatch = function (resolve, op, args) {
          var result;
          try {
              if (descriptor[op]) {
                  result = descriptor[op].apply(promise, args);
              } else {
                  result = fallback.call(promise, op, args);
              }
          } catch (exception) {
              result = reject(exception);
          }
          if (resolve) {
              resolve(result);
          }
      };

      promise.inspect = inspect;

      // XXX deprecated `valueOf` and `exception` support
      if (inspect) {
          var inspected = inspect();
          if (inspected.state === "rejected") {
              promise.exception = inspected.reason;
          }

          promise.valueOf = function () {
              var inspected = inspect();
              if (inspected.state === "pending" ||
                  inspected.state === "rejected") {
                  return promise;
              }
              return inspected.value;
          };
      }

      return promise;
  }

  Promise.prototype.toString = function () {
      return "[object Promise]";
  };

  Promise.prototype.then = function (fulfilled, rejected, progressed) {
      var self = this;
      var deferred = defer();
      var done = false;   // ensure the untrusted promise makes at most a
                          // single call to one of the callbacks

      function _fulfilled(value) {
          try {
              return typeof fulfilled === "function" ? fulfilled(value) : value;
          } catch (exception) {
              return reject(exception);
          }
      }

      function _rejected(exception) {
          if (typeof rejected === "function") {
              makeStackTraceLong(exception, self);
              try {
                  return rejected(exception);
              } catch (newException) {
                  return reject(newException);
              }
          }
          return reject(exception);
      }

      function _progressed(value) {
          return typeof progressed === "function" ? progressed(value) : value;
      }

      Q.nextTick(function () {
          self.promiseDispatch(function (value) {
              if (done) {
                  return;
              }
              done = true;

              deferred.resolve(_fulfilled(value));
          }, "when", [function (exception) {
              if (done) {
                  return;
              }
              done = true;

              deferred.resolve(_rejected(exception));
          }]);
      });

      // Progress propagator need to be attached in the current tick.
      self.promiseDispatch(void 0, "when", [void 0, function (value) {
          var newValue;
          var threw = false;
          try {
              newValue = _progressed(value);
          } catch (e) {
              threw = true;
              if (Q.onerror) {
                  Q.onerror(e);
              } else {
                  throw e;
              }
          }

          if (!threw) {
              deferred.notify(newValue);
          }
      }]);

      return deferred.promise;
  };

  Q.tap = function (promise, callback) {
      return Q(promise).tap(callback);
  };

  /**
   * Works almost like "finally", but not called for rejections.
   * Original resolution value is passed through callback unaffected.
   * Callback may return a promise that will be awaited for.
   * @param {Function} callback
   * @returns {Q.Promise}
   * @example
   * doSomething()
   *   .then(...)
   *   .tap(console.log)
   *   .then(...);
   */
  Promise.prototype.tap = function (callback) {
      callback = Q(callback);

      return this.then(function (value) {
          return callback.fcall(value).thenResolve(value);
      });
  };

  /**
   * Registers an observer on a promise.
   *
   * Guarantees:
   *
   * 1. that fulfilled and rejected will be called only once.
   * 2. that either the fulfilled callback or the rejected callback will be
   *    called, but not both.
   * 3. that fulfilled and rejected will not be called in this turn.
   *
   * @param value      promise or immediate reference to observe
   * @param fulfilled  function to be called with the fulfilled value
   * @param rejected   function to be called with the rejection exception
   * @param progressed function to be called on any progress notifications
   * @return promise for the return value from the invoked callback
   */
  Q.when = when;
  function when(value, fulfilled, rejected, progressed) {
      return Q(value).then(fulfilled, rejected, progressed);
  }

  Promise.prototype.thenResolve = function (value) {
      return this.then(function () { return value; });
  };

  Q.thenResolve = function (promise, value) {
      return Q(promise).thenResolve(value);
  };

  Promise.prototype.thenReject = function (reason) {
      return this.then(function () { throw reason; });
  };

  Q.thenReject = function (promise, reason) {
      return Q(promise).thenReject(reason);
  };

  /**
   * If an object is not a promise, it is as "near" as possible.
   * If a promise is rejected, it is as "near" as possible too.
   * If it’s a fulfilled promise, the fulfillment value is nearer.
   * If it’s a deferred promise and the deferred has been resolved, the
   * resolution is "nearer".
   * @param object
   * @returns most resolved (nearest) form of the object
   */

  // XXX should we re-do this?
  Q.nearer = nearer;
  function nearer(value) {
      if (isPromise(value)) {
          var inspected = value.inspect();
          if (inspected.state === "fulfilled") {
              return inspected.value;
          }
      }
      return value;
  }

  /**
   * @returns whether the given object is a promise.
   * Otherwise it is a fulfilled value.
   */
  Q.isPromise = isPromise;
  function isPromise(object) {
      return object instanceof Promise;
  }

  Q.isPromiseAlike = isPromiseAlike;
  function isPromiseAlike(object) {
      return isObject(object) && typeof object.then === "function";
  }

  /**
   * @returns whether the given object is a pending promise, meaning not
   * fulfilled or rejected.
   */
  Q.isPending = isPending;
  function isPending(object) {
      return isPromise(object) && object.inspect().state === "pending";
  }

  Promise.prototype.isPending = function () {
      return this.inspect().state === "pending";
  };

  /**
   * @returns whether the given object is a value or fulfilled
   * promise.
   */
  Q.isFulfilled = isFulfilled;
  function isFulfilled(object) {
      return !isPromise(object) || object.inspect().state === "fulfilled";
  }

  Promise.prototype.isFulfilled = function () {
      return this.inspect().state === "fulfilled";
  };

  /**
   * @returns whether the given object is a rejected promise.
   */
  Q.isRejected = isRejected;
  function isRejected(object) {
      return isPromise(object) && object.inspect().state === "rejected";
  }

  Promise.prototype.isRejected = function () {
      return this.inspect().state === "rejected";
  };

  //// BEGIN UNHANDLED REJECTION TRACKING

  // This promise library consumes exceptions thrown in handlers so they can be
  // handled by a subsequent promise.  The exceptions get added to this array when
  // they are created, and removed when they are handled.  Note that in ES6 or
  // shimmed environments, this would naturally be a `Set`.
  var unhandledReasons = [];
  var unhandledRejections = [];
  var reportedUnhandledRejections = [];
  var trackUnhandledRejections = true;

  function resetUnhandledRejections() {
      unhandledReasons.length = 0;
      unhandledRejections.length = 0;

      if (!trackUnhandledRejections) {
          trackUnhandledRejections = true;
      }
  }

  function trackRejection(promise, reason) {
      if (!trackUnhandledRejections) {
          return;
      }
      if (typeof process === "object" && typeof process.emit === "function") {
          Q.nextTick.runAfter(function () {
              if (array_indexOf(unhandledRejections, promise) !== -1) {
                  process.emit("unhandledRejection", reason, promise);
                  reportedUnhandledRejections.push(promise);
              }
          });
      }

      unhandledRejections.push(promise);
      if (reason && typeof reason.stack !== "undefined") {
          unhandledReasons.push(reason.stack);
      } else {
          unhandledReasons.push("(no stack) " + reason);
      }
  }

  function untrackRejection(promise) {
      if (!trackUnhandledRejections) {
          return;
      }

      var at = array_indexOf(unhandledRejections, promise);
      if (at !== -1) {
          if (typeof process === "object" && typeof process.emit === "function") {
              Q.nextTick.runAfter(function () {
                  var atReport = array_indexOf(reportedUnhandledRejections, promise);
                  if (atReport !== -1) {
                      process.emit("rejectionHandled", unhandledReasons[at], promise);
                      reportedUnhandledRejections.splice(atReport, 1);
                  }
              });
          }
          unhandledRejections.splice(at, 1);
          unhandledReasons.splice(at, 1);
      }
  }

  Q.resetUnhandledRejections = resetUnhandledRejections;

  Q.getUnhandledReasons = function () {
      // Make a copy so that consumers can't interfere with our internal state.
      return unhandledReasons.slice();
  };

  Q.stopUnhandledRejectionTracking = function () {
      resetUnhandledRejections();
      trackUnhandledRejections = false;
  };

  resetUnhandledRejections();

  //// END UNHANDLED REJECTION TRACKING

  /**
   * Constructs a rejected promise.
   * @param reason value describing the failure
   */
  Q.reject = reject;
  function reject(reason) {
      var rejection = Promise({
          "when": function (rejected) {
              // note that the error has been handled
              if (rejected) {
                  untrackRejection(this);
              }
              return rejected ? rejected(reason) : this;
          }
      }, function fallback() {
          return this;
      }, function inspect() {
          return { state: "rejected", reason: reason };
      });

      // Note that the reason has not been handled.
      trackRejection(rejection, reason);

      return rejection;
  }

  /**
   * Constructs a fulfilled promise for an immediate reference.
   * @param value immediate reference
   */
  Q.fulfill = fulfill;
  function fulfill(value) {
      return Promise({
          "when": function () {
              return value;
          },
          "get": function (name) {
              return value[name];
          },
          "set": function (name, rhs) {
              value[name] = rhs;
          },
          "delete": function (name) {
              delete value[name];
          },
          "post": function (name, args) {
              // Mark Miller proposes that post with no name should apply a
              // promised function.
              if (name === null || name === void 0) {
                  return value.apply(void 0, args);
              } else {
                  return value[name].apply(value, args);
              }
          },
          "apply": function (thisp, args) {
              return value.apply(thisp, args);
          },
          "keys": function () {
              return object_keys(value);
          }
      }, void 0, function inspect() {
          return { state: "fulfilled", value: value };
      });
  }

  /**
   * Converts thenables to Q promises.
   * @param promise thenable promise
   * @returns a Q promise
   */
  function coerce(promise) {
      var deferred = defer();
      Q.nextTick(function () {
          try {
              promise.then(deferred.resolve, deferred.reject, deferred.notify);
          } catch (exception) {
              deferred.reject(exception);
          }
      });
      return deferred.promise;
  }

  /**
   * Annotates an object such that it will never be
   * transferred away from this process over any promise
   * communication channel.
   * @param object
   * @returns promise a wrapping of that object that
   * additionally responds to the "isDef" message
   * without a rejection.
   */
  Q.master = master;
  function master(object) {
      return Promise({
          "isDef": function () {}
      }, function fallback(op, args) {
          return dispatch(object, op, args);
      }, function () {
          return Q(object).inspect();
      });
  }

  /**
   * Spreads the values of a promised array of arguments into the
   * fulfillment callback.
   * @param fulfilled callback that receives variadic arguments from the
   * promised array
   * @param rejected callback that receives the exception if the promise
   * is rejected.
   * @returns a promise for the return value or thrown exception of
   * either callback.
   */
  Q.spread = spread;
  function spread(value, fulfilled, rejected) {
      return Q(value).spread(fulfilled, rejected);
  }

  Promise.prototype.spread = function (fulfilled, rejected) {
      return this.all().then(function (array) {
          return fulfilled.apply(void 0, array);
      }, rejected);
  };

  /**
   * The async function is a decorator for generator functions, turning
   * them into asynchronous generators.  Although generators are only part
   * of the newest ECMAScript 6 drafts, this code does not cause syntax
   * errors in older engines.  This code should continue to work and will
   * in fact improve over time as the language improves.
   *
   * ES6 generators are currently part of V8 version 3.19 with the
   * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
   * for longer, but under an older Python-inspired form.  This function
   * works on both kinds of generators.
   *
   * Decorates a generator function such that:
   *  - it may yield promises
   *  - execution will continue when that promise is fulfilled
   *  - the value of the yield expression will be the fulfilled value
   *  - it returns a promise for the return value (when the generator
   *    stops iterating)
   *  - the decorated function returns a promise for the return value
   *    of the generator or the first rejected promise among those
   *    yielded.
   *  - if an error is thrown in the generator, it propagates through
   *    every following yield until it is caught, or until it escapes
   *    the generator function altogether, and is translated into a
   *    rejection for the promise returned by the decorated generator.
   */
  Q.async = async;
  function async(makeGenerator) {
      return function () {
          // when verb is "send", arg is a value
          // when verb is "throw", arg is an exception
          function continuer(verb, arg) {
              var result;

              // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
              // engine that has a deployed base of browsers that support generators.
              // However, SM's generators use the Python-inspired semantics of
              // outdated ES6 drafts.  We would like to support ES6, but we'd also
              // like to make it possible to use generators in deployed browsers, so
              // we also support Python-style generators.  At some point we can remove
              // this block.

              if (typeof StopIteration === "undefined") {
                  // ES6 Generators
                  try {
                      result = generator[verb](arg);
                  } catch (exception) {
                      return reject(exception);
                  }
                  if (result.done) {
                      return Q(result.value);
                  } else {
                      return when(result.value, callback, errback);
                  }
              } else {
                  // SpiderMonkey Generators
                  // FIXME: Remove this case when SM does ES6 generators.
                  try {
                      result = generator[verb](arg);
                  } catch (exception) {
                      if (isStopIteration(exception)) {
                          return Q(exception.value);
                      } else {
                          return reject(exception);
                      }
                  }
                  return when(result, callback, errback);
              }
          }
          var generator = makeGenerator.apply(this, arguments);
          var callback = continuer.bind(continuer, "next");
          var errback = continuer.bind(continuer, "throw");
          return callback();
      };
  }

  /**
   * The spawn function is a small wrapper around async that immediately
   * calls the generator and also ends the promise chain, so that any
   * unhandled errors are thrown instead of forwarded to the error
   * handler. This is useful because it's extremely common to run
   * generators at the top-level to work with libraries.
   */
  Q.spawn = spawn;
  function spawn(makeGenerator) {
      Q.done(Q.async(makeGenerator)());
  }

  // FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
  /**
   * Throws a ReturnValue exception to stop an asynchronous generator.
   *
   * This interface is a stop-gap measure to support generator return
   * values in older Firefox/SpiderMonkey.  In browsers that support ES6
   * generators like Chromium 29, just use "return" in your generator
   * functions.
   *
   * @param value the return value for the surrounding generator
   * @throws ReturnValue exception with the value.
   * @example
   * // ES6 style
   * Q.async(function* () {
   *      var foo = yield getFooPromise();
   *      var bar = yield getBarPromise();
   *      return foo + bar;
   * })
   * // Older SpiderMonkey style
   * Q.async(function () {
   *      var foo = yield getFooPromise();
   *      var bar = yield getBarPromise();
   *      Q.return(foo + bar);
   * })
   */
  Q["return"] = _return;
  function _return(value) {
      throw new QReturnValue(value);
  }

  /**
   * The promised function decorator ensures that any promise arguments
   * are settled and passed as values (`this` is also settled and passed
   * as a value).  It will also ensure that the result of a function is
   * always a promise.
   *
   * @example
   * var add = Q.promised(function (a, b) {
   *     return a + b;
   * });
   * add(Q(a), Q(B));
   *
   * @param {function} callback The function to decorate
   * @returns {function} a function that has been decorated.
   */
  Q.promised = promised;
  function promised(callback) {
      return function () {
          return spread([this, all(arguments)], function (self, args) {
              return callback.apply(self, args);
          });
      };
  }

  /**
   * sends a message to a value in a future turn
   * @param object* the recipient
   * @param op the name of the message operation, e.g., "when",
   * @param args further arguments to be forwarded to the operation
   * @returns result {Promise} a promise for the result of the operation
   */
  Q.dispatch = dispatch;
  function dispatch(object, op, args) {
      return Q(object).dispatch(op, args);
  }

  Promise.prototype.dispatch = function (op, args) {
      var self = this;
      var deferred = defer();
      Q.nextTick(function () {
          self.promiseDispatch(deferred.resolve, op, args);
      });
      return deferred.promise;
  };

  /**
   * Gets the value of a property in a future turn.
   * @param object    promise or immediate reference for target object
   * @param name      name of property to get
   * @return promise for the property value
   */
  Q.get = function (object, key) {
      return Q(object).dispatch("get", [key]);
  };

  Promise.prototype.get = function (key) {
      return this.dispatch("get", [key]);
  };

  /**
   * Sets the value of a property in a future turn.
   * @param object    promise or immediate reference for object object
   * @param name      name of property to set
   * @param value     new value of property
   * @return promise for the return value
   */
  Q.set = function (object, key, value) {
      return Q(object).dispatch("set", [key, value]);
  };

  Promise.prototype.set = function (key, value) {
      return this.dispatch("set", [key, value]);
  };

  /**
   * Deletes a property in a future turn.
   * @param object    promise or immediate reference for target object
   * @param name      name of property to delete
   * @return promise for the return value
   */
  Q.del = // XXX legacy
  Q["delete"] = function (object, key) {
      return Q(object).dispatch("delete", [key]);
  };

  Promise.prototype.del = // XXX legacy
  Promise.prototype["delete"] = function (key) {
      return this.dispatch("delete", [key]);
  };

  /**
   * Invokes a method in a future turn.
   * @param object    promise or immediate reference for target object
   * @param name      name of method to invoke
   * @param value     a value to post, typically an array of
   *                  invocation arguments for promises that
   *                  are ultimately backed with `resolve` values,
   *                  as opposed to those backed with URLs
   *                  wherein the posted value can be any
   *                  JSON serializable object.
   * @return promise for the return value
   */
  // bound locally because it is used by other methods
  Q.mapply = // XXX As proposed by "Redsandro"
  Q.post = function (object, name, args) {
      return Q(object).dispatch("post", [name, args]);
  };

  Promise.prototype.mapply = // XXX As proposed by "Redsandro"
  Promise.prototype.post = function (name, args) {
      return this.dispatch("post", [name, args]);
  };

  /**
   * Invokes a method in a future turn.
   * @param object    promise or immediate reference for target object
   * @param name      name of method to invoke
   * @param ...args   array of invocation arguments
   * @return promise for the return value
   */
  Q.send = // XXX Mark Miller's proposed parlance
  Q.mcall = // XXX As proposed by "Redsandro"
  Q.invoke = function (object, name /*...args*/) {
      return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
  };

  Promise.prototype.send = // XXX Mark Miller's proposed parlance
  Promise.prototype.mcall = // XXX As proposed by "Redsandro"
  Promise.prototype.invoke = function (name /*...args*/) {
      return this.dispatch("post", [name, array_slice(arguments, 1)]);
  };

  /**
   * Applies the promised function in a future turn.
   * @param object    promise or immediate reference for target function
   * @param args      array of application arguments
   */
  Q.fapply = function (object, args) {
      return Q(object).dispatch("apply", [void 0, args]);
  };

  Promise.prototype.fapply = function (args) {
      return this.dispatch("apply", [void 0, args]);
  };

  /**
   * Calls the promised function in a future turn.
   * @param object    promise or immediate reference for target function
   * @param ...args   array of application arguments
   */
  Q["try"] =
  Q.fcall = function (object /* ...args*/) {
      return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
  };

  Promise.prototype.fcall = function (/*...args*/) {
      return this.dispatch("apply", [void 0, array_slice(arguments)]);
  };

  /**
   * Binds the promised function, transforming return values into a fulfilled
   * promise and thrown errors into a rejected one.
   * @param object    promise or immediate reference for target function
   * @param ...args   array of application arguments
   */
  Q.fbind = function (object /*...args*/) {
      var promise = Q(object);
      var args = array_slice(arguments, 1);
      return function fbound() {
          return promise.dispatch("apply", [
              this,
              args.concat(array_slice(arguments))
          ]);
      };
  };
  Promise.prototype.fbind = function (/*...args*/) {
      var promise = this;
      var args = array_slice(arguments);
      return function fbound() {
          return promise.dispatch("apply", [
              this,
              args.concat(array_slice(arguments))
          ]);
      };
  };

  /**
   * Requests the names of the owned properties of a promised
   * object in a future turn.
   * @param object    promise or immediate reference for target object
   * @return promise for the keys of the eventually settled object
   */
  Q.keys = function (object) {
      return Q(object).dispatch("keys", []);
  };

  Promise.prototype.keys = function () {
      return this.dispatch("keys", []);
  };

  /**
   * Turns an array of promises into a promise for an array.  If any of
   * the promises gets rejected, the whole array is rejected immediately.
   * @param {Array*} an array (or promise for an array) of values (or
   * promises for values)
   * @returns a promise for an array of the corresponding values
   */
  // By Mark Miller
  // http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
  Q.all = all;
  function all(promises) {
      return when(promises, function (promises) {
          var pendingCount = 0;
          var deferred = defer();
          array_reduce(promises, function (undefined$1, promise, index) {
              var snapshot;
              if (
                  isPromise(promise) &&
                  (snapshot = promise.inspect()).state === "fulfilled"
              ) {
                  promises[index] = snapshot.value;
              } else {
                  ++pendingCount;
                  when(
                      promise,
                      function (value) {
                          promises[index] = value;
                          if (--pendingCount === 0) {
                              deferred.resolve(promises);
                          }
                      },
                      deferred.reject,
                      function (progress) {
                          deferred.notify({ index: index, value: progress });
                      }
                  );
              }
          }, void 0);
          if (pendingCount === 0) {
              deferred.resolve(promises);
          }
          return deferred.promise;
      });
  }

  Promise.prototype.all = function () {
      return all(this);
  };

  /**
   * Returns the first resolved promise of an array. Prior rejected promises are
   * ignored.  Rejects only if all promises are rejected.
   * @param {Array*} an array containing values or promises for values
   * @returns a promise fulfilled with the value of the first resolved promise,
   * or a rejected promise if all promises are rejected.
   */
  Q.any = any;

  function any(promises) {
      if (promises.length === 0) {
          return Q.resolve();
      }

      var deferred = Q.defer();
      var pendingCount = 0;
      array_reduce(promises, function (prev, current, index) {
          var promise = promises[index];

          pendingCount++;

          when(promise, onFulfilled, onRejected, onProgress);
          function onFulfilled(result) {
              deferred.resolve(result);
          }
          function onRejected(err) {
              pendingCount--;
              if (pendingCount === 0) {
                  var rejection = err || new Error("" + err);

                  rejection.message = ("Q can't get fulfillment value from any promise, all " +
                      "promises were rejected. Last error message: " + rejection.message);

                  deferred.reject(rejection);
              }
          }
          function onProgress(progress) {
              deferred.notify({
                  index: index,
                  value: progress
              });
          }
      }, undefined);

      return deferred.promise;
  }

  Promise.prototype.any = function () {
      return any(this);
  };

  /**
   * Waits for all promises to be settled, either fulfilled or
   * rejected.  This is distinct from `all` since that would stop
   * waiting at the first rejection.  The promise returned by
   * `allResolved` will never be rejected.
   * @param promises a promise for an array (or an array) of promises
   * (or values)
   * @return a promise for an array of promises
   */
  Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
  function allResolved(promises) {
      return when(promises, function (promises) {
          promises = array_map(promises, Q);
          return when(all(array_map(promises, function (promise) {
              return when(promise, noop, noop);
          })), function () {
              return promises;
          });
      });
  }

  Promise.prototype.allResolved = function () {
      return allResolved(this);
  };

  /**
   * @see Promise#allSettled
   */
  Q.allSettled = allSettled;
  function allSettled(promises) {
      return Q(promises).allSettled();
  }

  /**
   * Turns an array of promises into a promise for an array of their states (as
   * returned by `inspect`) when they have all settled.
   * @param {Array[Any*]} values an array (or promise for an array) of values (or
   * promises for values)
   * @returns {Array[State]} an array of states for the respective values.
   */
  Promise.prototype.allSettled = function () {
      return this.then(function (promises) {
          return all(array_map(promises, function (promise) {
              promise = Q(promise);
              function regardless() {
                  return promise.inspect();
              }
              return promise.then(regardless, regardless);
          }));
      });
  };

  /**
   * Captures the failure of a promise, giving an oportunity to recover
   * with a callback.  If the given promise is fulfilled, the returned
   * promise is fulfilled.
   * @param {Any*} promise for something
   * @param {Function} callback to fulfill the returned promise if the
   * given promise is rejected
   * @returns a promise for the return value of the callback
   */
  Q.fail = // XXX legacy
  Q["catch"] = function (object, rejected) {
      return Q(object).then(void 0, rejected);
  };

  Promise.prototype.fail = // XXX legacy
  Promise.prototype["catch"] = function (rejected) {
      return this.then(void 0, rejected);
  };

  /**
   * Attaches a listener that can respond to progress notifications from a
   * promise's originating deferred. This listener receives the exact arguments
   * passed to ``deferred.notify``.
   * @param {Any*} promise for something
   * @param {Function} callback to receive any progress notifications
   * @returns the given promise, unchanged
   */
  Q.progress = progress;
  function progress(object, progressed) {
      return Q(object).then(void 0, void 0, progressed);
  }

  Promise.prototype.progress = function (progressed) {
      return this.then(void 0, void 0, progressed);
  };

  /**
   * Provides an opportunity to observe the settling of a promise,
   * regardless of whether the promise is fulfilled or rejected.  Forwards
   * the resolution to the returned promise when the callback is done.
   * The callback can return a promise to defer completion.
   * @param {Any*} promise
   * @param {Function} callback to observe the resolution of the given
   * promise, takes no arguments.
   * @returns a promise for the resolution of the given promise when
   * ``fin`` is done.
   */
  Q.fin = // XXX legacy
  Q["finally"] = function (object, callback) {
      return Q(object)["finally"](callback);
  };

  Promise.prototype.fin = // XXX legacy
  Promise.prototype["finally"] = function (callback) {
      if (!callback || typeof callback.apply !== "function") {
          throw new Error("Q can't apply finally callback");
      }
      callback = Q(callback);
      return this.then(function (value) {
          return callback.fcall().then(function () {
              return value;
          });
      }, function (reason) {
          // TODO attempt to recycle the rejection with "this".
          return callback.fcall().then(function () {
              throw reason;
          });
      });
  };

  /**
   * Terminates a chain of promises, forcing rejections to be
   * thrown as exceptions.
   * @param {Any*} promise at the end of a chain of promises
   * @returns nothing
   */
  Q.done = function (object, fulfilled, rejected, progress) {
      return Q(object).done(fulfilled, rejected, progress);
  };

  Promise.prototype.done = function (fulfilled, rejected, progress) {
      var onUnhandledError = function (error) {
          // forward to a future turn so that ``when``
          // does not catch it and turn it into a rejection.
          Q.nextTick(function () {
              makeStackTraceLong(error, promise);
              if (Q.onerror) {
                  Q.onerror(error);
              } else {
                  throw error;
              }
          });
      };

      // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
      var promise = fulfilled || rejected || progress ?
          this.then(fulfilled, rejected, progress) :
          this;

      if (typeof process === "object" && process && process.domain) {
          onUnhandledError = process.domain.bind(onUnhandledError);
      }

      promise.then(void 0, onUnhandledError);
  };

  /**
   * Causes a promise to be rejected if it does not get fulfilled before
   * some milliseconds time out.
   * @param {Any*} promise
   * @param {Number} milliseconds timeout
   * @param {Any*} custom error message or Error object (optional)
   * @returns a promise for the resolution of the given promise if it is
   * fulfilled before the timeout, otherwise rejected.
   */
  Q.timeout = function (object, ms, error) {
      return Q(object).timeout(ms, error);
  };

  Promise.prototype.timeout = function (ms, error) {
      var deferred = defer();
      var timeoutId = setTimeout(function () {
          if (!error || "string" === typeof error) {
              error = new Error(error || "Timed out after " + ms + " ms");
              error.code = "ETIMEDOUT";
          }
          deferred.reject(error);
      }, ms);

      this.then(function (value) {
          clearTimeout(timeoutId);
          deferred.resolve(value);
      }, function (exception) {
          clearTimeout(timeoutId);
          deferred.reject(exception);
      }, deferred.notify);

      return deferred.promise;
  };

  /**
   * Returns a promise for the given value (or promised value), some
   * milliseconds after it resolved. Passes rejections immediately.
   * @param {Any*} promise
   * @param {Number} milliseconds
   * @returns a promise for the resolution of the given promise after milliseconds
   * time has elapsed since the resolution of the given promise.
   * If the given promise rejects, that is passed immediately.
   */
  Q.delay = function (object, timeout) {
      if (timeout === void 0) {
          timeout = object;
          object = void 0;
      }
      return Q(object).delay(timeout);
  };

  Promise.prototype.delay = function (timeout) {
      return this.then(function (value) {
          var deferred = defer();
          setTimeout(function () {
              deferred.resolve(value);
          }, timeout);
          return deferred.promise;
      });
  };

  /**
   * Passes a continuation to a Node function, which is called with the given
   * arguments provided as an array, and returns a promise.
   *
   *      Q.nfapply(FS.readFile, [__filename])
   *      .then(function (content) {
   *      })
   *
   */
  Q.nfapply = function (callback, args) {
      return Q(callback).nfapply(args);
  };

  Promise.prototype.nfapply = function (args) {
      var deferred = defer();
      var nodeArgs = array_slice(args);
      nodeArgs.push(deferred.makeNodeResolver());
      this.fapply(nodeArgs).fail(deferred.reject);
      return deferred.promise;
  };

  /**
   * Passes a continuation to a Node function, which is called with the given
   * arguments provided individually, and returns a promise.
   * @example
   * Q.nfcall(FS.readFile, __filename)
   * .then(function (content) {
   * })
   *
   */
  Q.nfcall = function (callback /*...args*/) {
      var args = array_slice(arguments, 1);
      return Q(callback).nfapply(args);
  };

  Promise.prototype.nfcall = function (/*...args*/) {
      var nodeArgs = array_slice(arguments);
      var deferred = defer();
      nodeArgs.push(deferred.makeNodeResolver());
      this.fapply(nodeArgs).fail(deferred.reject);
      return deferred.promise;
  };

  /**
   * Wraps a NodeJS continuation passing function and returns an equivalent
   * version that returns a promise.
   * @example
   * Q.nfbind(FS.readFile, __filename)("utf-8")
   * .then(console.log)
   * .done()
   */
  Q.nfbind =
  Q.denodeify = function (callback /*...args*/) {
      if (callback === undefined) {
          throw new Error("Q can't wrap an undefined function");
      }
      var baseArgs = array_slice(arguments, 1);
      return function () {
          var nodeArgs = baseArgs.concat(array_slice(arguments));
          var deferred = defer();
          nodeArgs.push(deferred.makeNodeResolver());
          Q(callback).fapply(nodeArgs).fail(deferred.reject);
          return deferred.promise;
      };
  };

  Promise.prototype.nfbind =
  Promise.prototype.denodeify = function (/*...args*/) {
      var args = array_slice(arguments);
      args.unshift(this);
      return Q.denodeify.apply(void 0, args);
  };

  Q.nbind = function (callback, thisp /*...args*/) {
      var baseArgs = array_slice(arguments, 2);
      return function () {
          var nodeArgs = baseArgs.concat(array_slice(arguments));
          var deferred = defer();
          nodeArgs.push(deferred.makeNodeResolver());
          function bound() {
              return callback.apply(thisp, arguments);
          }
          Q(bound).fapply(nodeArgs).fail(deferred.reject);
          return deferred.promise;
      };
  };

  Promise.prototype.nbind = function (/*thisp, ...args*/) {
      var args = array_slice(arguments, 0);
      args.unshift(this);
      return Q.nbind.apply(void 0, args);
  };

  /**
   * Calls a method of a Node-style object that accepts a Node-style
   * callback with a given array of arguments, plus a provided callback.
   * @param object an object that has the named method
   * @param {String} name name of the method of object
   * @param {Array} args arguments to pass to the method; the callback
   * will be provided by Q and appended to these arguments.
   * @returns a promise for the value or error
   */
  Q.nmapply = // XXX As proposed by "Redsandro"
  Q.npost = function (object, name, args) {
      return Q(object).npost(name, args);
  };

  Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
  Promise.prototype.npost = function (name, args) {
      var nodeArgs = array_slice(args || []);
      var deferred = defer();
      nodeArgs.push(deferred.makeNodeResolver());
      this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
      return deferred.promise;
  };

  /**
   * Calls a method of a Node-style object that accepts a Node-style
   * callback, forwarding the given variadic arguments, plus a provided
   * callback argument.
   * @param object an object that has the named method
   * @param {String} name name of the method of object
   * @param ...args arguments to pass to the method; the callback will
   * be provided by Q and appended to these arguments.
   * @returns a promise for the value or error
   */
  Q.nsend = // XXX Based on Mark Miller's proposed "send"
  Q.nmcall = // XXX Based on "Redsandro's" proposal
  Q.ninvoke = function (object, name /*...args*/) {
      var nodeArgs = array_slice(arguments, 2);
      var deferred = defer();
      nodeArgs.push(deferred.makeNodeResolver());
      Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
      return deferred.promise;
  };

  Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
  Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
  Promise.prototype.ninvoke = function (name /*...args*/) {
      var nodeArgs = array_slice(arguments, 1);
      var deferred = defer();
      nodeArgs.push(deferred.makeNodeResolver());
      this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
      return deferred.promise;
  };

  /**
   * If a function would like to support both Node continuation-passing-style and
   * promise-returning-style, it can end its internal promise chain with
   * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
   * elects to use a nodeback, the result will be sent there.  If they do not
   * pass a nodeback, they will receive the result promise.
   * @param object a result (or a promise for a result)
   * @param {Function} nodeback a Node.js-style callback
   * @returns either the promise or nothing
   */
  Q.nodeify = nodeify;
  function nodeify(object, nodeback) {
      return Q(object).nodeify(nodeback);
  }

  Promise.prototype.nodeify = function (nodeback) {
      if (nodeback) {
          this.then(function (value) {
              Q.nextTick(function () {
                  nodeback(null, value);
              });
          }, function (error) {
              Q.nextTick(function () {
                  nodeback(error);
              });
          });
      } else {
          return this;
      }
  };

  Q.noConflict = function() {
      throw new Error("Q.noConflict only works when Q is used as a global");
  };

  // All code before this point will be filtered from stack traces.
  var qEndingLine = captureLine();

  return Q;

  });

  function loop() {
      global.scene.render();
  }
  function start() {
      isStarted = true;
      global.engine.runRenderLoop(loop);
  }
  function pause() {
      isStarted = false;
      global.engine.stopRenderLoop(loop);
  }
  var isStarted = false;

  function patch() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      if (args.length == 1) {
          if (is.PatchFile(args[0])) {
              if (global.TRACE) {
                  console.groupCollapsed(args[0]);
              }
              return downloadPatchFile(args[0]).then(function (data) {
                  return patch(data).then(function () {
                      console.groupEnd();
                  });
              });
          }
          else {
              // patch([...])
              if (is.Array(args[0])) {
                  return patchChain(args[0]);
              }
              else {
                  // patch({"*:mesh" : { isVisible : false }})
                  if (is.PlainObject(args[0])) {
                      var selector = Object.getOwnPropertyNames(args[0])[0];
                      return patch(selector, args[0][selector]);
                  }
              }
          }
      }
      else {
          if (is.String(args[0])) {
              if (global.TRACE) {
                  console.groupCollapsed(args[0]);
              }
              // patch("*:mesh", { position : { x : 10}}
              switch (args[0]) {
                  case "scene":
                      if (is.Function(args[1])) {
                          var result = execute(args[1]);
                          if (is.Scene(result)) {
                              global.scene = result;
                          }
                          if (!isStarted) {
                              start();
                          }
                          if (global.TRACE) {
                              console.groupEnd();
                          }
                          return Q(global.scene);
                      }
                      else {
                          return patchElement(global.scene, args[1]).then(function () {
                              if (global.TRACE) {
                                  console.groupEnd();
                              }
                          });
                      }
                  case "exec":
                      if (global.TRACE) {
                          console.groupEnd();
                      }
                      return Q(execute(args[1]));
                  default:
                      var elements = select(args[0]).toArray();
                      return patchElements(elements, args[1]).then(function () {
                          if (global.TRACE) {
                              console.groupEnd();
                          }
                      });
              }
          }
          else {
              // patch(mesh1, { isVisible : false })
              return patchElement(args[0], args[1]);
          }
      }
  }
  function execute(func) {
      try {
          if (global.TRACE) {
              console.log(func);
          }
          var result = eval("var canvas=_r.canvas; var engine = _r.engine; var scene=_r.scene; var exec=" + func + ';exec()');
          return result;
      }
      catch (ex) {
          console.error(ex);
      }
  }
  function patchChain(patches) {
      var index = 0;
      function patchItem() {
          if (index === patches.length) {
              return Q();
          }
          else {
              return patch(patches[index]).then(function () {
                  index += 1;
                  return patchItem();
              });
          }
      }
      return patchItem();
  }
  function downloadPatchFile(file) {
      var deferred = Q.defer();
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
                  deferred.resolve(data);
              }
              else {
                  console.warn('BABYLON.Runtime::no data found in ' + file);
                  deferred.resolve([{}]);
              }
          }
          else {
              deferred.reject(status);
          }
      };
      xhr.send();
      return deferred.promise;
  }
  function patchElements(elements, _patch, context) {
      var names = [];
      if (global.TRACE) {
          elements.forEach(function (element) {
              names.push(element.name);
          });
          console.log(names.join(','));
          console.log(_patch);
      }
      var index = 0;
      function patchElementChain() {
          if (index === elements.length) {
              return Q();
          }
          else {
              return patchElement(elements[index], _patch, context).then(function () {
                  index += 1;
                  return patchElementChain();
              });
          }
      }
      return patchElementChain();
  }
  function patchElement(element, patch, context) {
      var properties = Object.getOwnPropertyNames(patch);
      var index = 0;
      function patchPropertyChain() {
          if (index === properties.length) {
              return Q();
          }
          else {
              return patchProperty(element, properties[index], patch, context).then(function () {
                  index += 1;
                  return patchPropertyChain();
              });
          }
      }
      return patchPropertyChain();
  }
  function patchProperty(element, property, source, context) {
      if (is.Primitive(source[property])) {
          var plugin = patch.getPlugin(element, source, property);
          if (plugin) {
              var result = plugin.resolve(element, source, property);
              if (result) {
                  if (is.Promise(result)) {
                      return result.then(function (_result) {
                          element[property] = _result;
                          return Q(element[property]);
                      });
                  }
                  else {
                      element[property] = result;
                  }
                  element[property] = result;
              }
              return Q(source[property]);
          }
          else {
              element[property] = source[property];
              return Q(source[property]);
          }
      }
      else {
          if (is.Function(source[property])) {
              if (is.Function(element[property])) {
                  element[property] = source[property];
                  return Q(source[property]);
              }
              else {
                  try {
                      if (context) {
                          context.push(element);
                      }
                      else {
                          context = [element];
                      }
                      var res = source[property].apply(element, context);
                      if (is.Promise(res)) {
                          return res.then(function (result) {
                              element[property] = result;
                          });
                      }
                      else {
                          if (res) {
                              element[property] = res;
                          }
                          return Q(res);
                      }
                  }
                  catch (ex) {
                      console.error(ex);
                      return Q.reject(ex);
                  }
              }
          }
          else {
              if (!element[property]) {
                  element[property] = {};
              }
              var plugin = patch.getPlugin(element, source, property);
              if (plugin) {
                  var result = plugin.resolve(element, source, property);
                  if (result) {
                      if (is.Promise(result)) {
                          return result.then(function (_result) {
                              element[property] = _result;
                              return Q(element[property]);
                          });
                      }
                      else {
                          element[property] = result;
                      }
                      element[property] = result;
                  }
                  return Q(source[property]);
              }
              else {
                  if (context) {
                      context.push(element);
                  }
                  else {
                      context = [element];
                  }
                  return patchElement(element[property], source[property], context);
              }
          }
      }
  }
  (function (patch) {
      patch.plugins = [];
      function registerPlugin(plugin) {
          patch.plugins.push(plugin);
      }
      patch.registerPlugin = registerPlugin;
      function getPlugin(element, source, property) {
          var plugin = null;
          for (var i = 0; i < patch.plugins.length; i++) {
              if (patch.plugins[i].test(element, source, property)) {
                  plugin = patch.plugins[i];
              }
          }
          return plugin;
      }
      patch.getPlugin = getPlugin;
  })(patch || (patch = {}));

  function downloadScene(options) {
      var assets, fileName;
      if (options.assets) {
          assets = options.assets;
          fileName = options.scene;
      }
      else {
          fileName = options.scene.split('/').pop();
          assets = options.scene.replace(fileName, '');
      }
      var promise = BABYLON.SceneLoader.LoadAssetContainerAsync(assets, fileName, global.scene, function (e) {
          if (options.progress) {
              options.progress(e);
          }
      }).then(function (assetContainer) {
          // success
          createLibrary(assets + fileName, assetContainer);
          if (options.patch) {
              return patch(options.patch).then(function () {
                  if (options.addAllToScene !== false) {
                      assetContainer.addAllToScene();
                  }
                  if (options.ready) {
                      options.ready(assetContainer);
                  }
              });
          }
          else {
              if (options.addAllToScene !== false) {
                  assetContainer.addAllToScene();
              }
              if (options.ready) {
                  options.ready(assetContainer);
              }
          }
      }, function (reason) {
          // error
          if (options.error) {
              options.error(reason);
          }
      });
      return promise;
  }
  function downloadTexture(options) {
      var defer = Q.defer();
      var assetsManager = new BABYLON.AssetsManager(global.scene);
      var task = assetsManager.addTextureTask(options.name, options.url, options.noMipmap, options.invertY, options.samplingMode);
      task.onSuccess = function (task) {
          defer.resolve(task.texture);
          if (options.ready) {
              options.ready(task.texture);
          }
      };
      task.onError = function (reason) {
          defer.reject(reason);
          if (options.error) {
              options.error(reason);
          }
      };
      assetsManager.load();
      return defer.promise;
  }
  function downloadCubeTexture(options) {
      var defer = Q.defer();
      var assetsManager = new BABYLON.AssetsManager(global.scene);
      var task = assetsManager.addTextureTask(options.name, options.url, options.extensions, options.files);
      task.onSuccess = function (task) {
          defer.resolve(task.texture);
          if (options.ready) {
              options.ready(task.texture);
          }
      };
      task.onError = function (reason) {
          defer.reject(reason);
          if (options.error) {
              options.error(reason);
          }
      };
      assetsManager.load();
      return defer.promise;
  }

  var isReady = true;
  var callbacks = [];
  var options = {
      container: null,
      assets: null,
      scene: null,
      activeCamera: null,
      patch: null,
      ktx: false,
      enableOfflineSupport: false,
      progressLoading: null,
      loadingScreen: null,
  };
  function launch(obj) {
      isReady = false;
      options = extend(options, obj);
      // CANVAS
      if (options.container) {
          global.canvas = options.container;
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
      // RESIZE
      window.addEventListener('resize', function () {
          global.engine.resize();
      });
      return _createScene().then(function () {
          return _patch().then(function () {
              _checkActiveCamera();
              _beforeFirstRender();
              start$1();
              isReady = true;
              callbacks.forEach(function (callback) {
                  try {
                      callback.call(global.scene);
                  }
                  catch (ex) {
                      console.error(ex);
                  }
              });
              callbacks.length = 0;
          });
      });
  }
  function _createScene() {
      var defer = Q.defer();
      if (options.scene) {
          if (is.String(options.scene)) {
              // scene is a filename
              if (options.assets) {
                  return downloadScene({
                      scene: options.scene,
                      assets: options.assets
                  });
              }
              else {
                  return downloadScene({
                      scene: options.scene
                  });
              }
          }
          else {
              if (is.Function(options.scene)) {
                  try {
                      var result = eval("var canvas=_r.canvas; var engine = _r.engine; var scene=_r.scene; var createScene=" + options.scene + ';createScene()');
                      if (is.Scene(result)) {
                          global.scene = result;
                      }
                  }
                  catch (ex) {
                      defer.reject(ex);
                      throw ex;
                  }
              }
              else {
                  if (is.Scene(options.scene)) {
                      global.scene = options.scene;
                  }
                  else {
                      defer.reject("invalid scene parameter in _r.launch");
                      throw new Error("invalid scene parameter in _r.launch");
                  }
              }
              defer.resolve();
          }
      }
      else {
          defer.resolve();
      }
      return defer.promise;
  }
  function _patch() {
      if (options.patch) {
          return patch(options.patch);
      }
      else {
          return Q();
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
  function loop$1() {
      global.scene.render();
  }
  function start$1() {
      global.engine.runRenderLoop(loop$1);
  }
  function ready(callback) {
      if (isReady) {
          callback.call(global.scene);
      }
      else {
          callbacks.push(callback);
      }
  }

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

  function getEasingFunction(easing) {
      var mode;
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
                  console.info("_r::unrecognized easing function " + easing);
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
              console.warn("_r::unrecognized easing function " + easing);
              return null;
      }
  }
  function getLoopMode(options) {
      if (is.Boolean(options.loopMode)) {
          if (options.loopMode) {
              return BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT;
          }
      }
      if (is.String(options.loopMode)) {
          if (options.loopMode.toLowerCase() == "cycle") {
              return BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE;
          }
          if (options.loopMode.toLocaleLowerCase() == "relative" || this.loop.toLocaleLowerCase() == "pingpong") {
              return BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE;
          }
      }
      else {
          if (is.Number(options.loopMode)) {
              return options.loopMode;
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
              patch(final, color(newValue));
              break;
          case BABYLON.Animation.ANIMATIONTYPE_FLOAT:
              final = newValue;
              break;
          case BABYLON.Animation.ANIMATIONTYPE_MATRIX:
              final = initial.clone();
              patch(final, newValue);
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
              element.animations.push(animation);
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
  var count = 0;
  function animate(elements, patch, options) {
      var _elements = select(elements);
      var _options = {};
      if (is.Number(options)) {
          _options.duration = options;
      }
      else {
          _options = options;
      }
      _options = extend({}, defaultOptions, _options);
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
          /**
          let animations = getAnimationsForElement(item, patch, _options);
          animations.forEach((animation) => {
            group.addTargetedAnimation(animation, item);
          });**/
      });
      group.speedRatio = _options.speedRatio;
      if (_options.complete) {
          group.onAnimationGroupEndObservable.add(_options.complete);
      }
      group.play();
      return group;
  }

  patch.registerPlugin({
      test: function (element, source, property) {
          return element[property] instanceof BABYLON.Color3 || element[property] instanceof BABYLON.Color4;
      },
      resolve: function (element, source, property) {
          return color(source[property]);
      }
  });

  patch.registerPlugin({
      test: function (element, source, property) {
          return property.trim() === "*";
      },
      resolve: function (element, source, property) {
          if (is.MultiMaterial(element)) {
              return patchElements(element.subMaterials, source[property], element);
          }
          else {
              if (is.Array(element)) {
                  return patchElements(element, source[property]);
              }
              else {
                  return patchElement(element, source[property]);
              }
          }
      }
  });

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
      launch: launch,
      ready: ready,
      start: start,
      pause: pause,
      downloadScene: downloadScene,
      downloadTexture: downloadTexture,
      downloadCubeTexture: downloadCubeTexture,
      createLibrary: createLibrary,
      library: library,
      data: data,
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
      select: select,
      patch: patch,
      match: match,
      Selector: Selector,
      is: is,
      color: color,
      animate: animate,
      extend: extend,
      activeCamera: activateCamera
  };

  return index;

}(BABYLON));
//# sourceMappingURL=_r.js.map
