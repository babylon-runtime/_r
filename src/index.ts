import { global } from "./global.js";
import { launch, ready, start, pause } from "./launch.js";

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
    launch : launch,
    ready : ready,
    start : start,
    pause : pause
}
