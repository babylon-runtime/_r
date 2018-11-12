import {is} from "./is.js";
import {BABYLON} from "./BABYLON.js";

let _scene, _engine, _canvas;

export class global {
    static get canvas() {
        if(!_canvas) {
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
            _engine = new BABYLON.Engine(global.canvas, true);
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
            if(global.engine.LastCreatedScene) {
                _scene = global.engine.LastCreatedScene;
            }
            else {
                _scene = new BABYLON.Scene(global.engine);
            }
        }
        return _scene;
    }

    static set scene(value) {
        if(is.Function(value)) {
            (function(win) {
                // we want to copy / paste from playground so we create global variables.
                win["engine"] = global.engine;
                win["scene"] = global.scene;
                win["canvas"] = global.canvas;
                _scene = value(global.scene, global.engine, global.canvas);
                global.engine =  win["engine"];
                global.canvas = win["canvas"];
                global.scene = win["scene"];
                // but we don't want to pollute the window
                win["engine"] = null;
                win["scene"] = null;
                win["canvas"] = null;
            })(window)
        }
        else {
            _scene = value;
        }
    }
}



