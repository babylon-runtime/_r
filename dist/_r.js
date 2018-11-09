var _r = (function (BABYLON) {
    'use strict';

    console.log("babylon runtime v(0.0.1)")

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
                    _canvas = document.createElement('canvas');
                    _canvas.setAttribute('touch-action', 'none');
                    _canvas.style.width = "100%";
                    _canvas.style.height = "100%;";
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
                    _engine = new BABYLON.Engine(global.canvas, true);
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
                    if (global.engine.LastCreatedScene) {
                        _scene = global.engine.LastCreatedScene;
                    }
                    else {
                        _scene = new BABYLON.Scene(global.engine);
                    }
                }
                return _scene;
            },
            set: function (value) {
                if (is.Function(value)) {
                    _scene = value(_scene, global.engine, global.canvas);
                }
                else {
                    _scene = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        return global;
    }());

    function activateCamera(camera) {
        if (global.scene.activeCamera) {
            global.scene.activeCamera.detachControl();
        }
        global.scene.setActiveCameraByName(camera);
        global.scene.activeCamera.attachControl(global.canvas, true);
    }

    //import { patch } from "./patch.js";
    var isReady = true;
    var callbacks = [];
    function launch(obj) {
        isReady = false;
        if (obj.container) {
            global.canvas = obj.container;
        }
        if (obj.ktx) {
            if (is.Array(obj.ktx)) {
                global.engine.setTextureFormatToUse(obj.ktx);
            }
            else {
                if (obj.ktx === true) {
                    global.engine.setTextureFormatToUse(['-astc.ktx', '-dxt.ktx', '-pvrtc.ktx', '-etc2.ktx']);
                }
            }
        }
        if (obj.enableOfflineSupport) {
            global.engine.enableOfflineSupport = obj.enableOfflineSupport;
        }
        else {
            global.engine.enableOfflineSupport = false;
        }
        if (obj.loadingScreen) {
            global.engine.loadingScreen = obj.loadingScreen;
        }
        if (obj.scene) {
            if (is.String(obj.scene)) {
                // scene is a filename
                BABYLON.SceneLoader.Load(obj.assets, obj.scene, global.engine, function (scene) {
                    global.scene = scene;
                    if (obj.patch) {
                        // TODO
                        throw new Error("patches in launch not yet available");
                        /**
                        patch(obj.patch).then(function() {
                            run(obj);
                        })**/
                    }
                    else {
                        run(obj);
                    }
                });
            }
            else {
                // setter accept function and object.
                global.scene = obj.scene;
                if (obj.patch) {
                    // TODO
                    throw new Error("patches in launch not yet available");
                    /**
                    patch(obj.patch).then(function() {
                        run(obj);
                    })**/
                }
                else {
                    run(obj);
                }
            }
        }
    }
    function run(obj) {
        if (obj.activeCamera) {
            if (is.String(obj.activeCamera)) {
                activateCamera(obj.activeCamera);
            }
            else {
                if (is.Function(obj.activeCamera)) {
                    try {
                        var camera = obj.activeCamera.call(global.scene);
                        global.scene.activeCamera = camera;
                    }
                    catch (ex) {
                        console.error("_r.launch() error on activeCamera", ex);
                    }
                }
                else {
                    global.scene.activeCamera = obj.activeCamera;
                }
            }
        }
        if (!global.scene.activeCamera && global.scene.cameras.length > 0) {
            global.scene.activeCamera = global.scene.cameras[0];
        }
        window.addEventListener('resize', function () {
            global.engine.resize();
        });
        global.engine.runRenderLoop(function () {
            global.scene.render();
        });
        isReady = true;
        callbacks.forEach(function (callback) {
            callback.call(global.scene);
        });
        callbacks.length = 0;
    }
    function ready(callback) {
        if (isReady) {
            callback.call(global.scene);
        }
        else {
            callbacks.push(callback);
        }
    }

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
        launch: launch,
        ready: ready
    };

    return index;

}(BABYLON));
//# sourceMappingURL=_r.js.map
