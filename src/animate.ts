import { is } from "./is.js";
import { select } from "./select.js";
import { extend } from "./util/extend.js";
import { color } from "./util/color.js";
import { patch } from "./patch/patch.js";
import { global } from "./global.js";

function getEasingFunction(easing: string): BABYLON.EasingFunction {
  let mode;
  // rtec
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
        console.warn("_r.animate - unrecognized easing function : " + easing + '. Please use something from https://easings.net/');
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
      console.warn("_r.animate - unrecognized easing function " + easing + '.Please use something from https://easings.net/');
      return null;
  }
}

function getLoopMode(options : IAnimationOptions): number {
  if (is.Boolean(options.loop)) {
    if (options.loop) {
      return BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT;
    }
  }
  if (is.String(options.loop)) {
    if ((<string> options.loop).toLowerCase() == "cycle") {
      return BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE;
    }
    if ((<string>options.loop).toLocaleLowerCase() == "relative" || (<string>this.loop).toLocaleLowerCase() == "pingpong") {
      return BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE;
    }
  } else {
    if (is.Number(options.loop)) {
      return <number>options.loop;
    }
  }
  return BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT;
}

function getAnimationType(element, property) : number {
  if (is.Vector2(element[property])) {
    return BABYLON.Animation.ANIMATIONTYPE_VECTOR2;
  }
  if (is.Vector3(element[property])) {
    return BABYLON.Animation.ANIMATIONTYPE_VECTOR3;
  }
  if (is.Number(element[property])) {
    return BABYLON.Animation.ANIMATIONTYPE_FLOAT;
  }
  if (is.Color(element[property])) {
    return BABYLON.Animation.ANIMATIONTYPE_COLOR3;
  }
  if (is.Quaternion(element[property])) {
    return BABYLON.Animation.ANIMATIONTYPE_QUATERNION;
  }
  if (is.Matrix(element[property])) {
    return BABYLON.Animation.ANIMATIONTYPE_MATRIX;
  }
  if (is.Size(element[property])) {
    return BABYLON.Animation.ANIMATIONTYPE_SIZE;
  }
  return null;
}

function isAnimatable(element, property) {
  return getAnimationType(element, property) !== null;
}

function getKeys(element, property, newValue, options) {
  if (options.keys) {
    return options.keys;
  }
  let initial = element[property];
  let final;
  switch (getAnimationType(element, property)) {
    case BABYLON.Animation.ANIMATIONTYPE_COLOR3:
      final = initial.clone();
      select(final).patch(color(newValue));
      break;
    case BABYLON.Animation.ANIMATIONTYPE_FLOAT:
      final = newValue;
      break;
    case BABYLON.Animation.ANIMATIONTYPE_MATRIX:
      final = initial.clone();
      select(final).patch(newValue);
      break;
    default:
      final = initial.clone();
      let properties = Object.getOwnPropertyNames(newValue);
      properties.forEach((property) => {
        final[property] = newValue[property];
      });
      break;
  }
  return [
    {
      frame: 0,
      value: initial
    },
    {
      frame: options.fps * options.duration,
      value: final
    }
  ];
}

function getAnimationsForElement(element : any, patch : any, options : IAnimationOptions) : Array<BABYLON.Animation> {
  let animations = [];
  let properties = Object.getOwnPropertyNames(patch);
  if (!element.animations) {
    element.animations = [];
  }
  properties.forEach((property) => {
    if (!isAnimatable(element, property)) {
      console.error(property + " is not animatable");
    }
    else {
      let animation = new BABYLON.Animation("_r.animation" + element.animations.length, property, options.fps, getAnimationType(element, property), getLoopMode(options));
      let keys = getKeys(element, property, patch[property], options);
      animation.setKeys(keys);
      if (options.easing) {
        animation.setEasingFunction(getEasingFunction(options.easing));
      }
      // element.animations.push(animation);
      animations.push(animation);
    }
  });
  return animations;
}

function findSomethingToAnimate(element : any, patch : any) {
  let properties = Object.getOwnPropertyNames(patch);
  let animatables = [];
  properties.forEach((property) => {
    if (isAnimatable(element, property)) {
      animatables.push({
        element : element,
        property : property,
        patch : patch[property]
      });
    }
    else {
      if (!is.Primitive(patch[property])) {
        let _animatables = findSomethingToAnimate(element[property], patch[property]);
        animatables = animatables.concat(_animatables);
      }
      else {
        return [];
      }
    }
  });
  return animatables;
}

