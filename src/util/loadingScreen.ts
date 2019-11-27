import { global } from "../global.js";

interface ICustomLoadingScreen {
  isVisible : boolean;
  message : string;
  progress : number;
  postMessage? : Function;
}

export class iFrameLoadingScreen {
  public iframe : HTMLIFrameElement;
  private _attached = false;
  private _message : string;
  private _progress : number;
  private _contentDocument;
  constructor(url : string, id? : string) {
    this.iframe = document.createElement('iframe');
    this.iframe.src = url;
    if (id) {
      this.iframe.id = id;
    }
    this.iframe.addEventListener('transitionend', () => {
      if (!this.isVisible) {
        this.parentNode.removeChild(this.iframe);
        this._attached = false;
      }
    });
    this.iframe.classList.add('runtime-loadingScreen');
  }
  private get parentNode() {
    return global.canvas.parentNode;
  }
  displayLoadingUI() {
    if (!this._attached) {
      this.iframe.onload = () => {
        if (this.iframe.contentDocument) {
          this._contentDocument = this.iframe.contentDocument;
        } else {
          this._contentDocument =  this.iframe.contentWindow.document;
        }
        this.message = this._message;
        if (this._progress) {
          this.progress = this._progress;
        }
      };
      this.parentNode.appendChild(this.iframe);
      this._attached = true;
    }
    this.iframe.classList.add('visible');
  }
  hideLoadingUI() {
    this.iframe.classList.remove('visible');
  }
  get isVisible() {
    return this.iframe.classList.contains('visible');
  }
  set isVisible(value : boolean) {
    if (value) {
      this.displayLoadingUI();
    }
    else {
      this.hideLoadingUI();
    }
  }
  get message() {
    return this._message;
  }
  set message(value : string) {
    this._message = value;
    if (this._contentDocument) {
      let elements = this._contentDocument.getElementsByClassName('runtime-loading-message');
      for (let i = 0; i < elements.length; i++) {
        elements.item(i).innerHTML = value;
      }
      this.postMessage({
        type : "message",
        value : value
      });
    }
  }
  get progress() {
    return this._progress;
  }
  set progress(value : number) {
    this._progress = value;
    if (this._contentDocument) {
      let elements = this._contentDocument.getElementsByClassName('runtime-loading-progress');
      for (let i = 0; i < elements.length; i++) {
        elements.item(i).innerHTML = value.toString() + '%';
      }
      this.postMessage({
        type : "progress",
        value : value
      });
    }
  }
  public postMessage(data) {
    setTimeout(() => {
      let json = JSON.stringify(data);
      this.iframe.contentWindow.postMessage(json.toString(), location.origin);
    }, 100);
  }
}

export class loadingScreen  {
  private static _instance : ICustomLoadingScreen;
  private static get instance() : ICustomLoadingScreen {
    return this._instance;
  }
  static iframe(url : string, id? : string) {
    this.activate(new iFrameLoadingScreen(url, id));
    global.engine.loadingScreen = this._instance;
    return this._instance;
  }
  static activate(loadingScreen) {
    this._instance = loadingScreen;
  }
  static get isVisible() : boolean {
    if (this._instance) {
      return this._instance.isVisible;
    }
    else {
      let div = document.getElementById('babylonjsLoadingDiv');
      if (div) {
        return div.style.opacity === '1';
      }
      else {
        return false;
      }
    }
  }
  static set isVisible(value : boolean) {
    if (this._instance) {
      this._instance.isVisible = value;
    }
    else {
      if (value) {
        let div = document.getElementById('babylonjsLoadingDiv');
        if (div && div.style.opacity === '0') {
          div.style.opacity = '1';
        }
        global.engine.displayLoadingUI();
      }
      else {
        global.engine.hideLoadingUI();
      }
    }
  }
  static get message() : string {
    if (this._instance) {
       return this._instance.message;
    }
    else {
      return global.engine.loadingScreen.loadingUIText;
    }
  }
  static set message(value : string) {
    if (this._instance) {
      this.instance.message = value;
    }
    else {
      global.engine.loadingScreen.loadingUIText = value;
    }
  }
  static get progress() : number {
    if (this._instance) {
      return this.instance.progress;
    }
    else {
      console.error("TODO _r.loadingScreen");
    }
  }
  static set progress(value : number) {
    if (this._instance) {
      this.instance.progress = value;
    }
    else {
      this.message += ' ' + value + '%';
    }
  }
  static postMessage(key, value) {
    if (this._instance.postMessage) {
      this._instance.postMessage(key, value);
    }
    else {
      console.error('loadingScreen is not an iframe');
    }
  }
}
