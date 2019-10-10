```js
_r.animate( elements, patch, options )
```
* **elements** : selector (string), object or array of objects
* **options** : number or object (list of options)
* returns a [BABYLON.AnimationGroup](https://doc.babylonjs.com/api/classes/babylon.animationgroup)
```js
_r.animate("camera1", {
    position : { x : 0, y : 0, z : 0 },
    rotation : { x : 0, y : 0, z : 0 },
    fov : 0.1
}, 2); // in seconds
```
* options :
    * **duration** (optional) in seconds : number, default : 0.4
    * **easing** (optional) : string from https://easings.net/, default : none
    * **complete** (optional) : Function for animation end
    * **loop** (optional) : true for a cycle animation, default : false
```js
_r.animate("mesh1", { material : { alpha : 0 } }, {
    duration : 2, // in seconds
    easing : "easeInSine", // https://easings.net/
    complete : function() {
        console.log("animation complete");
    },
    loop : true // cycle
});
```

