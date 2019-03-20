import { global } from "./global.js";
import { is } from "./is.js";
import { launch, ready } from "./launch.js";
import { start, pause } from "./renderLoop.js";
import { downloadScene, downloadTexture, downloadCubeTexture } from "./download.js";
import { createLibrary, library } from "./library.js";
import { select } from "./select.js";
import { data } from "./data.js";
import { on, off, one, trigger } from "./events.js";
import { keyEvents, onKeyEvent, oneKeyEvent, offKeyEvent } from "./keyEvents.js";
import { patch } from "./patch.js";
import { match } from "./Elements.js";
import { Selector } from "./Selector.js";
import { color } from './color.js';
import { animate } from "./animate.js";
import { extend } from "./extend.js";
import { activateCamera } from "./activateCamera.js";
import "./patch.plugins/index.js";
import { patchElements } from "./patch.js";

export default {
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
    launch : launch,
    ready : ready,
    start : start,
    pause : pause,
    downloadScene : downloadScene,
    downloadTexture : downloadTexture,
    downloadCubeTexture : downloadCubeTexture,
    createLibrary : createLibrary,
    library : library,
    data : data,
    on : function(event: string, handler: (...args: any[]) => void, repeat = true) {
        if (keyEvents.indexOf(event) != -1) {
           onKeyEvent(event, handler, repeat);
        }
        else {
            on(this, event, handler, repeat);
        }
    },
    off : function(event: string, handler?: (...args: any[]) => void) {
        if (keyEvents.indexOf(event) != -1) {
            offKeyEvent(event, handler);
        }
        else {
            off(this, event, handler);
        }
    },
    one : function(event: string, handler: (...args: any[]) => void) {
        if (keyEvents.indexOf(event) != -1) {
            oneKeyEvent(event, handler);
        }
        else {
            one(this, event, handler);
        }
    },
    trigger : function(event: string, extraParameters?: any) {
        trigger(this, event, extraParameters);
    },
    select : select,
    patch : patch,
    match : match,
    is : is,
    color : color,
    animate : animate,
    extend : extend,
    activeCamera : activateCamera,
    fn : global.fn
};