export interface IAnimationOptions {
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

const defaultOptions = {
  fps : 30,
  duration : 0.4,
  speedRatio : 1,
  loopMode : false
};

function getOptions(options? : number | IAnimationOptions) {
  let _options : IAnimationOptions = {};
  if (!options) {
    options = 0.4;
  }
  if (is.Number(options)) {
    _options.duration = <number> options;
    _options.loop = false;
  }
  else {
    _options = <IAnimationOptions> options;
    if (_options.loop) {
      if (is.Boolean(_options.loop) && _options.loop) {
        _options.loop = 'cycle';
      }
    }
    else {
      _options.loop = false;
    }
  }
  _options = extend({}, defaultOptions, _options);
  return _options;
}

let count = 0;

export function animate(elements : any, patch : any, options? : number | IAnimationOptions) : BABYLON.AnimationGroup {
  let _elements = select(elements);
  let _options  = getOptions(options);
  let group = new BABYLON.AnimationGroup("_r.animate.AnimationsGroup" + count++);
  _elements.each((item) => {
    let _animatables = findSomethingToAnimate(item, patch);
    _animatables.forEach((animatable) => {
      let _element = animatable.element;
      let _patch = {};
      _patch[animatable.property] = animatable.patch;
      let animations = getAnimationsForElement(_element, _patch, _options);
      animations.forEach((animation) => {
        group.addTargetedAnimation(animation, _element);
      });
    });
  });
  group.speedRatio = _options.speedRatio;
  if (_options.complete) {
    group.onAnimationGroupEndObservable.add(_options.complete);
  }
  group.onAnimationEndObservable.add((targetedAnimation) => {
    let index = targetedAnimation.target.animations.indexOf(targetedAnimation.animation);
    targetedAnimation.target.animations = targetedAnimation.target.animations.splice(index, 1);
  });
  if (_options.loop != false) {
    group.play(true);
  }
  else {
    group.play();
  }

  return group;
}

global.fn["animate"] = function(patch : any, options? : number | IAnimationOptions) {
  return animate(this.toArray(), patch, options);
};

global.fn["fadeOut"] = function(options? : number | IAnimationOptions) {
  let _options  = getOptions(options);
  let group = new BABYLON.AnimationGroup("_r.animate.AnimationsGroup" + count++);
  this.each((item) => {
    let animations = [];
    if (is.Mesh(item)) {
      animations = getAnimationsForElement(item, {
        visibility : 0
      }, _options);
    }
    if (is.Material(item)) {
      animations = getAnimationsForElement(item, {
        alpha : 0
      }, _options);
    }
    if (is.Texture(item)) {
      animations = getAnimationsForElement(item, {
        level : 0
      }, _options);
    }
    if (is.Light(item)) {
      animations = getAnimationsForElement(item, {
        intensity : 0
      }, _options);
    }
    animations.forEach((animation) => {
      group.addTargetedAnimation(animation, item);
    });
  });
  group.speedRatio = _options.speedRatio;
  if (_options.complete) {
    group.onAnimationGroupEndObservable.add(_options.complete);
  }
  group.play();
  return group;
};

global.fn["fadeIn"] = function(options?) {
  let _options  = getOptions(options);
  let group = new BABYLON.AnimationGroup("_r.animate.AnimationsGroup" + count++);
  this.each((item) => {
    let animations = [];
    if (is.Mesh(item)) {
      animations = getAnimationsForElement(item, {
        visibility : 1
      }, _options);
    }
    if (is.Material(item)) {
      animations = getAnimationsForElement(item, {
        alpha : 1
      }, _options);
    }
    if (is.Texture(item)) {
      animations = getAnimationsForElement(item, {
        level : 1
      }, _options);
    }
    if (is.Light(item)) {
      animations = getAnimationsForElement(item, {
        intensity : 1
      }, _options);
    }
    animations.forEach((animation) => {
      group.addTargetedAnimation(animation, item);
    });
  });
  group.speedRatio = _options.speedRatio;
  if (_options.complete) {
    group.onAnimationGroupEndObservable.add(_options.complete);
  }
  group.play();
  return group;
};

/**
 * Stop the currently-running animation, remove all queued animations, and complete all animations for the matched elements.
 */
global.fn["finish"] = function() {
  this.each((item) => {
    let animatables = global.scene.getAllAnimatablesByTarget(item);
    animatables.forEach((animatable) => {
      animatable.stop();
    });
    item.animations = [];
  });
};