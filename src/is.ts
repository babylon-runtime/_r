export module is {
  export function Function(functionToCheck): boolean {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  export function Number(n): boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  export function PlainObject(n): boolean {
    // Basic check for Type object that's not null
    if (typeof n == 'object' && n !== null) {
      // If Object.getPrototypeOf supported, use it
      if (typeof Object.getPrototypeOf == 'function') {
        var proto = Object.getPrototypeOf(n);
        return proto === Object.prototype || proto === null;
      }
      // Otherwise, use internal class
      // This should be reliable as if getPrototypeOf not supported, is pre-ES5
      return Object.prototype.toString.call(n) == '[object Object]';
    }
    // Not an object
    return false;
  }

  export function AssetContainer(x: any) {
    return x instanceof BABYLON.AssetContainer;
  }

  export function Scene(x: any) {
    return x instanceof BABYLON.Scene;
  }

  export function TransformNode(x : any) {
    return x instanceof BABYLON.TransformNode;
  }

  export function Array(x: any): boolean {
    return window['Array'].isArray(x);
  }

  export function Mesh(x: any): boolean {
    return x instanceof BABYLON.AbstractMesh;
  }

  export function Material(x: any): boolean {
    return x instanceof BABYLON.Material;
  }

  export function MultiMaterial(x: any): boolean {
    return x instanceof BABYLON.MultiMaterial;
  }

  export function Texture(x: any): boolean {
    return x instanceof BABYLON.Texture;
  }

  export function Light(x: any): boolean {
    return x instanceof BABYLON.Light;
  }

  export function Camera(x: any): boolean {
    return x instanceof BABYLON.Camera;
  }

  export function Vector3(x: any): boolean {
    return x instanceof BABYLON.Vector3 || (is.Array(x) && x.length == 3);
  }

  export function Vector2(x: any): boolean {
    return x instanceof BABYLON.Vector2;
  }

  export function Color(x: any): boolean {
    //TODO
    //return HexColor(x) || x instanceof BABYLON.Color3 || x instanceof BABYLON.Color4 || _r.colorNames[x] != null || (is.String(x) && (x.trim().indexOf('rgb(') == 0 ||  x.trim().indexOf('rgba(') == 0));
    return HexColor(x) || x instanceof BABYLON.Color3 || x instanceof BABYLON.Color4 || (is.String(x) && (x.trim().indexOf('rgb(') == 0 || x.trim().indexOf('rgba(') == 0));
  }

  export function HexColor(x: any): boolean {
    return String(x) && x[0] == '#';
  }

  export function Float(n: any): boolean {
    return Number(n) === n && n % 1 !== 0;
  }

  export function Int(n: any): boolean {
    return Number(n) === n && n % 1 === 0;
  }

  export function Quaternion(n: any): boolean {
    return n instanceof BABYLON.Quaternion;
  }

  export function Matrix(n: any): boolean {
    return n instanceof BABYLON.Matrix;
  }

  export function String(x: any): boolean {
    return typeof x === "string";
  }

  export function Size(n: any): boolean {
    return n instanceof BABYLON.Size;
  }

  export function PatchFile(expr: string) {
    return FileWithExtension(expr, ["runtime", "patch", "js"]);
  }

  export function Boolean(expr: any): boolean {
    return typeof expr == 'boolean';
  }

  /**
   * Camera || Light || Material || Mesh || Texture ||
   * @param x
   * @constructor
   */
  export function BabylonNode(x: any) {
    return is.Camera(x) || is.Light(x) || is.Material(x) || is.Mesh(x) || is.Texture(x);
  }

  /**
   * Check is a javascript Object is a DOM Object
   * @param expr
   * @constructor
   */
  export function DOM(expr: any): boolean {
    // from https://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
    return (
      typeof HTMLElement === "object" ? expr instanceof HTMLElement : //DOM2
        expr && typeof expr === "object" && expr !== null && expr.nodeType === 1 && typeof expr.nodeName === "string"
    );
  }

  /**
   * Test for any Primitive
   * @param x
   * @returns {boolean}
   * @constructor
   */
  export function Primitive(x: any) {
    return x !== Object(x);
  }

  export function Promise(x: any) {
    return x && typeof x["then"] == 'function';
  }

  export function FileWithExtension(file : string, ext : string | string[]) {
    if (typeof file !== 'string') {
      return false;
    }
    let split = file.split('.');
    if (split.length === 1) {
      return false;
    }
    let extension = split.pop().trim();
    if (is.Array(ext)) {
      ext = <string[]> ext;
      for (let i = 0; i < ext.length; i++) {
        let _ext = ext[i].trim();
        if (_ext === extension || _ext === ('.' + extension)) {
          return true;
        }
      }
      return false;
    }
    else {
      return ext === extension || ext === ('.' + extension);
    }
  }

  export function ImageFile(file : string) {
    return FileWithExtension(file, ["jpg", "jpeg", "png", "gif"]);
  }
}
