import { global } from "./global.js";
import { launch, ready, start, pause } from "./launch.js";
import { importScene, downloadScene} from "./import.js";
import { createLibrary, library} from "./library.js";
import { Elements, find } from "./Elements.js";

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
        return global.TRACE
    },
    set TRACE(value) {
        global.TRACE = value
    },
    launch : launch,
    ready : ready,
    start : start,
    pause : pause,
    import : importScene,
    download : downloadScene,
    createLibrary : createLibrary,
    library : library,
    select : function(selector) {
        return find(selector, global.scene);
    }
}
