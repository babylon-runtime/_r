/// <reference types="babylonjs" />
declare interface LaunchOptions {
  container? : string | HTMLElement;
  canvas?: string | HTMLCanvasElement;
  assets?: string;
  scene: Function | string;
  activeCamera?: Function | string | any;
  patch?: Array<any>;
  beforeFirstRender?: Function;
  ktx?: boolean | Array<string>;
  enableOfflineSupport?: boolean;
  progress?: Function;
  loadingScreen?: any;
  load? : string | Array<string>;
  babylon? : string;
}

declare interface AnimationOptions {
  fps?: number;
  duration?: number;
  speedRatio?: number;
  from?: number;
  to?: number;
  loop?: boolean | string | number;
  easing?: string;
  complete?: () => void;
  keys? : [];
}

declare interface Elements {
  constructor(...elements : any);
  add(element : any) : void;
  contains(element : any) : boolean;
  each(callback: Function) : Elements;
  forEach(callback : Function) : Elements;
  map(func : (obj : any) => any) : Elements;
  filter(func : (obj : any) => boolean) : Elements;
  toArray() : Array<any>;
  attr(attribute : string, value? : any) : any;
  first() : any;
  log(property?: string) : void;
  concat(...elements : any[]) : Elements;
  select(selector : string) : Elements;
  dispose() : void;
  addToScene() : void;
  removeFromScene() : void;
  on(events : string, handler : (args : any) => void, repeat? : boolean);
  one(events : string, handler : (args : any) => void);
  off(events : string, handler? : (args : any) => void);
  trigger(events : string, ...extraParameters : any[]);
  patch(any) : Promise<any>;
  animate(patch : any, options? : number | AnimationOptions);
  fadeIn(options? : number | AnimationOptions);
  fadeOut(options? : number | AnimationOptions);
  finish();
}

declare module _r {
  export let canvas : HTMLCanvasElement;
  export let scene : BABYLON.Scene;
  export let engine : BABYLON.Engine;
  export function launch(options: LaunchOptions): Promise<void>;
  export function activateCamera(camera: string | BABYLON.Camera): void;
  export function ready(callback: () => void): void;
  export function on(event: string, handler: (...args: any[]) => void, repeat: boolean): void;
  export function off(event: string, handler?: (...args: any[]) => void): void;
  export function one(event: string, handler: (...args: any[]) => void): void;
  export function trigger(event: string, ...extraParameters: any[]): void;
  export function select(arg: string | any): Elements;
  export function patch(any):  Promise<any>;
  export function data(element : any, key?: string, value?: any) : any;
  export function color(expr: any): BABYLON.Color3 | BABYLON.Color4;
  export function color4(expr: any) : BABYLON.Color4;
  export function animate(elements : any, patch : any, options? : number | AnimationOptions) : BABYLON.AnimationGroup;
  export let fn: any;
  export let queryString : {
    get: (name: any) => string;
    set: (name: any, value: any) => void;
    on: (event: string, handler: (...args: any[]) => void, repeat?: boolean) => void;
    off: (event: string, handler?: (...args: any[]) => void) => void;
    one: (event: string, handler: (...args: any[]) => void) => void;
    trigger: (event: string, extraParameters?: any) => void;
  };
  export let router: {
    hashChangedListener: any[];
    set: (hash: string) => void;
    get: () => string;
    on: (event: TimerHandler, handler?: (...args: any[]) => void, repeat?: boolean) => void;
    off: (event: string, handler?: (...args: any[]) => void) => void;
    one: (event: string, handler: (...args: any[]) => void) => void;
    trigger: (event: string, extraParameters?: any) => void;
    pause: boolean;
  };
  export let loadingScreen : {
    iframe(url : string, id? : string);
    isVisible : boolean;
    message : string;
    progress : number;
    postMessage(key, value);
  };
  export let show : {
    normals(selector? : string, size? : number, color? : string | any);
    wireframe(selector? : string,  epsilon? : number, width? : number, color? : any);
    gizmo(selector? : string, gizmoType?: string, axis?: string, color? : any);
  };
  export let hide : {
    normals(selector? : string)
    wireframe(selector? : string);
    gizmo(selector? : string);
  };
  export function extend(...args: any[]): any;
  export function merge(target: any, source: any, excluded?: Array<string>): any;
  export let is: {
    Function(functionToCheck: any): boolean;
    Number(n: any): boolean;
    PlainObject(n: any): boolean;
    AssetContainer(x: any): boolean;
    Scene(x: any): boolean;
    TransformNode(x: any): boolean;
    Array(x: any): boolean;
    Mesh(x: any): boolean;
    Material(x: any): boolean;
    MultiMaterial(x: any): boolean;
    Texture(x: any): boolean;
    Light(x: any): boolean;
    Camera(x: any): boolean;
    Vector3(x: any): boolean;
    Vector2(x: any): boolean;
    Color(x: any): boolean;
    HexColor(x: any): boolean;
    Float(n: any): boolean;
    Int(n: any): boolean;
    Quaternion(n: any): boolean;
    Matrix(n: any): boolean;
    String(x: any): boolean;
    Size(n: any): boolean;
    PatchFile(expr: string): boolean;
    Boolean(expr: any): boolean;
    BabylonNode(x: any): boolean;
    DOM: ((expr: any) => boolean | {
      canvas(expr: any): boolean;
      div(expr: any): boolean;
      image(expr: any): boolean;
    });
    Primitive(x: any): boolean;
    Promise(x: any): boolean;
    FileWithExtension(file: string, ext: string | string[]): boolean;
    ImageFile(file: string): boolean;
  };
  export function load(resource : string | Array<string>, patch? : any) : Promise<any>;
  namespace load {
    export function script(resource : string | Array<string>, patch? : any) : Promise<any>;
    export function image(image : string, patch? : any) : Promise<HTMLImageElement>;
    export function assets(scene : string, patch? : any, progress? : (event : BABYLON.SceneLoaderProgressEvent) => any) : Promise<BABYLON.AssetContainer>;
    export function material(name : string, patch? : any) : Promise<BABYLON.StandardMaterial>;
    export function pbr(name : string, patch? : any) : Promise<BABYLON.PBRMaterial>;
    export function texture(image : string, patch? : any) : Promise<BABYLON.Texture>;
    export function cubeTexture(url : string, patch? : any) : Promise<BABYLON.CubeTexture>;
    export function patch(file : string) : Promise<any>;
    export function ajax(file : string) : Promise<string>;
    export function JSON(file : string) : Promise<any>;
    export function script(file : string) : Promise<null>;
    export function css(file : string) : Promise<null>;
  }
}