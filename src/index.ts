import { queryString } from "./util/queryString.js";
import { global } from "./global.js";
import { is } from "./is.js";
import { launch, ready } from "./launch.js";
import { start, pause } from "./renderLoop.js";
import { select } from "./select.js";
import { data } from "./data.js";
import { on, off, one, trigger } from "./events/index.js";
import { patch } from "./patch/patch.js";
import "./patch/plugins/index.js";
import { match } from "./Elements.js";
import { color, color4 } from './util/color.js';
import { animate } from "./animate.js";
import { activateCamera } from "./activateCamera.js";
import { show, hide } from "./show.hide/index.js";
import { loadingScreen } from "./util/loadingScreen.js";
import { router } from "./util/router.js";
import { extend } from "./util/extend.js";
import { merge } from "./util/merge.js";
import { load } from "./load.js";
import './util/freeze.js';

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
    activateCamera : activateCamera,
    launch : launch,
    ready : ready,
    start : start,
    pause : pause,
    data : data,
    on : on,
    off : off,
    one : one,
    trigger : trigger,
    select : select,
    patch : patch,
    match : match,
    is : is,
    color : color,
    color4 : color4,
    animate : animate,
    activeCamera : activateCamera,
    fn : global.fn,
    queryString : queryString,
    router : router,
    show : show,
    hide : hide,
    loadingScreen : loadingScreen,
    extend : extend,
    merge : merge,
    load : load
};