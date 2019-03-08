import { BABYLON } from './BABYLON.js';
import { is } from "./is.js";
import { select } from "./select.js";
import { global } from "./global.js";
import { Elements } from "./Elements.js";
import { color } from "./color.js";
import { patch } from "./patch.js";

declare const Q;

export class Animation {
  public animationType: number;
  public keys: Array<any>;
  public easing: string;
  public fps: number;
  public duration: number;
  public speedRatio: number;
  public enableBlending: boolean;
  public blendingSpeed: number;
  public loop: string | number | boolean;
  public animatables: Array<BABYLON.Animatable>;
  public onAnimationEnd: () => void;
  public onAnimationStart: () => void;
  public _onAnimationFrame: (frame: number, callback: () => void) => void;

  constructor(public elements: any, public property: string, public value: any) {
    this.fps = 30;
    this.duration = 0.4;
    this.speedRatio = 1;
    this.elements = select(elements);
    this.loop = false;
    let element = select(elements)[0];
    if (is.Vector2(element[property])) {
      this.animationType = BABYLON.Animation.ANIMATIONTYPE_VECTOR2;
      return;
    }
    if (is.Vector3(element[property])) {
      this.animationType = BABYLON.Animation.ANIMATIONTYPE_VECTOR3;
      return;
    }
    if (is.Number(element[property])) {
      this.animationType = BABYLON.Animation.ANIMATIONTYPE_FLOAT;
      return;
    }
    if (is.Color(element[property])) {
      this.animationType = BABYLON.Animation.ANIMATIONTYPE_COLOR3;
      return;
    }
    if (is.Quaternion(element[property])) {
      this.animationType = BABYLON.Animation.ANIMATIONTYPE_QUATERNION;
      return;
    }
    if (is.Matrix(element[property])) {
      this.animationType = BABYLON.Animation.ANIMATIONTYPE_MATRIX;
      return;
    }
  }

  getKeys(element: any) {
    if (this.keys) {
      return this.keys;
    } else {
      let initialValue = element[this.property];
      let finalValue;
      switch (this.animationType) {
        case BABYLON.Animation.ANIMATIONTYPE_COLOR3:
          finalValue = initialValue.clone();
          patch(finalValue,  color(this.value));
          break;
        case BABYLON.Animation.ANIMATIONTYPE_FLOAT:
          finalValue = this.value;
          break;
        case BABYLON.Animation.ANIMATIONTYPE_MATRIX:
          finalValue = initialValue.clone();
          patch(finalValue, this.value);
          break;
        default:
          finalValue = initialValue.clone();
          let properties = Object.getOwnPropertyNames(this.value);
          properties.forEach((property) => {
            finalValue[property] = this.value[property];
          });
          break;
      }
      return [
        {
          frame: 0,
          value: initialValue
        },
        {
          frame: this.fps * this.duration,
          value: finalValue
        }
      ];

    }
  }

  private onComplete() {
    if (this.animatables) {
      this.animatables.forEach(function(animatable) {
        if (animatable.animationStarted) {
          return;
        }
      });
      if (this.onAnimationEnd) {
        this.onAnimationEnd();
      }
    }
  }

  getLoopMode(): number {
    if (is.Boolean(this.loop)) {
      if (this.loop) {
        return BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT;
      }
    }
    if (is.String(this.loop)) {
      if ((<string>this.loop).toLowerCase() == "cycle") {
        return BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE;
      }
      if ((<string>this.loop).toLocaleLowerCase() == "relative" || (<string>this.loop).toLocaleLowerCase() == "pingpong") {
        return BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE;
      }
    } else {
      if (is.Number(this.loop)) {
        return <number>this.loop;
      }
    }
    return BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT;
  }
  play(from?: number, to?: number) {
    let loop = this.getLoopMode();
    this.elements.each((element) => {
      if (!element.animations) {
        element.animations = [];
      }
      let animation = new BABYLON.Animation("_r.animation" + element.animations.length, this.property, this.fps, this.animationType, loop);
      let keys = this.getKeys(element);
      animation.setKeys(keys);
      if (this.enableBlending == true) {
        animation.enableBlending = true;
        if (this.blendingSpeed) {
          animation.blendingSpeed = this.blendingSpeed;
        }
      }

      if (this.easing) {
        animation.setEasingFunction(Animation.getEasingFunction(this.easing));
      }
      element.animations.push(animation);

      if (!this.animatables) {
        this.animatables = [];
      }
      /**
      let animatable = global.scene.beginAnimation(element, from ? from : 0, to ? to : this.fps * this.duration, (this.loop != false), this.speedRatio, () => {
        this.onComplete();
      });
      //animatable.onAnimationEnd = ;
      this.animatables.push(animatable);**/
    });
    /**
    this.elements.each((element) => {
      global.scene.beginDirectAnimation(element, element.animations, from ? from : 0, to ? to : this.fps * this.duration, this.speedRatio, () => {
        this.onComplete();
      });
    });**/
    if (this.animatables && this.animatables.length > 0) {
      if (this.onAnimationStart) {
        this.onAnimationStart();
      }
    }
  }
  pause() {
    this.elements.each(function(element) {
      let animatable = global.scene.getAnimatableByTarget(element);
      animatable.pause();
    });
  }

