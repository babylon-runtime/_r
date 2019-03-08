import { global } from "./global.js";

function loop() {
  global.scene.render();
}

export function start() {
  isStarted = true;
  global.engine.runRenderLoop(loop);
}

export function pause() {
  isStarted = false;
  global.engine.stopRenderLoop(loop);
}

export let isStarted = false;