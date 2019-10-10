* _r.patch( elements, patch )  
    * elements : String 
        ```js
        _r.patch("mesh1, mesh2", {
            isVisible : false
        });
        ```
    * elements : Object
        ```js
        _r.patch(material1, {
            diffuseColor : "red"
        });
        ```
* _r.patch( patch )
```js
_r.patch([{
    "mesh1" :  {
        isVisible : false
    },
    "material01" : {
        diffuseColor : "red"
    }
}]);
```
* _r.patch( patchFile )
```js
_r.patch("test.patch").then(function() {
    console.log("done");
});
```

* _r.select( selector, patch )
```js
_r.select("mesh1").patch({
     isVisible : false
});
```
## Each patch property can be a function
```js
_r.patch({
    "Sphere1" : {
        position : {
            x : 40
        },
        material : function() {
            var material = new BABYLON.StandardMaterial("texture1", _r.scene);
            _r.patch(material,
                { wireframe : true }
            );
            return material
        }
    }
})
```
## You can exec function inside patch files
```js
_r.patch([
    {
        "exec" : function() {
            new BABYLON.StandardMaterial("texture1", _r.scene);
        }   
    },
    {
        "texture1" : {
            wireframe : true
        }       
    }
])
```

## Asynchronous operations in patches
If you want to wait for an async. operation before executing the rest of the patch you can return a Promise :
```js
_r.select("plane").patch({
    material : {
        diffuseTexture : function() {
            return new Promise(function(resolve, reject) {
                var texture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.jpg", _r.scene);
                texture.onLoadObservable.add(function() {
                    resolve(texture);
                })
            })
        },
        backFaceCulling: false   
    }
})
```
...And property backFaceCulling will be set to false after the texture is loaded.

Note that in this case you could use _r.downloadTexture / _r.downloadCubeTexture since it returns Promise
```js
_r.select("plane").patch({
    material : {
        diffuseTexture : function() {
            return _r.downloadTexture("https://www.babylonjs-playground.com/textures/grass.jpg"); 
        },
        backFaceCulling: false   
    }
})
```
or more directly
```js
_r.select("plane").patch({
    material : {
        diffuseTexture : _r.downloadTexture("https://www.babylonjs-playground.com/textures/grass.jpg"),
        backFaceCulling: false   
    }
})
```
## Waiting for an asynchronous patch to complete
```js
_r.select("plane").patch({
    material : {
        diffuseTexture : _r.downloadTexture("https://www.babylonjs-playground.com/textures/grass.jpg"),
        backFaceCulling: false   
    }
}).then(function() {
    console.log("patch completed, texture is downloaded")
});
```

## Each property's function have parents as context in parameters

In this example if there's 2 spheres in the scene, **sphere1** and **sphere2** 
```js
_r.patch([{
    "sphere*" : {
        material : function(mesh) {
            return new BABYLON.StandardMaterial('material.' + mesh.name, _r.scene);
        }
    }
}])
```
material's function will be called for each sphere, passing the current sphere in the function arguments (**mesh** in this example)

Each ancestor is available in the function arguments. 
```js
_r.patch([{
    "sphere1" : {
        material :  {
            diffuseTexture : function(material, mesh) {
                return new BABYLON.Texture(mesh.name + '.' + material.name + '.png');
            }   
        }
    }
}])
```
The diffuseTexture function has 2 arguments, the first one for the parent (the material), and the second for the parent of the material (the mesh);