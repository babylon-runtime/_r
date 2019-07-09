import { global } from "../global.js";

export class loadingScreen {
  static show() {
    global.engine.displayLoadingUI();
  }
  static hide() {
    global.engine.hideLoadingUI();
  }
  static get text() : string {
    return global.engine.text;
  }
  static set text(value : string) {
    global.engine.text = value;
  }
  static get backgroundColor() : string {
    return  global.engine.loadingUIBackgroundColor;
  }
  static set backgroundColor(value : string) {
    global.engine.loadingUIBackgroundColor = value;
  }
}