  restart() {
    this.elements.each(function(element) {
      let animatable = global.scene.getAnimatableByTarget(element);
      animatable.restart();
    });
  }

  stop() {
    this.elements.each(function(element) {
      let animatable = global.scene.getAnimatableByTarget(element);
      animatable.stop();
    });
  }

  reset() {
    this.elements.each(function(element) {
      let animatable = global.scene.getAnimatableByTarget(element);
      animatable.reset();
    });
  }

  static getEasingFunction(easing: string): BABYLON.EasingFunction {
    let mode;
    let func;
    if (easing.indexOf("easeInOut") != -1) {
      mode = BABYLON.EasingFunction.EASINGMODE_EASEINOUT;
      func = easing.replace("easeInOut", "");
    } else {
      if (easing.indexOf("easeIn") != -1) {
        mode = BABYLON.EasingFunction.EASINGMODE_EASEIN;
        func = easing.replace("easeIn", "");
      } else {
        if (easing.indexOf("easeOut") != -1) {
          mode = BABYLON.EasingFunction.EASINGMODE_EASEOUT;
          func = easing.replace("easeOut", "");
        } else {
          console.info("_r::unrecognized easing function " + easing);
          return null;
        }
      }
    }
    let easingFunction;
    switch (func) {
      case "Sine":
        easingFunction = new BABYLON.SineEase();
        easingFunction.setEasingMode(mode);
        return easingFunction;
      case "Quad":
        easingFunction = new BABYLON.QuadraticEase();
        easingFunction.setEasingMode(mode);
        return easingFunction;
      case "Cubic":
        easingFunction = new BABYLON.CubicEase();
        easingFunction.setEasingMode(mode);
        return easingFunction;
      case "Quart":
        easingFunction = new BABYLON.QuarticEase();
        easingFunction.setEasingMode(mode);
        return easingFunction;
      case "Quint":
        easingFunction = new BABYLON.QuinticEase();
        easingFunction.setEasingMode(mode);
        return easingFunction;
      case "Expo" :
        easingFunction = new BABYLON.ExponentialEase();
        easingFunction.setEasingMode(mode);
        return easingFunction;
      case "Circ":
        easingFunction = new BABYLON.CircleEase();
        easingFunction.setEasingMode(mode);
        return easingFunction;
      case "Back":
        easingFunction = new BABYLON.BackEase();
        easingFunction.setEasingMode(mode);
        return easingFunction;
      case "Elastic":
        easingFunction = new BABYLON.ElasticEase();
        easingFunction.setEasingMode(mode);
        return easingFunction;
      case "Bounce":
        easingFunction = new BABYLON.BounceEase();
        easingFunction.setEasingMode(mode);
        return easingFunction;
      default:
        console.warn("_r::unrecognized easing function " + easing);
        return null;
    }
  }
}

export interface IAnimation {
  fps?: number;
  duration?: number;
  speedRatio?: number;
  name?: string;
  from?: number;
  to?: number;
  loopMode?: boolean | number;
  easing?: string;
  step: (frame) => void;
  progress: (promise, progress, remaining) => void;
  complete: () => void;
  start: () => void;
  keys: Array<any>;
}

export function animate(elements: string | Elements, properties: any, options?: number | IAnimation | any) : Q.Promise<null>  {
  let defer = Q.defer();
  let animations = [];
  Object.getOwnPropertyNames(properties).forEach(function(property) {
    let animation = new Animation(elements, property, properties[property]);
    if (is.Number(options)) {
      animation.duration = <number>options;
    } else {
      for (let option in <IAnimation>options) {
        animation[option] = options[option];
      }
    }
    animations.push(animation);
    animation.play();
  });
  select(elements).each(function(element) {
    global.scene.beginDirectAnimation(element, element.animations, undefined, undefined, false, 1, function() {
      if (options.onComplete) {
        options.onComplete(element);
      }
    });
  });
  return defer.promise;
}