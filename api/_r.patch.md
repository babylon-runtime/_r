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

