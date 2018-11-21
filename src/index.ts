import { global } from "./global.js";
import { is } from "./is.js";
import { launch, ready, start, pause } from "./launch.js";
import { importScene, downloadScene} from "./import.js";
import { createLibrary, library} from "./library.js";
import { Elements, find } from "./Elements.js";
import { data } from "./data.js"
import { on, off, one, trigger } from "./events.js";

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
    data : data,
    on : on,
    off : off,
    one : one,
    trigger : trigger,
    select : function(arg) {
        if(is.String(arg)) {
            return find(arg, global.scene);
        }
        else {
            return new Elements(arg);
        }
    }
}
