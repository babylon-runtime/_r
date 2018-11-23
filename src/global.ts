import {is} from "./is.js";
import {BABYLON} from "./BABYLON.js";
import {applyPatch} from "./patch/patch";

let _scene, _engine, _canvas;

export class global {
    static get canvas() {
        if(!_canvas) {
            if(BABYLON.Engine.LastCreatedEngine) {
               let canvas = BABYLON.Engine.LastCreatedEngine.getRenderingCanvas();
               if(canvas) {
                   _canvas = canvas;
                   return _canvas;
               }
            }
            _canvas = document.createElement('canvas');
            _canvas.setAttribute('touch-action', 'none');
            _canvas.style.width = "100%";
            _canvas.style.height = "100%;";
            document.body.appendChild(_canvas);
        }
        return _canvas;
    }

    static set canvas(value) {
        if(is.String(value)) {
            _canvas = document.getElementById(value);
        }
        else {
            _canvas = value;
        }
    }
    static get engine() {
        if(!_engine) {
            if(BABYLON.Engine.LastCreatedEngine) {
                _engine = BABYLON.Engine.LastCreatedEngine;
            }
            else {
                _engine = new BABYLON.Engine(global.canvas, true);
            }

        }
        return _engine;
    }

    static set engine(value) {
        _engine = value;
        // the canvas/window resize event handler
        window.addEventListener('resize', function(){
            _engine.resize();
        });
    }

    static get scene() {
        if(!_scene) {
            if(BABYLON.Engine.LastCreatedScene) {
                _scene = BABYLON.Engine.LastCreatedScene;
            }
            else {
                _scene = new BABYLON.Scene(global.engine);
            }
        }
        return _scene;
    }

    static set scene(value) {
        if(is.Function(value)) {
            window["engine"] = global.engine;
            window["canvas"] = global.canvas;
            _scene = value();
            window["engine"] = null;
            window["canvas"] = null;
        }
        else {
            _scene = value;
        }
    }

    static TRACE = false;

    /**
    static patch(_patch : any[]) {
        let _this = this;
        let promises = [];
        _patch.forEach(function(item) {
            let selector = Object.getOwnPropertyNames(item)[0];
            _this.select(selector).each(function(element) {
                promises.push(applyPatch(element, item[selector]));
            });
        });
        return promises.reduce(Q.when, Q());
    }**/
}



