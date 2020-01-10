[![Build Status](https://travis-ci.com/babylon-runtime/_r.svg?branch=master)](https://travis-ci.com/babylon-runtime/_r)

[![Gitter](https://badges.gitter.im/babylon-runtime/community.svg)](https://gitter.im/babylon-runtime/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# Babylon Runtime
A lightweight, *write less, do more*, [BabylonJS](https://www.babylonjs.com/) library.
## Code less, Babylon more

<img src="https://raw.githubusercontent.com/babylon-runtime/_r.assets/master/_runtime-logo/exports/_runtime-logo_circleWhite_512.png" alt="babylon runtime logo" width="250" >

Demo, API & Examples : [https://babylon-runtime.github.io/](https://babylon-runtime.github.io/)

## What is _r ?

**_r** is a small, and feature-rich JavaScript library. It makes things like scene manipulation, event handling, animation, much simpler with an easy-to-use API.
 The purpose of **_r** is to make BabylonJS much easier to use and maintain in the 3D workflow.

## A Brief Look

### Scene patching
```js
_r.select("mesh1, mesh2").patch({
    position : {
        x : 10
    },
    material : {
         diffuseColor : "#ff0000"
    },
    isVisible : true
});
```
### Event Handling
```js
_r.select("mesh1").on("OnPickTrigger", function() {
    console.log(this.name + ' has been picked');
});
```
### Animations
```js
_r.animate("camera1", {
    position : { x : 0, y : 0, z : 0 },
    rotation : { x : 0, y : 0, z : 0 },
    fov : 0.1
}, 2); // in seconds
```
 ##