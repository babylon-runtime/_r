```js
_r.launch(options)
```

* options
    * required :
        * scene: Function or string;
    * optionals :
        * container : string or HTMLElement;
        * canvas: string or HTMLCanvasElement;
        * assets: string;
        * activeCamera: Function or string or BABYLON.Camera;
        * patch: Array<any>;
        * beforeFirstRender: Function;
        * ktx: boolean or Array<string>;
        * enableOfflineSupport: boolean;
        * progress: Function;
        * loadingScreen: [custom loading screen](https://doc.babylonjs.com/how_to/creating_a_custom_loading_screen);

* Examples 

```js
_r.launch({
    scene : function() {
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
        // sphere.position.y = 1;
        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
        return scene;
    },
    activeCamera : function() {
        new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 1.6, 0), _r.scene);
    },
    patch : [
        "mesh.patch",
        "material.patch"
    ]
});
```
```js
 _r.launch({
    scene : "https://models.babylonjs.com/CornellBox/cornellBox.babylon",
});
_r.ready(function() {
    console.log("cornellbox loaded");
})
```