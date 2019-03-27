import { BABYLON } from '../BABYLON.js';
import { is } from '../is.js';

export function color(expr: any): BABYLON.Color3 {
  if (expr instanceof BABYLON.Color3 || expr instanceof BABYLON.Color4) {
    return expr;
  }
  if (is.HexColor(expr)) {
    return BABYLON.Color3.FromHexString(expr);
  }
  if (is.PlainObject(expr)) {
    if (expr.hasOwnProperty("r") || expr.hasOwnProperty("g") || expr.hasOwnProperty("b") || expr.hasOwnProperty("a")) {
      let r = expr["r"] || 0;
      let g = expr["g"] || 0;
      let b = expr["b"] || 0;
      if (expr["a"]) {
        return new BABYLON.Color4(r, g, b, expr["a"]);
      } else {
        return new BABYLON.Color3(r, g, b);
      }
    } else {
      console.error("_r.to.Color - invalid color : ", expr);
      return new BABYLON.Color3(0, 0, 0);
    }
  }
  if (is.Array(expr)) {
    if (expr.length == 3) {
      return BABYLON.Color3.FromArray(expr);
    }
    if (expr.length == 4) {
      return BABYLON.Color4.FromArray(expr);
    }
    console.error("_r.to.Color - invalid color : ", expr);
    return new BABYLON.Color3(0, 0, 0);
  }
  if (is.String(expr)) {
    expr = expr.trim().toLocaleLowerCase();
    if (expr.indexOf('rgb(') == 0) {
      var rgb = expr.substring(expr.indexOf('(') + 1, expr.lastIndexOf(')')).split(/,\s*/);

      let r = parseFloat(rgb[0]);
      let g = parseFloat(rgb[1]);
      let b = parseFloat(rgb[2]);
      return new BABYLON.Color3(!isNaN(r) ? (r / 255) : 0, !isNaN(g) ? (g / 255) : 0, !isNaN(b) ? (b / 255) : 0);
    } else {
      if (expr.indexOf('rgba(') == 0) {
        var rgba = expr.substring(expr.indexOf('(') + 1, expr.lastIndexOf(')')).split(/,\s*/);
        let r = parseFloat(rgba[0]);
        let g = parseFloat(rgba[1]);
        let b = parseFloat(rgba[2]);
        let a = parseFloat(rgba[3]);
        return new BABYLON.Color4(!isNaN(r) ? (r / 255) : 0, !isNaN(g) ? (g / 255) : 0, !isNaN(b) ? (b / 255) : 0, !isNaN(a) ? (a / 255) : 0);
      } else {
        switch (expr) {
          case 'red' :
            return BABYLON.Color3.Red();
          case 'green' :
            return BABYLON.Color3.Green();
          case 'blue' :
            return BABYLON.Color3.Blue();
          case 'black' :
            return BABYLON.Color3.Black();
          case 'white' :
            return BABYLON.Color3.White();
          case 'purple' :
            return BABYLON.Color3.Purple();
          case 'magenta' :
          case 'pink' :
            return BABYLON.Color3.Magenta();
          case 'yellow' :
            return BABYLON.Color3.Yellow();
          case 'teal' :
          case 'cyan' :
            return BABYLON.Color3.Teal();
          case 'gray' :
          case 'grey' :
            return BABYLON.Color3.Gray();
          case 'random':
            return BABYLON.Color3.Random();
          default :
            console.error("_r.to.Color - invalid color : ", expr);
            return new BABYLON.Color3(0, 0, 0);
        }
      }
    }
  }
}

export function color4(expr: any) : BABYLON.Color4 {
  let _color = color(expr);
  return new BABYLON.Color4(_color.r, _color.g, _color.b, 1);
}