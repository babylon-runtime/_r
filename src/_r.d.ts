interface LaunchOptions {
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

interface AnimationOptions {
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

interface Elements {
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
  on(events : string, handler : (args : any) => void);
  one(events : string, handler : (args : any) => void);
  off(events : string, handler? : (args : any) => void);
  trigger(events : string, ...extraParameters : any[]);
  patch(any) : Promise<any>;
  animate(patch : any, options? : number | AnimationOptions);
  fadeIn(options? : number | AnimationOptions);
  fadeOut(options? : number | AnimationOptions);
  finish();
}

declare const _r : {
  canvas: HTMLCanvasElement;
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  launch(options: LaunchOptions): Promise<void>;
  activateCamera(camera: string | BABYLON.Camera): void;
  ready(callback: () => void): void;
  on(event: string, handler: (...args: any[]) => void, repeat: boolean): void;
  off(event: string, handler?: (...args: any[]) => void): void;
  one(event: string, handler: (...args: any[]) => void): void;
  trigger(event: string, ...extraParameters: any[]): void;
  select(arg: string | any): Elements;
  patch(any):  Promise<any>;
  data(element : any, key?: string, value?: any) : any;
  is: {
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
  color(expr: any): BABYLON.Color3 | BABYLON.Color4;
  color4(expr: any) : BABYLON.Color4;
  animate(elements : any, patch : any, options? : number | AnimationOptions) : BABYLON.AnimationGroup;
  activeCamera(camera : string | BABYLON.Camera);
  fn: any;
  queryString: {
    get: (name: any) => string;
    set: (name: any, value: any) => void;
    on: (event: string, handler: (...args: any[]) => void, repeat?: boolean) => void;
    off: (event: string, handler?: (...args: any[]) => void) => void;
    one: (event: string, handler: (...args: any[]) => void) => void;
    trigger: (event: string, extraParameters?: any) => void;
  };
  router: {
    hashChangedListener: any[];
    set: (hash: string) => void;
    get: () => string;
    on: (event: TimerHandler, handler?: (...args: any[]) => void, repeat?: boolean) => void;
    off: (event: string, handler?: (...args: any[]) => void) => void;
    one: (event: string, handler: (...args: any[]) => void) => void;
    trigger: (event: string, extraParameters?: any) => void;
    pause: boolean;
  };
  loadingScreen : {
    iframe(url : string, id? : string);
    isVisible : boolean;
    message : string;
    progress : number;
    postMessage(key, value);
  }
  show : {
    normals(selector? : string, size? : number, color? : string | any);
    wireframe(selector? : string,  epsilon? : number, width? : number, color? : any);
    gizmo(selector? : string, gizmoType?: string, axis?: string, color? : any);
  }
  hide : {
    normals(selector? : string)
    wireframe(selector? : string);
    gizmo(selector? : string);
  }
  load : ((resource : string | Array<string>, patch? : any) => Promise<any> | {
    image(image : string, patch? : any) : Promise<HTMLImageElement>;
    assets(scene : string, patch? : any, progress? : (event : BABYLON.SceneLoaderProgressEvent) => any) : Promise<BABYLON.AssetContainer>;
    material(name : string, patch? : any) : Promise<BABYLON.StandardMaterial>;
    pbr(name : string, patch? : any) : Promise<BABYLON.PBRMaterial>;
    texture(image : string, patch? : any) : Promise<BABYLON.Texture>;
    cubeTexture(url : string, patch? : any) : Promise<BABYLON.CubeTexture>;
    patch(file : string) : Promise<any>;
    ajax(file : string) : Promise<string>;
    JSON(file : string) : Promise<any>;
    script(file : string) : Promise<null>;
    css(file : string) : Promise<null>;
    });
  extend(...args: any[]): any;
  merge(target: any, source: any, excluded?: Array<string>): any
};