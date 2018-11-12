# _r.launch
BABYLON setup & launching shortcuts.

## Features
* create a canvas, an engine, and a default scene if they do not exist.
* allow copy / paste from [babylon playground ](https://www.babylonjs-playground.com/)
* scene loading with function(), *.babylon, *.gltf, etc.
* set active camera 
* responsive container polyfill
* patching before rendering
* offline mode, ktx, loading screen & progress loading

## Getting started
```
<script src="https://preview.babylonjs.com/babylon.js"></script>
<script src="https://unpkg.com/babylon-runtime/dist/_r.js"></script>
<script>
_r.launch({
    assets : "https://models.babylonjs.com/CornellBox/",
    scene : "cornellBox.babylon"
})
</script>
```

## Scene

### Loading *.babylon

<p data-height="300" data-theme-id="14185" data-slug-hash="aQBwOP" data-default-tab="html,result" data-user="levavasseur" data-pen-title="aQBwOP" class="codepen">See the Pen <a href="https://codepen.io/levavasseur/pen/aQBwOP/">aQBwOP</a> by Fabien Le Vavasseur (<a href="https://codepen.io/levavasseur">@levavasseur</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Copy / Paste from babylon playground

```
_r.launch({
        scene : function() {
            // This creates a basic Babylon Scene object (non-mesh)
            
            // optional _r create a scene by default :
            // var scene = new BABYLON.Scene(engine);

            // This creates and positions a free camera (non-mesh)
            var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());

            // This attaches the camera to the canvas
            camera.attachControl(canvas, true);

            // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

            // Default intensity is 1. Let's dim the light a small amount
            light.intensity = 0.7;

            // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
            var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

            // Move the sphere upward 1/2 its height
            sphere.position.y = 1;

            // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
            var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
            
            // optional :
            // return scene;
        }
    })
``` 

### *.gltf | *.glb | *.obj | *.stl

``` 
 _r.launch({
        assets : "https://models.babylonjs.com/CornellBox/",
        scene : "cornellBox.glb",
        beforeFirstRender : function() {
            _r.scene.createDefaultCameraOrLight(true, true, true);
            _r.scene.createDefaultEnvironment();
        }
    })
``` 

## Patch

TODO

## Misc.

### activeCamera by function
``` 
 _r.launch({
    assets : "https://models.babylonjs.com/CornellBox/",
    scene : "cornellBox.glb",
    activeCamera : function() {
       var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), _r.scene);
       return camera;
    },
    beforeFirstRender : function() {
       _r.scene.createDefaultEnvironment();
    }})
``` 

### Loading screen and events

### ktx

### enableOfflineSupport

### responsive container polyfill




